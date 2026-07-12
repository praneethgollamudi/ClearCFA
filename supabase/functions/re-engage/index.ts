import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

async function sendBrevo(apiKey: string, from: string, to: string, subject: string, html: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: "ClearCFA", email: from },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });
    if (res.ok) return { ok: true };
    const text = await res.text().catch(() => `HTTP ${res.status}`);
    return { ok: false, error: text || `Brevo HTTP ${res.status}` };
  } catch (err: unknown) {
    return { ok: false, error: `Network error: ${String(err)}` };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "gspbuilds@gmail.com";
    const ADMIN_EMAILS = [ADMIN_EMAIL, "sai.praneeth557@gmail.com"];
    const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || ADMIN_EMAIL;

    if (!BREVO_API_KEY) {
      return json({ error: "BREVO_API_KEY not configured — add it in Supabase project settings under Edge Functions secrets" }, 500);
    }

    const body = await req.json().catch(() => ({}));
    const { accessToken, userId, email, dryRun, testTo } = body;

    // Admin auth check
    const sb = createClient(SUPABASE_URL, SERVICE_KEY);
    const isAdmin = email && ADMIN_EMAILS.includes(email);
    if (!isAdmin) {
      const { data: { user } } = await sb.auth.getUser(accessToken);
      if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
        return json({ error: "Unauthorized" }, 401);
      }
    }

    // Test send: preview email to ADMIN_EMAIL
    if (testTo) {
      const subject = "ClearCFA — re-engagement email preview";
      const html = buildLapsedEmail(5);
      const result = await sendBrevo(BREVO_API_KEY, FROM_EMAIL, ADMIN_EMAIL, subject, html);
      if (result.ok) {
        return json({ sent: 1, testTo: ADMIN_EMAIL, note: `Preview sent to ${ADMIN_EMAIL}` });
      }
      return json({ error: result.error || "Brevo send failed (no error detail returned)" }, 500);
    }

    // Find inactive users: signed up 3+ days ago and never studied, OR studied but not in 3+ days
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

    const { data: usersPage, error: usersErr } = await sb.auth.admin.listUsers({ page: 1, perPage: 500 });
    if (usersErr) {
      return json({ error: usersErr.message }, 500);
    }
    const allUsers = usersPage.users || [];

    const { data: sessions } = await sb.from("sessions").select("user_id, updated_at").order("updated_at", { ascending: false });
    const lastActivityByUser: Record<string, string> = {};
    for (const s of sessions || []) {
      if (!lastActivityByUser[s.user_id]) lastActivityByUser[s.user_id] = s.updated_at;
    }

    const targets: { email: string; type: "never_studied" | "lapsed"; lastActivity: string | null; daysInactive: number }[] = [];

    for (const u of allUsers) {
      if (!u.email || ADMIN_EMAILS.includes(u.email)) continue;
      const createdAt = u.created_at;
      const lastActivity = lastActivityByUser[u.id] || null;

      if (new Date(createdAt) > new Date(threeDaysAgo)) continue;

      if (!lastActivity) {
        const daysInactive = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);
        targets.push({ email: u.email, type: "never_studied", lastActivity: null, daysInactive });
      } else if (new Date(lastActivity) < new Date(threeDaysAgo)) {
        const daysInactive = Math.floor((Date.now() - new Date(lastActivity).getTime()) / 86400000);
        targets.push({ email: u.email, type: "lapsed", lastActivity, daysInactive });
      }
    }

    if (dryRun) {
      return json({ dryRun: true, targets: targets.length, breakdown: { neverStudied: targets.filter(t => t.type === "never_studied").length, lapsed: targets.filter(t => t.type === "lapsed").length } });
    }

    let sent = 0, failed = 0;
    const errors: string[] = [];

    for (const t of targets) {
      const subject = t.type === "never_studied"
        ? "Your CFA prep is waiting — 5 min to get started"
        : `Your CFA streak is on the line — ${t.daysInactive} days since you last studied`;

      const html = t.type === "never_studied"
        ? buildNeverStudiedEmail(t.daysInactive)
        : buildLapsedEmail(t.daysInactive);

      const result = await sendBrevo(BREVO_API_KEY, FROM_EMAIL, t.email, subject, html);
      if (result.ok) {
        sent++;
      } else {
        failed++;
        errors.push(`${t.email}: ${result.error}`);
      }
    }

    return json({ sent, failed, total: targets.length, errors: errors.slice(0, 5) });
  } catch (err: unknown) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return json({ error: `Function error: ${msg}` }, 500);
  }
});

function buildNeverStudiedEmail(daysInactive: number): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a14;color:#e2e8f0;margin:0;padding:24px;">
  <div style="max-width:480px;margin:0 auto;background:#141425;border-radius:16px;padding:32px;border:1px solid #2d2d5a;">
    <div style="font-size:32px;margin-bottom:16px;">📚</div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#f1f5f9;">Your CFA prep is waiting</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;line-height:1.6;">
      You signed up ${daysInactive} day${daysInactive !== 1 ? 's' : ''} ago but haven't started your first session yet.
      The CFA exam is unforgiving — every day counts.
    </p>
    <div style="background:#1e1e3a;border-radius:12px;padding:16px 20px;margin-bottom:24px;border-left:4px solid #6366f1;">
      <div style="font-size:13px;font-weight:700;color:#a5b4fc;margin-bottom:8px;">Start with just 5 questions today</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.6;">AI picks your weakest topic automatically. No setup. No decision fatigue. Just tap "Quick Start" and go.</div>
    </div>
    <a href="https://praneethgollamudi.github.io/ClearCFA" style="display:block;background:#6366f1;color:#fff;text-align:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;margin-bottom:16px;">
      Start My First Session →
    </a>
    <p style="margin:0;font-size:11px;color:#475569;text-align:center;">
      ClearCFA — AI-powered CFA exam prep<br/>
      <a href="https://praneethgollamudi.github.io/ClearCFA" style="color:#6366f1;">Open app</a>
    </p>
  </div>
</body>
</html>`;
}

function buildLapsedEmail(daysInactive: number): string {
  const urgency = daysInactive >= 7 ? "high" : "medium";
  const emoji = urgency === "high" ? "🔥" : "⚡";
  const headline = urgency === "high"
    ? `You've been away ${daysInactive} days — your progress is at risk`
    : `${daysInactive} days since your last CFA session`;

  return `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a14;color:#e2e8f0;margin:0;padding:24px;">
  <div style="max-width:480px;margin:0 auto;background:#141425;border-radius:16px;padding:32px;border:1px solid #2d2d5a;">
    <div style="font-size:32px;margin-bottom:16px;">${emoji}</div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#f1f5f9;">${headline}</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;line-height:1.6;">
      ${urgency === "high"
        ? "Spaced repetition works when it's consistent. Taking breaks this long means you're re-learning instead of reinforcing. Get back on track now before the gap widens."
        : "A few days off is normal. What matters is coming back before the habit breaks completely."}
    </p>
    <div style="background:#1e1e3a;border-radius:12px;padding:16px 20px;margin-bottom:24px;border-left:4px solid ${urgency === "high" ? "#ef4444" : "#f59e0b"};">
      <div style="font-size:13px;font-weight:700;color:${urgency === "high" ? "#fca5a5" : "#fcd34d"};margin-bottom:8px;">
        ${urgency === "high" ? "Your SR deck is overdue" : "Quick 5-min catch-up session"}
      </div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.6;">
        ${urgency === "high"
          ? "Spaced repetition cards you previously got right are now due for review. Tap to catch up before you forget what you've learned."
          : "Your AI coach has already identified your weakest area from last session. Tap below to drill it in 5 minutes."}
      </div>
    </div>
    <a href="https://praneethgollamudi.github.io/ClearCFA" style="display:block;background:${urgency === "high" ? "#ef4444" : "#6366f1"};color:#fff;text-align:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;margin-bottom:16px;">
      ${urgency === "high" ? "Get Back on Track →" : "Resume My Prep →"}
    </a>
    <p style="margin:0;font-size:11px;color:#475569;text-align:center;">
      ClearCFA — AI-powered CFA exam prep<br/>
      <a href="https://praneethgollamudi.github.io/ClearCFA" style="color:#6366f1;">Open app</a>
    </p>
  </div>
</body>
</html>`;
}
