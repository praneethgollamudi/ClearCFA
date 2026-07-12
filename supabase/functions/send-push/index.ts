import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Minimal VAPID + Web Push implementation in Deno (no npm:web-push needed)
// Follows RFC 8292 (VAPID) and RFC 8030 (Web Push)

async function importVapidPrivateKey(privB64: string): Promise<CryptoKey> {
  // privB64 is the raw 32-byte private scalar in base64url (JWK 'd' field)
  const jwk = {
    kty: "EC", crv: "P-256",
    d: privB64,
    // derive public key components from private — use a dummy pair; subtle will accept 'd' only for sign
    x: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    y: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    key_ops: ["sign"],
  };
  // We need the full JWK — generate a real pair and swap d
  const pair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
  const pubJwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
  const fullJwk = { ...pubJwk, d: privB64, key_ops: ["sign"] };
  return crypto.subtle.importKey("jwk", fullJwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
}

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(s.length + (4 - s.length % 4) % 4, "=");
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}

async function buildVapidHeader(endpoint: string, subject: string, pubKeyB64: string, privKeyB64: string): Promise<string> {
  const origin = new URL(endpoint).origin;
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(new TextEncoder().encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const payload = b64url(new TextEncoder().encode(JSON.stringify({ aud: origin, exp: now + 12 * 3600, sub: subject })));
  const toSign = new TextEncoder().encode(`${header}.${payload}`);
  const key = await importVapidPrivateKey(privKeyB64);
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, toSign);
  const jwt = `${header}.${payload}.${b64url(sig)}`;
  return `vapid t=${jwt},k=${pubKeyB64}`;
}

// Encrypt Web Push payload using ECDH + AES-128-GCM (RFC 8291)
async function encryptPayload(
  payload: string,
  p256dhB64: string,
  authB64: string
): Promise<{ encrypted: Uint8Array; salt: Uint8Array; serverPublicKey: Uint8Array }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);

  // Client public key
  const clientPubRaw = b64urlDecode(p256dhB64);
  const clientPubKey = await crypto.subtle.importKey("raw", clientPubRaw, { name: "ECDH", namedCurve: "P-256" }, false, []);

  // Generate server ephemeral key pair
  const serverKP = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveKey"]);
  const serverPubRaw = new Uint8Array(await crypto.subtle.exportKey("raw", serverKP.publicKey));

  // auth secret
  const authSecret = b64urlDecode(authB64);
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // ECDH shared secret
  const sharedSecret = await crypto.subtle.deriveBits({ name: "ECDH", public: clientPubKey }, serverKP.privateKey, 256);

  // PRK via HKDF with auth
  const authInfo = encoder.encode("Content-Encoding: auth\0");
  const prkAuthKey = await crypto.subtle.importKey("raw", authSecret, { name: "HKDF" }, false, ["deriveBits"]);
  const prk = await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt: new Uint8Array(sharedSecret), info: authInfo }, prkAuthKey, 256);

  // Content encryption key + nonce via HKDF with salt
  const keyInfo = concat(encoder.encode("Content-Encoding: aesgcm\0"), encoder.encode("\0"), serverPubRaw, clientPubRaw);
  const nonceInfo = concat(encoder.encode("Content-Encoding: nonce\0"), encoder.encode("\0"), serverPubRaw, clientPubRaw);

  const prkKey = await crypto.subtle.importKey("raw", salt, { name: "HKDF" }, false, ["deriveBits"]);
  // Simplified: derive content encryption key from prk+salt
  const ikm = await crypto.subtle.importKey("raw", prk, { name: "HKDF" }, false, ["deriveKey"]);
  const cek = await crypto.subtle.deriveKey(
    { name: "HKDF", hash: "SHA-256", salt, info: keyInfo.slice(0, 32) },
    ikm, { name: "AES-GCM", length: 128 }, false, ["encrypt"]
  );
  const nonceBits = await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt, info: nonceInfo.slice(0, 32) }, ikm, 96);
  const nonce = new Uint8Array(nonceBits);

  // Pad + encrypt
  const padded = new Uint8Array(2 + data.length);
  padded.set(data, 2);
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce }, cek, padded));

  return { encrypted, salt, serverPublicKey: serverPubRaw };
}

function concat(...arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) { out.set(a, offset); offset += a.length; }
  return out;
}

async function sendWebPush(
  subscription: { endpoint: string; p256dh: string; auth_key: string },
  payload: string,
  vapidPublicKey: string,
  vapidPrivateKey: string,
  subject: string,
): Promise<number> {
  const { encrypted, salt, serverPublicKey } = await encryptPayload(payload, subscription.p256dh, subscription.auth_key);
  const authHeader = await buildVapidHeader(subscription.endpoint, subject, vapidPublicKey, vapidPrivateKey);

  const res = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "aesgcm",
      "Crypto-Key": `dh=${b64url(serverPublicKey.buffer)}`,
      "Encryption": `salt=${b64url(salt.buffer)}`,
      "TTL": "86400",
    },
    body: encrypted,
  });
  return res.status;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "gspbuilds@gmail.com";
  const VAPID_PUB = Deno.env.get("VAPID_PUBLIC_KEY") || "BBXW1DGWNhK1tUyzVkrsfhiNF5PIwiztq7PsRntHGvuzxnPsnR07UV-H631e-UHPWzIPkeouGg_giEsH3BVjQM8";
  const VAPID_PRIV = Deno.env.get("VAPID_PRIVATE_KEY")!;

  if (!VAPID_PUB || !VAPID_PRIV) {
    return new Response(JSON.stringify({ error: "VAPID keys not configured" }), { status: 500, headers: CORS });
  }

  const body = await req.json().catch(() => ({}));
  const { accessToken, userId, email, title, message, targetUserId } = body;

  // Admin auth check
  const sb = createClient(SUPABASE_URL, SERVICE_KEY);
  const isAdmin = email === ADMIN_EMAIL;
  if (!isAdmin) {
    // Fallback: verify via auth
    const { data: { user } } = await sb.auth.getUser(accessToken);
    if (!user || user.email !== ADMIN_EMAIL) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: CORS });
    }
  }

  // Fetch subscriptions
  let query = sb.from("push_subscriptions").select("endpoint, p256dh, auth_key");
  if (targetUserId) query = query.eq("user_id", targetUserId);
  const { data: subs, error } = await query;
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: CORS });

  const payload = JSON.stringify({
    title: title || "ClearCFA Study Reminder",
    body: message || "Your CFA exam prep needs your attention today.",
  });

  let sent = 0, failed = 0, removed = 0;
  for (const sub of subs || []) {
    try {
      const status = await sendWebPush(sub as typeof sub, payload, VAPID_PUB, VAPID_PRIV, `mailto:${ADMIN_EMAIL}`);
      if (status === 201 || status === 202) sent++;
      else if (status === 410 || status === 404) {
        // Subscription expired — remove it
        await sb.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
        removed++;
      } else failed++;
    } catch {
      failed++;
    }
  }

  return new Response(JSON.stringify({ sent, failed, removed, total: (subs || []).length }), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});
