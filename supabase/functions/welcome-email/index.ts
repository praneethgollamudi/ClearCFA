import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "hello@clearcfa.com";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "gspbuilds@gmail.com";
const ADMIN_EMAILS = [ADMIN_EMAIL, "sai.praneeth557@gmail.com"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

function buildWelcomeEmail(email: string, topic: string, pct: number, level: string): string {
  const passed = pct >= 70;
  const levelLabel = `CFA Level ${level}`;
  const nextTopic = topic === "Ethics" ? "Quantitative Methods" : "Ethics";
  const deepLink = `https://praneethgollamudi.github.io/ClearCFA/?qs=${encodeURIComponent(topic.toLowerCase().replace(/\s+/g, "-"))}`;

  const headline = passed
    ? `Strong start — ${pct}% on your first session! 🎯`
    : `First session done — here's your game plan 💪`;

  const bodyText = passed
    ? `You scored <strong>${pct}%</strong> on ${topic} — that's above the 70% pass threshold. ClearCFA has already identified your weak sub-topics and added them to your Spaced Repetition deck for tomorrow.`
    : `You scored <strong>${pct}%</strong> on ${topic}. Don't worry — first sessions are for calibration. ClearCFA has queued your wrong answers for Spaced Repetition review, so you'll see exactly those concepts again tomorrow at the right time.`;

  const ctaText = passed
    ? `Keep the streak going — drill ${nextTopic} next`
    : `Review your wrong answers now`;

  const ctaLink = passed
    ? `https://praneethgollamudi.github.io/ClearCFA/?qs=${encodeURIComponent(nextTopic.toLowerCase().replace(/\s+/g, "-"))}`
    : deepLink;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${headline}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:32px 16px;">
  <div style="background:#12121f;border-radius:20px;overflow:hidden;border:1px solid #ffffff15;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 28px 24px;">
      <div style="font-size:28px;margin-bottom:8px;">${passed ? "🎯" : "💪"}</div>
      <div style="font-size:22px;font-weight:900;color:#fff;line-height:1.25;">${headline}</div>
      <div style="font-size:13px;color:#ffffff99;margin-top:6px;">${levelLabel} · ${topic}</div>
    </div>
    <!-- Score pill -->
    <div style="padding:20px 28px 0;">
      <div style="display:inline-block;background:${passed ? "#22c55e22" : "#ef444422"};border:1px solid ${passed ? "#22c55e55" : "#ef444455"};border-radius:12px;padding:12px 20px;">
        <div style="font-size:32px;font-weight:900;color:${passed ? "#22c55e" : "#ef4444"};">${pct}%</div>
        <div style="font-size:12px;color:#ffffff66;margin-top:2px;">${passed ? "Above pass threshold ✓" : "Pass threshold: 70%"}</div>
      </div>
    </div>
    <!-- Body -->
    <div style="padding:20px 28px;">
      <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 16px;">${bodyText}</p>
      <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 20px;">Your daily Spaced Repetition queue is ready. Each day ClearCFA will resurface exactly the concepts you're weakest on — at the optimal moment for retention.</p>
      <!-- CTA -->
      <a href="${ctaLink}" style="display:block;background:#6366f1;color:#fff;text-decoration:none;text-align:center;padding:14px;border-radius:12px;font-size:15px;font-weight:800;letter-spacing:0.02em;margin-bottom:16px;">${ctaText} →</a>
      <a href="https://praneethgollamudi.github.io/ClearCFA/" style="display:block;background:#ffffff0f;color:#ffffffaa;text-decoration:none;text-align:center;padding:10px;border-radius:10px;font-size:12px;font-weight:700;">Open ClearCFA Dashboard</a>
    </div>
    <!-- Footer -->
    <div style="padding:16px 28px 24px;border-top:1px solid #ffffff0f;">
      <p style="font-size:11px;color:#ffffff44;margin:0;line-height:1.6;">
        You're receiving this because you signed up for ClearCFA.<br/>
        <a href="https://praneethgollamudi.github.io/ClearCFA/" style="color:#6366f1;text-decoration:none;">clearcfa.com</a> · <a href="mailto:${FROM_EMAIL}" style="color:#ffffff44;text-decoration:none;">Contact support</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, topic, pct, level, userId, accessToken } = await req.json();

    if (!email || !userId) {
      return new Response(JSON.stringify({ error: "Missing email or userId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Skip admin emails
    if (ADMIN_EMAILS.includes(email)) {
      return new Response(JSON.stringify({ ok: true, skipped: "admin" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the user identity
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    let verified = false;

    if (accessToken) {
      try {
        const { data: { user } } = await sb.auth.getUser(accessToken);
        if (user?.id === userId || user?.email === email) verified = true;
      } catch { /* fall through */ }
    }

    if (!verified) {
      // Fallback: check sessions table for userId
      const { data } = await sb.from("sessions").select("user_id").eq("user_id", userId).limit(1);
      if (data && data.length > 0) verified = true;
    }

    if (!verified) {
      return new Response(JSON.stringify({ error: "Auth failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const safeTopic = topic || "Ethics";
    const safePct = typeof pct === "number" ? Math.round(pct) : 0;
    const safeLevel = level || "1";

    const subject = safePct >= 70
      ? `Strong start 🎯 — ${safePct}% on your first session · CFA L${safeLevel} journey begins`
      : `First session done — here's your CFA L${safeLevel} game plan`;

    const html = buildWelcomeEmail(email, safeTopic, safePct, safeLevel);
    const result = await sendBrevo(email, subject, html);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
