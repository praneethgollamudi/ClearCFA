import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "hello@clearcfa.com";
const ADMIN_EMAILS = ["gspbuilds@gmail.com", "sai.praneeth557@gmail.com"];
const APP_URL = "https://praneethgollamudi.github.io/ClearCFA/";

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

function emailShell(headerBg: string, emoji: string, title: string, subtitle: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:520px;margin:0 auto;padding:32px 16px;">
  <div style="background:#12121f;border-radius:20px;overflow:hidden;border:1px solid #ffffff15;">
    <div style="background:${headerBg};padding:28px 28px 24px;">
      <div style="font-size:28px;margin-bottom:8px;">${emoji}</div>
      <div style="font-size:22px;font-weight:900;color:#fff;line-height:1.25;">${title}</div>
      <div style="font-size:13px;color:#ffffff99;margin-top:6px;">${subtitle}</div>
    </div>
    <div style="padding:24px 28px;">${body}</div>
    <div style="padding:16px 28px 24px;border-top:1px solid #ffffff0f;">
      <p style="font-size:11px;color:#ffffff44;margin:0;line-height:1.6;">
        You're receiving this because you signed up for ClearCFA.<br/>
        <a href="${APP_URL}" style="color:#6366f1;text-decoration:none;">clearcfa.com</a> · <a href="mailto:${FROM_EMAIL}" style="color:#ffffff44;text-decoration:none;">Unsubscribe</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>`;
}

function cta(href: string, label: string, bg = "#6366f1", color = "#fff"): string {
  return `<a href="${href}" style="display:block;background:${bg};color:${color};text-decoration:none;text-align:center;padding:14px;border-radius:12px;font-size:15px;font-weight:800;letter-spacing:0.02em;margin-bottom:12px;">${label}</a>`;
}

function buildT24Email(): string {
  return emailShell(
    "linear-gradient(135deg,#6366f1,#8b5cf6)", "📊",
    "Your CFA baseline is waiting",
    "5 questions · 8 minutes · totally free",
    `<p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 16px;">You created your ClearCFA account but haven't started your first session yet. That's where everything begins — your pass probability, your weak topics, your study plan.</p>
    <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 20px;">Five questions is all it takes to calibrate your AI study plan. No credit card, no commitment.</p>
    ${cta(APP_URL, "Start my first session → 5 Qs")}`
  );
}

function buildT3dEmail(): string {
  return emailShell(
    "linear-gradient(135deg,#f59e0b,#ef4444)", "🔁",
    "Your SR cards are due",
    "Spaced repetition works best when you're consistent",
    `<p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 16px;">It's been a few days since your last ClearCFA session. Your spaced repetition cards are piling up — and your streak is in danger.</p>
    <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 20px;">Even a 5-minute session today resets your review schedule at the optimal time. The CFA exam rewards consistency more than cramming.</p>
    ${cta(APP_URL, "Resume my sessions →", "#f59e0b", "#000")}`
  );
}

function buildCalcTrainerEmail(): string {
  return emailShell(
    "linear-gradient(135deg,#6366f1,#06b6d4)", "🧮",
    "The #1 reason candidates fail: calculator errors",
    "Most people skip BA II Plus practice. Don't.",
    `<p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 12px;">In exam conditions, a single wrong keystroke on a TVM or NPV question costs you the answer even if you understand the concept perfectly.</p>
    <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 16px;">ClearCFA's <strong style="color:#fff;">BA II Plus Calculator Trainer</strong> walks you through exact keystroke sequences — TVM worksheets, cash flow registers, bond pricing, amortization — with step-by-step guidance you can't get from textbooks.</p>
    <div style="background:#ffffff0a;border-radius:12px;padding:14px 16px;margin-bottom:20px;">
      <div style="font-size:12px;font-weight:700;color:#ffffffaa;margin-bottom:8px;">What's covered:</div>
      ${["⏱ Time Value of Money (N, I/Y, PV, PMT, FV)","💰 Net Present Value & IRR (CF worksheet)","📈 Bond pricing & yield-to-maturity","📉 Amortization schedule (AMORT)"].map(t=>`<div style="font-size:13px;color:#ffffffcc;padding:4px 0;">${t}</div>`).join("")}
    </div>
    ${cta(APP_URL, "Open the Calc Trainer →")}`
  );
}

function buildReadinessEmail(): string {
  return emailShell(
    "linear-gradient(135deg,#22c55e,#16a34a)", "📈",
    "Have you checked your pass probability?",
    "Your readiness score updates after every session",
    `<p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 12px;">After a week of sessions, ClearCFA has enough data to show you a live <strong style="color:#fff;">pass probability</strong> — the single number that tells you where you stand against the 70% threshold.</p>
    <div style="background:#ffffff0a;border-radius:12px;padding:14px 16px;margin-bottom:16px;">
      <div style="font-size:12px;font-weight:700;color:#22c55e;margin-bottom:8px;">Your Readiness screen shows:</div>
      ${["📊 Per-topic accuracy and coverage","🎯 Pass probability vs 70% threshold","📉 Your three weakest modules","🗺 LOS coverage heatmap across all topics"].map(t=>`<div style="font-size:13px;color:#ffffffcc;padding:4px 0;">${t}</div>`).join("")}
    </div>
    <p style="font-size:14px;color:#ffffffcc;line-height:1.7;margin:0 0 20px;">Most candidates fly blind until their mock exam. You don't have to.</p>
    ${cta(APP_URL, "Check my pass probability →", "#22c55e", "#000")}`
  );
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

    // ── T+24h: signed up 22–72h ago, no sessions yet ──
    const t24Min = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
    const t24Max = new Date(now.getTime() - 22 * 60 * 60 * 1000).toISOString();
    const { data: t24Users } = await sb
      .from("sessions")
      .select("user_id, display, updated_at")
      .is("data", null)
      .gte("updated_at", t24Min)
      .lte("updated_at", t24Max);

    // ── T+3d: has sessions but last activity was 48h–7d ago ──
    const t3dMin = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const t3dMax = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();
    const { data: t3dUsers } = await sb
      .from("sessions")
      .select("user_id, display, updated_at")
      .not("data", "is", null)
      .gte("updated_at", t3dMin)
      .lte("updated_at", t3dMax);

    // ── Day 5: T+24h anchor sent 4–7d ago, user has sessions ──
    // Uses drip_log.sent_at as a proxy for signup time
    const d5Min = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const d5Max = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString();
    const { data: d5Anchors } = await sb
      .from("drip_log")
      .select("user_id, sent_at")
      .eq("email_type", "t24_no_session")
      .gte("sent_at", d5Min)
      .lte("sent_at", d5Max);

    // ── Day 10: T+24h anchor sent 9–12d ago ──
    const d10Min = new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString();
    const d10Max = new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString();
    const { data: d10Anchors } = await sb
      .from("drip_log")
      .select("user_id, sent_at")
      .eq("email_type", "t24_no_session")
      .gte("sent_at", d10Min)
      .lte("sent_at", d10Max);

    // Fetch emails for spotlight anchors
    const spotlightIds = [
      ...(d5Anchors || []).map(r => r.user_id),
      ...(d10Anchors || []).map(r => r.user_id),
    ];
    const { data: spotlightUsers } = spotlightIds.length
      ? await sb.from("sessions").select("user_id, display").in("user_id", spotlightIds)
      : { data: [] };
    const emailMap = Object.fromEntries((spotlightUsers || []).map(u => [u.user_id, u.display]));

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    async function maybeSend(userId: string, email: string, emailType: string, subject: string, html: string) {
      if (!email || ADMIN_EMAILS.includes(email) || !email.includes("@")) return;
      const { data: logged } = await sb
        .from("drip_log").select("user_id")
        .eq("user_id", userId).eq("email_type", emailType).maybeSingle();
      if (logged) return;
      const result = await sendBrevo(email, subject, html);
      if (result.ok) {
        await sb.from("drip_log").insert({ user_id: userId, email_type: emailType });
        sent++;
      } else {
        failed++;
        errors.push(`${email}: ${result.error}`);
      }
    }

    for (const u of t24Users || []) {
      await maybeSend(u.user_id, u.display, "t24_no_session",
        "Your CFA baseline is waiting — 5 questions, 8 minutes", buildT24Email());
    }

    for (const u of t3dUsers || []) {
      await maybeSend(u.user_id, u.display, "t3d_lapsed",
        "Your CFA SR cards are due — don't break the streak", buildT3dEmail());
    }

    for (const anchor of d5Anchors || []) {
      const email = emailMap[anchor.user_id];
      if (email) {
        await maybeSend(anchor.user_id, email, "calc_trainer_spotlight",
          "The #1 reason CFA candidates fail: calculator errors", buildCalcTrainerEmail());
      }
    }

    for (const anchor of d10Anchors || []) {
      const email = emailMap[anchor.user_id];
      if (email) {
        await maybeSend(anchor.user_id, email, "readiness_spotlight",
          "Have you checked your CFA pass probability yet?", buildReadinessEmail());
      }
    }

    const total = (t24Users?.length || 0) + (t3dUsers?.length || 0) +
      (d5Anchors?.length || 0) + (d10Anchors?.length || 0);

    return new Response(
      JSON.stringify({ ok: true, sent, failed, total, errors: errors.slice(0, 5) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
