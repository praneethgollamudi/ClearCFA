import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "hello@clearcfa.com";
const ADMIN_EMAILS = ["gspbuilds@gmail.com", "sai.praneeth557@gmail.com"];

async function sendBrevo(to: string, subject: string, htmlContent: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "ClearCFA", email: FROM_EMAIL },
        replyTo: { email: FROM_EMAIL },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: errText };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function buildT24Email(email: string): string {
  const appUrl = "https://praneethgollamudi.github.io/ClearCFA/";
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:32px 16px;">
  <div style="background:#12121f;border-radius:20px;overflow:hidden;border:1px solid #ffffff15;">
    <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 28px 24px;">
      <div style="font-size:28px;margin-bottom:8px;">📊</div>
      <div style="font-size:22px;font-weight:900;color:#fff;line-height:1.25;">Your CFA baseline is waiting</div>
      <div style="font-size:13px;color:#ffffff99;margin-top:6px;">5 questions · 8 minutes · totally free</div>
    </div>
    <div style="padding:24px 28px;">
      <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 16px;">You created your ClearCFA account but haven't started your first session yet. That's where everything begins — your pass probability, your weak topics, your study plan.</p>
      <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 20px;">Five questions is all it takes to calibrate your AI study plan. No credit card, no commitment.</p>
      <a href="${appUrl}" style="display:block;background:#6366f1;color:#fff;text-decoration:none;text-align:center;padding:14px;border-radius:12px;font-size:15px;font-weight:800;letter-spacing:0.02em;margin-bottom:16px;">Start my first session → 5 Qs</a>
    </div>
    <div style="padding:16px 28px 24px;border-top:1px solid #ffffff0f;">
      <p style="font-size:11px;color:#ffffff44;margin:0;line-height:1.6;">
        You're receiving this because you signed up for ClearCFA.<br/>
        <a href="${appUrl}" style="color:#6366f1;text-decoration:none;">clearcfa.com</a> · <a href="mailto:${FROM_EMAIL}" style="color:#ffffff44;text-decoration:none;">Unsubscribe</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>`;
}

function buildT3dEmail(email: string): string {
  const appUrl = "https://praneethgollamudi.github.io/ClearCFA/";
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:32px 16px;">
  <div style="background:#12121f;border-radius:20px;overflow:hidden;border:1px solid #ffffff15;">
    <div style="background:linear-gradient(135deg,#f59e0b,#ef4444);padding:28px 28px 24px;">
      <div style="font-size:28px;margin-bottom:8px;">🔁</div>
      <div style="font-size:22px;font-weight:900;color:#fff;line-height:1.25;">Your SR cards are due</div>
      <div style="font-size:13px;color:#ffffff99;margin-top:6px;">Spaced repetition works best when you're consistent</div>
    </div>
    <div style="padding:24px 28px;">
      <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 16px;">It's been a few days since your last ClearCFA session. Your spaced repetition cards are piling up — and your streak is in danger.</p>
      <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 20px;">Even a 5-minute session today resets your review schedule at the optimal time. The CFA exam rewards consistency more than cramming.</p>
      <a href="${appUrl}" style="display:block;background:#f59e0b;color:#000;text-decoration:none;text-align:center;padding:14px;border-radius:12px;font-size:15px;font-weight:800;letter-spacing:0.02em;margin-bottom:16px;">Resume my sessions →</a>
    </div>
    <div style="padding:16px 28px 24px;border-top:1px solid #ffffff0f;">
      <p style="font-size:11px;color:#ffffff44;margin:0;line-height:1.6;">
        You're receiving this because you signed up for ClearCFA.<br/>
        <a href="${appUrl}" style="color:#6366f1;text-decoration:none;">clearcfa.com</a> · <a href="mailto:${FROM_EMAIL}" style="color:#ffffff44;text-decoration:none;">Unsubscribe</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>`;
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const now = new Date();

    // T+24h: signed up 22–72h ago, no sessions yet (data IS NULL)
    const t24Min = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
    const t24Max = new Date(now.getTime() - 22 * 60 * 60 * 1000).toISOString();

    const { data: t24Users } = await sb
      .from("sessions")
      .select("user_id, display, updated_at")
      .is("data", null)
      .gte("updated_at", t24Min)
      .lte("updated_at", t24Max);

    // T+3d: has session data but last activity was 48h–7d ago
    const t3dMin = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const t3dMax = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

    const { data: t3dUsers } = await sb
      .from("sessions")
      .select("user_id, display, updated_at")
      .not("data", "is", null)
      .gte("updated_at", t3dMin)
      .lte("updated_at", t3dMax);

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    async function maybeSend(userId: string, email: string, emailType: string, subject: string, html: string) {
      if (!email || ADMIN_EMAILS.includes(email)) return;
      if (!email.includes("@")) return;

      // Check drip_log for duplicates
      const { data: logged } = await sb
        .from("drip_log")
        .select("user_id")
        .eq("user_id", userId)
        .eq("email_type", emailType)
        .maybeSingle();

      if (logged) return; // Already sent

      const result = await sendBrevo(email, subject, html);
      if (result.ok) {
        // Log the send
        await sb.from("drip_log").insert({ user_id: userId, email_type: emailType });
        sent++;
      } else {
        failed++;
        errors.push(`${email}: ${result.error}`);
      }
    }

    for (const u of t24Users || []) {
      const email = u.display;
      await maybeSend(
        u.user_id,
        email,
        "t24_no_session",
        "Your CFA baseline is waiting — 5 questions, 8 minutes",
        buildT24Email(email)
      );
    }

    for (const u of t3dUsers || []) {
      const email = u.display;
      await maybeSend(
        u.user_id,
        email,
        "t3d_lapsed",
        "Your CFA SR cards are due — don't break the streak",
        buildT3dEmail(email)
      );
    }

    return new Response(
      JSON.stringify({ ok: true, sent, failed, total: (t24Users?.length || 0) + (t3dUsers?.length || 0), errors: errors.slice(0, 5) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
