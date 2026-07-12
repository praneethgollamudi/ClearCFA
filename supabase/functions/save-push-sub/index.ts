import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const body = await req.json().catch(() => ({}));
  const { userId, endpoint, p256dh, auth_key } = body;

  if (!userId || !endpoint || !p256dh || !auth_key) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY);

  // Validate userId exists in sessions table (prevents arbitrary user_id injection)
  const { data: session } = await sb
    .from("sessions")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unknown user" }), {
      status: 401, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const { error } = await sb.from("push_subscriptions").upsert(
    { user_id: userId, endpoint, p256dh, auth_key, updated_at: new Date().toISOString() },
    { onConflict: "user_id,endpoint" }
  );

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});
