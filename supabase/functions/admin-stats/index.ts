// ClearCFA Admin Stats — Supabase Edge Function
// Deploy: supabase functions deploy admin-stats --project-ref uucxyuqxqjpbxecemdvf

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ADMIN_EMAIL = 'sai.praneeth557@gmail.com';

// Haiku pricing ($/M tokens)
const HAIKU_IN  = 0.80;
const HAIKU_OUT = 4.00;
// Avg tokens per generate call (question generation)
const AVG_IN_TOKENS  = 750;
const AVG_OUT_TOKENS = 450;
const COST_PER_CALL  = (AVG_IN_TOKENS * HAIKU_IN + AVG_OUT_TOKENS * HAIKU_OUT) / 1_000_000;

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  return p.catch(() => fallback);
}

async function queryTable(supabaseUrl: string, svcHeaders: Record<string, string>, path: string): Promise<unknown[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, { headers: svcHeaders });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return jsonResponse({ error: 'Invalid JSON' }, 400); }

  const { accessToken, userId } = body as { accessToken?: string; userId?: string };
  if (!accessToken && !userId) return jsonResponse({ error: 'No credentials' }, 401);

  const svcHeaders: Record<string, string> = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };

  let isAuthorized = false;

  if (accessToken) {
    // Supabase JWT path (magic link / OAuth)
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${accessToken}`, apikey: serviceKey },
    });
    if (!userRes.ok) return jsonResponse({ error: 'Auth failed' }, 401);
    const userInfo = await userRes.json() as { email?: string };
    if (userInfo.email === ADMIN_EMAIL) isAuthorized = true;
  } else if (userId) {
    // Password-based login path — look up stored email from sessions table
    const sessRes = await fetch(
      `${supabaseUrl}/rest/v1/sessions?user_id=eq.${encodeURIComponent(userId)}&select=data&limit=1`,
      { headers: svcHeaders }
    );
    if (sessRes.ok) {
      const sessData = await sessRes.json() as Array<{ data?: string }>;
      if (Array.isArray(sessData) && sessData.length > 0) {
        try {
          const parsed = JSON.parse(sessData[0].data || '{}') as { email?: string };
          if (parsed.email === ADMIN_EMAIL) isAuthorized = true;
        } catch { /* malformed data */ }
      }
    }
  }

  if (!isAuthorized) return jsonResponse({ error: 'Unauthorized' }, 403);

  // ── Anthropic cost report (uses existing ANTHROPIC_API_KEY) ──────────────
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
  let anthropicData: { spend30d: number; spend7d: number; dailyRate: number; fetched: boolean; error?: string } | null = null;
  if (anthropicKey) {
    try {
      const now0 = new Date();
      const d30ago = new Date(now0.getTime() - 30 * 86400000).toISOString();
      const d7ago  = new Date(now0.getTime() -  7 * 86400000).toISOString();
      const nowStr = now0.toISOString();

      const costRes = await fetch(
        `https://api.anthropic.com/v1/organizations/cost_report?starting_at=${encodeURIComponent(d30ago)}&ending_at=${encodeURIComponent(nowStr)}&bucket_width=1d`,
        { headers: { 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' } }
      );

      if (costRes.ok) {
        const costJson = await costRes.json() as { data?: Array<{ total_cost?: number; cost?: number; date?: string; timestamp?: string }> };
        const items = Array.isArray(costJson?.data) ? costJson.data : [];
        const spend30d = items.reduce((s, r) => s + (r.total_cost ?? r.cost ?? 0), 0);
        const cutoff = d7ago.slice(0, 10);
        const spend7d  = items.filter(r => (r.date ?? r.timestamp ?? '') >= cutoff)
                              .reduce((s, r) => s + (r.total_cost ?? r.cost ?? 0), 0);
        anthropicData = {
          spend30d: Math.round(spend30d * 10000) / 10000,
          spend7d:  Math.round(spend7d  * 10000) / 10000,
          dailyRate: Math.round(spend30d / 30 * 10000) / 10000,
          fetched: true,
        };
      } else {
        const errText = await costRes.text().catch(() => costRes.status.toString());
        anthropicData = { spend30d: 0, spend7d: 0, dailyRate: 0, fetched: false, error: `${costRes.status}: ${errText.slice(0, 200)}` };
      }
    } catch (e: unknown) {
      anthropicData = { spend30d: 0, spend7d: 0, dailyRate: 0, fetched: false, error: String(e).slice(0, 120) };
    }
  }

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const d14 = new Date(now.getTime() - 13 * 86400000).toISOString().slice(0, 10);
  const d7ts  = new Date(now.getTime() -  7 * 86400000).toISOString();
  const d30ts = new Date(now.getTime() - 30 * 86400000).toISOString();

  const chatD14 = `chat-${d14}`;

  // Run all queries in parallel
  const [sessions, aiQuota14, chatQuota14, subs, feedbackAll, feedbackRecent, flags, referrals] = await Promise.all([
    safe(queryTable(supabaseUrl, svcHeaders, 'sessions?select=user_id,updated_at&limit=5000') as Promise<Array<{user_id:string;updated_at:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `ai_quota?select=user_id,quota_date,quota_count&quota_date=gte.${d14}&quota_date=lt.z&limit=5000`) as Promise<Array<{user_id:string;quota_date:string;quota_count:number}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `ai_quota?select=user_id,quota_date,quota_count&quota_date=gte.${chatD14}&limit=5000`) as Promise<Array<{user_id:string;quota_date:string;quota_count:number}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `subscriptions?select=user_id,valid_until&active=eq.true&valid_until=gte.${now.toISOString()}&limit=500`) as Promise<Array<{user_id:string;valid_until:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=rating,category&category=neq.Question Flag&limit=2000') as Promise<Array<{rating:number;category:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=rating,category,message,created_at&category=neq.Question Flag&order=created_at.desc&limit=8') as Promise<Array<{rating:number;category:string;message:string;created_at:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=user_id,message,created_at&category=eq.Question Flag&order=created_at.desc&limit=50') as Promise<Array<{user_id:string;message:string;created_at:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'referrals?select=referrer_id&limit=2000') as Promise<Array<{referrer_id:string}>>, []),
  ]);

  // ── User metrics ────────────────────────────────────────────────────────────
  const allSessions = sessions as Array<{user_id:string;updated_at:string}>;
  const uniqueUsers = new Set(allSessions.map(s => s.user_id));
  const dau = new Set(allSessions.filter(s => s.updated_at.slice(0,10) === today).map(s => s.user_id)).size;
  const wau = new Set(allSessions.filter(s => s.updated_at >= d7ts).map(s => s.user_id)).size;
  const mau = new Set(allSessions.filter(s => s.updated_at >= d30ts).map(s => s.user_id)).size;
  // New users (accounts created in last 7 / 30 days) - sessions has created_at via updated_at proxy
  const recentSessions = allSessions.sort((a, b) => b.updated_at.localeCompare(a.updated_at)).slice(0, 5);

  // ── AI metrics ──────────────────────────────────────────────────────────────
  const aiRows = aiQuota14 as Array<{user_id:string;quota_date:string;quota_count:number}>;
  const aiToday = aiRows.filter(r => r.quota_date === today).reduce((s, r) => s + (r.quota_count || 0), 0);
  const aiWeek  = aiRows.reduce((s, r) => s + (r.quota_count || 0), 0);
  const usersAtLimit   = new Set(aiRows.filter(r => r.quota_date === today && r.quota_count >= 20).map(r => r.user_id)).size;
  const activeAiToday  = new Set(aiRows.filter(r => r.quota_date === today).map(r => r.user_id)).size;

  // 14-day daily trend
  const trendMap: Record<string, number> = {};
  for (const r of aiRows) {
    trendMap[r.quota_date] = (trendMap[r.quota_date] || 0) + (r.quota_count || 0);
  }
  const trend = Object.entries(trendMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // ── Cost metrics ─────────────────────────────────────────────────────────────
  const costWeek = Math.round(aiWeek * COST_PER_CALL * 10000) / 10000;
  const costToday = Math.round(aiToday * COST_PER_CALL * 10000) / 10000;

  // ── Revenue ──────────────────────────────────────────────────────────────────
  const subsRows = subs as Array<{user_id:string;valid_until:string}>;
  const proCount = new Set(subsRows.map(s => s.user_id)).size;
  const totalUsers = uniqueUsers.size;
  const conversionRate = totalUsers > 0 ? Math.round(proCount / totalUsers * 1000) / 10 : 0;
  const referralTotal = (referrals as Array<{referrer_id:string}>).length;

  // ── Chat metrics ─────────────────────────────────────────────────────────
  const chatRows = chatQuota14 as Array<{user_id:string;quota_date:string;quota_count:number}>;
  const chatTodayDate = `chat-${today}`;
  const chatToday = chatRows.filter(r => r.quota_date === chatTodayDate).reduce((s, r) => s + (r.quota_count || 0), 0);
  const chatWeek  = chatRows.reduce((s, r) => s + (r.quota_count || 0), 0);
  // Chat token estimates: ~400 in / ~300 out
  const CHAT_IN = 400; const CHAT_OUT = 300;
  const COST_PER_CHAT = (CHAT_IN * HAIKU_IN + CHAT_OUT * HAIKU_OUT) / 1_000_000;
  const chatCostToday = Math.round(chatToday * COST_PER_CHAT * 10000) / 10000;
  const chatCostWeek  = Math.round(chatWeek  * COST_PER_CHAT * 10000) / 10000;

  const chatTrendMap: Record<string, number> = {};
  for (const r of chatRows) {
    const dateKey = r.quota_date.replace(/^chat-/, '');
    chatTrendMap[dateKey] = (chatTrendMap[dateKey] || 0) + (r.quota_count || 0);
  }
  const chatTrend = Object.entries(chatTrendMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // ── Total cost ────────────────────────────────────────────────────────────
  const totalCostToday = Math.round((costToday + chatCostToday) * 10000) / 10000;
  const totalCostWeek  = Math.round((costWeek  + chatCostWeek)  * 10000) / 10000;
  const dailyRate = Math.round(totalCostWeek / 7 * 10000) / 10000;

  // ── Feedback ─────────────────────────────────────────────────────────────────
  const fbAll = (feedbackAll as Array<{rating:number;category:string}>).filter(f => f.rating > 0);
  const avgRating = fbAll.length > 0
    ? Math.round(fbAll.reduce((s, f) => s + f.rating, 0) / fbAll.length * 10) / 10
    : null;
  const byCategory: Record<string, number> = {};
  for (const f of fbAll) { byCategory[f.category] = (byCategory[f.category] || 0) + 1; }

  // ── Flagged questions ─────────────────────────────────────────────────────
  const flagRows = (flags as Array<{user_id:string;message:string;created_at:string}>).map(f => {
    let parsed: Record<string, unknown> = {};
    try { parsed = JSON.parse(f.message); } catch { /* raw message */ }
    return {
      user_id:    f.user_id,
      created_at: f.created_at,
      reason:     (parsed.reason as string) || f.message.slice(0, 80),
      topic:      (parsed.topic as string) || '—',
      module:     (parsed.module as string) || '—',
      question:   (parsed.question as string) || '—',
    };
  });

  return jsonResponse({
    users:    { total: totalUsers, dau, wau, mau, recentSessions },
    ai:       { today: aiToday, week: aiWeek, usersAtLimit, activeAiToday, trend },
    chat:     { today: chatToday, week: chatWeek, costToday: chatCostToday, costWeek: chatCostWeek, trend: chatTrend },
    cost:     {
      generateToday: costToday, generateWeek: costWeek,
      chatToday: chatCostToday, chatWeek: chatCostWeek,
      totalToday: totalCostToday, totalWeek: totalCostWeek,
      dailyRate,
      perGenerateCall: Math.round(COST_PER_CALL * 1_000_000) / 1_000_000,
      perChatCall:     Math.round(COST_PER_CHAT * 1_000_000) / 1_000_000,
    },
    revenue:  { proCount, freeCount: Math.max(0, totalUsers - proCount), conversionRate, referrals: referralTotal },
    feedback: { total: fbAll.length, avgRating, byCategory, recent: feedbackRecent },
    flags:    { total: flagRows.length, items: flagRows.slice(0, 50) },
    anthropic: anthropicData,
    generatedAt: now.toISOString(),
  });
});
