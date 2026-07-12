import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const APP_URL = "https://praneethgollamudi.github.io/ClearCFA";

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

function topicSlug(topic: string): string {
  const map: Record<string, string> = {
    "Ethics": "ethics",
    "Quantitative Methods": "quant",
    "Economics": "economics",
    "Financial Statement Analysis": "fsa",
    "Corporate Issuers": "corporate",
    "Equity": "equity",
    "Fixed Income": "fixed_income",
    "Derivatives": "derivatives",
    "Alternatives": "alternatives",
    "Portfolio Management": "portfolio",
  };
  return map[topic] || "ethics";
}

function ctaUrl(topic: string): string {
  return `${APP_URL}/?qs=${topicSlug(topic)}`;
}

// High-weight first-session topics for never-studied users
const DEFAULT_START_TOPIC = "Ethics"; // 15-20% exam weight, universal across L1/L2/L3

interface UserContext {
  level: string;
  lastTopic: string;
  lastActivity: string | null;
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
    const { accessToken, email, dryRun, testTo } = body;

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
      const subject = `ClearCFA — re-engagement preview (lapsed 5d, Fixed Income)`;
      const html = buildLapsedEmail({
        level: "1",
        lastTopic: "Fixed Income",
        daysInactive: 5,
        urgencyTier: "medium",
      });
      const result = await sendBrevo(BREVO_API_KEY, FROM_EMAIL, ADMIN_EMAIL, subject, html);
      if (result.ok) {
        return json({ sent: 1, testTo: ADMIN_EMAIL, note: `Preview sent to ${ADMIN_EMAIL}` });
      }
      return json({ error: result.error || "Brevo send failed (no error detail returned)" }, 500);
    }

    // ─── Fetch all users and their session context ───────────────────────────

    const { data: usersPage, error: usersErr } = await sb.auth.admin.listUsers({ page: 1, perPage: 500 });
    if (usersErr) return json({ error: usersErr.message }, 500);
    const allUsers = usersPage.users || [];

    // Load all sessions — extract last activity, level, last topic
    const { data: sessionRows } = await sb.from("sessions").select("user_id, data, updated_at");
    const userCtx: Record<string, UserContext> = {};

    for (const row of sessionRows || []) {
      const history = Array.isArray(row.data) ? row.data : [];
      const last = history.length > 0 ? history[history.length - 1] : null;
      userCtx[row.user_id] = {
        level: last?.level || "1",
        lastTopic: last?.topic || DEFAULT_START_TOPIC,
        lastActivity: row.updated_at,
      };
    }

    // ─── Classify users ──────────────────────────────────────────────────────

    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString();
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

    interface Target {
      email: string;
      type: "never_studied" | "lapsed";
      daysInactive: number;
      ctx: UserContext;
    }

    const targets: Target[] = [];

    for (const u of allUsers) {
      if (!u.email || ADMIN_EMAILS.includes(u.email)) continue;

      const createdAt = u.created_at;
      const ctx = userCtx[u.id] || { level: "1", lastTopic: DEFAULT_START_TOPIC, lastActivity: null };
      const lastActivity = ctx.lastActivity;

      // Never studied: signed up 1+ days ago and has no sessions
      if (!lastActivity) {
        if (new Date(createdAt) < new Date(oneDayAgo)) {
          const daysInactive = Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);
          targets.push({ email: u.email, type: "never_studied", daysInactive, ctx });
        }
        continue;
      }

      // Lapsed: has sessions but inactive 3+ days
      if (new Date(lastActivity) < new Date(threeDaysAgo)) {
        const daysInactive = Math.floor((Date.now() - new Date(lastActivity).getTime()) / 86400000);
        targets.push({ email: u.email, type: "lapsed", daysInactive, ctx });
      }
    }

    if (dryRun) {
      return json({
        dryRun: true,
        targets: targets.length,
        breakdown: {
          neverStudied: targets.filter(t => t.type === "never_studied").length,
          lapsed: targets.filter(t => t.type === "lapsed").length,
        },
        sample: targets.slice(0, 3).map(t => ({ email: t.email, type: t.type, days: t.daysInactive, topic: t.ctx.lastTopic, level: t.ctx.level })),
      });
    }

    // ─── Send personalized emails ────────────────────────────────────────────

    let sent = 0, failed = 0;
    const errors: string[] = [];

    for (const t of targets) {
      const urgencyTier = getUrgencyTier(t.daysInactive);
      const topic = t.type === "never_studied" ? DEFAULT_START_TOPIC : t.ctx.lastTopic;

      const subject = buildSubject(t.type, t.daysInactive, urgencyTier, topic, t.ctx.level);
      const html = t.type === "never_studied"
        ? buildNeverStudiedEmail({ level: t.ctx.level, daysInactive: t.daysInactive, urgencyTier, topic })
        : buildLapsedEmail({ level: t.ctx.level, lastTopic: topic, daysInactive: t.daysInactive, urgencyTier });

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

// ─── Urgency tier ────────────────────────────────────────────────────────────

function getUrgencyTier(days: number): "soft" | "medium" | "high" | "critical" {
  if (days <= 3) return "soft";
  if (days <= 7) return "medium";
  if (days <= 14) return "high";
  return "critical";
}

// ─── Subject lines ───────────────────────────────────────────────────────────

function buildSubject(
  type: "never_studied" | "lapsed",
  days: number,
  tier: string,
  topic: string,
  level: string,
): string {
  const lvl = `CFA L${level}`;
  if (type === "never_studied") {
    if (days <= 1) return `Your ${lvl} account is ready — start with ${topic} (5 min)`;
    if (days <= 3) return `${days} days in — here's the easiest way to start ${lvl} prep`;
    if (days <= 7) return `Don't let ${days} days go by — your ${lvl} ${topic} session is waiting`;
    return `${days} days and no sessions yet — let's fix that today`;
  }
  // lapsed
  if (tier === "soft") return `Quick ${topic} catch-up — 5 questions, 8 minutes`;
  if (tier === "medium") return `${days} days since your last ${lvl} session — don't lose momentum`;
  if (tier === "high") return `${days} days away from ${lvl} — your SR cards are piling up`;
  return `${days} days inactive — your ${lvl} pass probability is slipping`;
}

// ─── Email templates ─────────────────────────────────────────────────────────

interface NeverStudiedParams {
  level: string;
  daysInactive: number;
  urgencyTier: string;
  topic: string;
}

function buildNeverStudiedEmail({ level, daysInactive, urgencyTier, topic }: NeverStudiedParams): string {
  const url = ctaUrl(topic);
  const lvl = `CFA Level ${level}`;
  const isUrgent = urgencyTier === "high" || urgencyTier === "critical";
  const accentColor = isUrgent ? "#ef4444" : "#6366f1";

  const bodyText = daysInactive <= 3
    ? `You signed up for <strong style="color:#f1f5f9">${lvl} prep</strong> ${daysInactive} day${daysInactive !== 1 ? "s" : ""} ago but haven't started your first session yet. The good news: your first session takes 8 minutes.`
    : `It's been <strong style="color:#f1f5f9">${daysInactive} days</strong> since you signed up for ${lvl} prep — and you haven't started yet. Every day counts. The exam doesn't wait.`;

  const insightText = topic === "Ethics"
    ? `Ethics is worth <strong>15–20% of the ${lvl} exam</strong> and candidates who start here consistently outperform those who don't. It's also the fastest topic to build confidence on.`
    : `<strong>${topic}</strong> is one of the highest-weight topics on the ${lvl} exam. Starting here gives you the biggest score boost per hour of study.`;

  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a14;color:#e2e8f0;margin:0;padding:24px;">
  <div style="max-width:480px;margin:0 auto;background:#141425;border-radius:16px;padding:32px;border:1px solid #2d2d5a;">
    <div style="font-size:32px;margin-bottom:16px;">📚</div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#f1f5f9;">Your ${lvl} prep is waiting</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;line-height:1.6;">${bodyText}</p>
    <div style="background:#1e1e3a;border-radius:12px;padding:16px 20px;margin-bottom:24px;border-left:4px solid ${accentColor};">
      <div style="font-size:13px;font-weight:700;color:#a5b4fc;margin-bottom:8px;">Why start with ${topic}?</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.6;">${insightText}</div>
    </div>
    <a href="${url}" style="display:block;background:${accentColor};color:#fff;text-align:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;margin-bottom:12px;">
      Start My ${topic} Session →
    </a>
    <div style="text-align:center;margin-bottom:20px;">
      <span style="font-size:12px;color:#475569;">5 questions · ~8 minutes · AI-personalised difficulty</span>
    </div>
    <p style="margin:0;font-size:11px;color:#475569;text-align:center;">
      ClearCFA — AI-powered ${lvl} exam prep<br/>
      <a href="${APP_URL}" style="color:#6366f1;">Open app</a>
    </p>
  </div>
</body>
</html>`;
}

interface LapsedParams {
  level: string;
  lastTopic: string;
  daysInactive: number;
  urgencyTier: string;
}

function buildLapsedEmail({ level, lastTopic, daysInactive, urgencyTier }: LapsedParams): string {
  const url = ctaUrl(lastTopic);
  const lvl = `CFA Level ${level}`;

  const configs: Record<string, { emoji: string; headline: string; body: string; insight: string; insightColor: string; insightLabel: string; btnColor: string; btnLabel: string }> = {
    soft: {
      emoji: "⚡",
      headline: `Quick ${lastTopic} catch-up`,
      body: `A few days off is normal. What matters is coming back before the habit breaks. You were building momentum — let's keep it going.`,
      insight: `Your AI coach has already identified your weakest sub-topic from last session. Tap below to drill it in 5 minutes.`,
      insightColor: "#f59e0b",
      insightLabel: "Quick 5-min catch-up session",
      btnColor: "#6366f1",
      btnLabel: "Resume My Prep →",
    },
    medium: {
      emoji: "📊",
      headline: `${daysInactive} days since your last ${lvl} session`,
      body: `You were making real progress. ${daysInactive} days away means some of what you learned is starting to fade — spaced repetition works best when it's consistent.`,
      insight: `Your spaced repetition deck has cards due for review. Each day you wait, more cards become overdue and harder to recover.`,
      insightColor: "#f59e0b",
      insightLabel: `${lastTopic} cards due for review`,
      btnColor: "#f59e0b",
      btnLabel: "Review My Cards →",
    },
    high: {
      emoji: "🔥",
      headline: `${daysInactive} days away — your ${lastTopic} progress is at risk`,
      body: `Spaced repetition only works when it's consistent. Taking ${daysInactive} days off means you're re-learning, not reinforcing. Get back on track now before the gap widens.`,
      insight: `Spaced repetition cards you previously got right are now overdue. The longer you wait, the more you forget — and the more time it takes to recover.`,
      insightColor: "#ef4444",
      insightLabel: "Your SR deck is overdue",
      btnColor: "#ef4444",
      btnLabel: "Get Back on Track →",
    },
    critical: {
      emoji: "🚨",
      headline: `${daysInactive} days inactive — your ${lvl} pass probability is dropping`,
      body: `It's been ${daysInactive} days. At this point, you've likely forgotten a meaningful portion of what you'd learned. The exam doesn't pause — but your prep has. One session today changes the trajectory.`,
      insight: `Even one 10-minute session reactivates your memory pathways and resets your SR deck cadence. The longer the gap, the harder the recovery.`,
      insightColor: "#ef4444",
      insightLabel: "Critical: re-activate your prep now",
      btnColor: "#ef4444",
      btnLabel: "Restart My Prep →",
    },
  };

  const c = configs[urgencyTier] || configs.medium;

  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#0a0a14;color:#e2e8f0;margin:0;padding:24px;">
  <div style="max-width:480px;margin:0 auto;background:#141425;border-radius:16px;padding:32px;border:1px solid #2d2d5a;">
    <div style="font-size:32px;margin-bottom:16px;">${c.emoji}</div>
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#f1f5f9;">${c.headline}</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;line-height:1.6;">${c.body}</p>
    <div style="background:#1e1e3a;border-radius:12px;padding:16px 20px;margin-bottom:24px;border-left:4px solid ${c.insightColor};">
      <div style="font-size:13px;font-weight:700;color:${c.insightColor};margin-bottom:8px;">${c.insightLabel}</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.6;">${c.insight}</div>
    </div>
    <a href="${url}" style="display:block;background:${c.btnColor};color:#fff;text-align:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;margin-bottom:12px;">
      ${c.btnLabel}
    </a>
    <div style="text-align:center;margin-bottom:20px;">
      <span style="font-size:12px;color:#475569;">Picks up exactly where you left off · ${lastTopic} · ${lvl}</span>
    </div>
    <p style="margin:0;font-size:11px;color:#475569;text-align:center;">
      ClearCFA — AI-powered ${lvl} exam prep<br/>
      <a href="${APP_URL}" style="color:#6366f1;">Open app</a>
    </p>
  </div>
</body>
</html>`;
}
