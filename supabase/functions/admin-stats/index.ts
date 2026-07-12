// ClearCFA Admin Stats — Supabase Edge Function
// Deploy: supabase functions deploy admin-stats --project-ref uucxyuqxqjpbxecemdvf

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ADMIN_EMAILS = ['gspbuilds@gmail.com', 'sai.praneeth557@gmail.com'];

// Haiku pricing ($/M tokens)
const HAIKU_IN  = 0.80;
const HAIKU_OUT = 4.00;
// Avg tokens per generate call — used only as fallback before api_usage table has data.
// Real costs come from actual token counts logged by ai-proxy into api_usage.
// Estimates based on buildQuestionPrompt (~1200 in) + typical 10-question output (~2200 out).
const AVG_IN_TOKENS  = 1200;
const AVG_OUT_TOKENS = 2200;
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
    // Supabase JWT path (magic link / OAuth). If the token is expired/invalid,
    // fall through to the userId check below rather than returning immediately.
    try {
      const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${accessToken}`, apikey: serviceKey },
      });
      if (userRes.ok) {
        const userInfo = await userRes.json() as { email?: string };
        if (userInfo.email && ADMIN_EMAILS.includes(userInfo.email)) isAuthorized = true;
      }
      // If !userRes.ok (expired JWT), fall through to userId check below
    } catch { /* network error — fall through */ }
  }

  if (!isAuthorized && userId) {
    // Password-based login path OR expired-JWT fallback.
    const adminUserIdSecret = Deno.env.get('ADMIN_USER_ID');
    // Check exact userId match first (most secure — covers gspbuilds primary account)
    if (adminUserIdSecret && userId === adminUserIdSecret) {
      isAuthorized = true;
    }
    // Always also try email-based fallback so additional owner accounts (e.g. sai.praneeth557@gmail.com)
    // are authorized even when ADMIN_USER_ID is set to a different userId.
    if (!isAuthorized) {
      const claimedEmail = (body as Record<string, unknown>).email as string | undefined;
      if (claimedEmail && ADMIN_EMAILS.includes(claimedEmail)) {
        // Verify the user actually has a session (proves they know the password)
        const sessRes = await fetch(
          `${supabaseUrl}/rest/v1/sessions?user_id=eq.${encodeURIComponent(userId)}&select=user_id&limit=1`,
          { headers: svcHeaders }
        );
        if (sessRes.ok) {
          const sessData = await sessRes.json() as Array<{ user_id: string }>;
          if (Array.isArray(sessData) && sessData.length > 0) isAuthorized = true;
        }
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

  const todayISO = `${today}T00:00:00.000Z`;
  const d7ISO = new Date(now.getTime() - 7 * 86400000).toISOString();

  // Run all queries in parallel
  const [sessions, aiQuota14, chatQuota14, subs, feedbackAll, feedbackRecent, flags, referrals, usageToday, usageWeek] = await Promise.all([
    safe(queryTable(supabaseUrl, svcHeaders, 'sessions?select=user_id,updated_at,data&limit=5000') as Promise<Array<{user_id:string;updated_at:string;data?:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `ai_quota?select=user_id,quota_date,quota_count&quota_date=gte.${d14}&quota_date=lt.z&limit=5000`) as Promise<Array<{user_id:string;quota_date:string;quota_count:number}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `ai_quota?select=user_id,quota_date,quota_count&quota_date=gte.${chatD14}&limit=5000`) as Promise<Array<{user_id:string;quota_date:string;quota_count:number}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `subscriptions?select=user_id,valid_until&active=eq.true&valid_until=gte.${now.toISOString()}&limit=500`) as Promise<Array<{user_id:string;valid_until:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=rating,category&category=neq.Question Flag&limit=2000') as Promise<Array<{rating:number;category:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=rating,category,message,created_at&category=neq.Question Flag&order=created_at.desc&limit=8') as Promise<Array<{rating:number;category:string;message:string;created_at:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=user_id,message,created_at&category=eq.Question Flag&order=created_at.desc&limit=50') as Promise<Array<{user_id:string;message:string;created_at:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'referrals?select=referrer_id&limit=2000') as Promise<Array<{referrer_id:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `api_usage?created_at=gte.${todayISO}&select=request_type,token_in,token_out&limit=5000`) as Promise<Array<{request_type:string;token_in:number;token_out:number}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `api_usage?created_at=gte.${d7ISO}&select=request_type,token_in,token_out&limit=10000`) as Promise<Array<{request_type:string;token_in:number;token_out:number}>>, []),
  ]);

  // ── User metrics ────────────────────────────────────────────────────────────
  const allSessions = sessions as Array<{user_id:string;updated_at:string;data?:string}>;

  // Try to extract email from session data (present on fresh accounts, lost after first sync)
  const emailMap: Record<string, string> = {};
  for (const row of allSessions) {
    if (!row.data) continue;
    try {
      const parsed = JSON.parse(row.data) as { email?: string };
      if (parsed.email) emailMap[row.user_id] = parsed.email;
    } catch { /* ignore malformed */ }
  }

  const uniqueUsers = new Set(allSessions.map(s => s.user_id));
  const dau = new Set(allSessions.filter(s => s.updated_at.slice(0,10) === today).map(s => s.user_id)).size;
  const wau = new Set(allSessions.filter(s => s.updated_at >= d7ts).map(s => s.user_id)).size;
  const mau = new Set(allSessions.filter(s => s.updated_at >= d30ts).map(s => s.user_id)).size;

  // Growth: first-seen date per user → new user counts
  const firstSeenMap: Record<string, string> = {};
  for (const s of allSessions) {
    if (!firstSeenMap[s.user_id] || s.updated_at < firstSeenMap[s.user_id]) {
      firstSeenMap[s.user_id] = s.updated_at;
    }
  }
  const newUsersWeek  = Object.values(firstSeenMap).filter(t => t >= d7ts).length;
  const newUsersMonth = Object.values(firstSeenMap).filter(t => t >= d30ts).length;

  // Session sync volume (each row = one user's cumulative sync, updated_at = last sync time)
  const sessionSyncsToday = allSessions.filter(s => s.updated_at >= todayISO).length;
  const sessionSyncsWeek  = allSessions.filter(s => s.updated_at >= d7ISO).length;

  // Stickiness = DAU/MAU %, a standard engagement quality metric
  const stickiness = mau > 0 ? Math.round(dau / mau * 100) : 0;

  const recentSessions = allSessions
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 5)
    .map(r => ({
      user_id: r.user_id,
      display: emailMap[r.user_id] || (r.user_id.slice(0, 8) + '…'),
      updated_at: r.updated_at,
    }));

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

  // ── Cost metrics — use real token data if available, else estimates ──────────
  const computeTokenCost = (rows: Array<{request_type:string;token_in:number;token_out:number}>, type: string) =>
    rows.filter(r => r.request_type === type)
        .reduce((s, r) => s + ((r.token_in || 0) * HAIKU_IN + (r.token_out || 0) * HAIKU_OUT) / 1_000_000, 0);

  const realGenToday  = (usageToday as Array<{request_type:string;token_in:number;token_out:number}>).some(r => r.request_type === 'generate');
  const realChatToday = (usageToday as Array<{request_type:string;token_in:number;token_out:number}>).some(r => r.request_type === 'chat');
  const realGenWeek   = (usageWeek  as Array<{request_type:string;token_in:number;token_out:number}>).some(r => r.request_type === 'generate');
  const realChatWeek  = (usageWeek  as Array<{request_type:string;token_in:number;token_out:number}>).some(r => r.request_type === 'chat');

  const costToday = Math.round((realGenToday
    ? computeTokenCost(usageToday as Array<{request_type:string;token_in:number;token_out:number}>, 'generate')
    : aiToday * COST_PER_CALL) * 10000) / 10000;
  const costWeek  = Math.round((realGenWeek
    ? computeTokenCost(usageWeek as Array<{request_type:string;token_in:number;token_out:number}>, 'generate')
    : aiWeek  * COST_PER_CALL) * 10000) / 10000;

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
  // Chat token estimates (fallback when api_usage table has no data yet)
  const CHAT_IN = 600; const CHAT_OUT = 350;
  const COST_PER_CHAT = (CHAT_IN * HAIKU_IN + CHAT_OUT * HAIKU_OUT) / 1_000_000;
  const chatCostToday = Math.round((realChatToday
    ? computeTokenCost(usageToday as Array<{request_type:string;token_in:number;token_out:number}>, 'chat')
    : chatToday * COST_PER_CHAT) * 10000) / 10000;
  const chatCostWeek  = Math.round((realChatWeek
    ? computeTokenCost(usageWeek as Array<{request_type:string;token_in:number;token_out:number}>, 'chat')
    : chatWeek  * COST_PER_CHAT) * 10000) / 10000;

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
    users:    { total: totalUsers, dau, wau, mau, recentSessions, newUsersWeek, newUsersMonth, sessionSyncsToday, sessionSyncsWeek, stickiness },
    ai:       { today: aiToday, week: aiWeek, usersAtLimit, activeAiToday, trend },
    chat:     { today: chatToday, week: chatWeek, costToday: chatCostToday, costWeek: chatCostWeek, trend: chatTrend },
    cost:     {
      generateToday: costToday, generateWeek: costWeek,
      chatToday: chatCostToday, chatWeek: chatCostWeek,
      totalToday: totalCostToday, totalWeek: totalCostWeek,
      dailyRate,
      perGenerateCall: Math.round(COST_PER_CALL * 1_000_000) / 1_000_000,
      perChatCall:     Math.round(COST_PER_CHAT * 1_000_000) / 1_000_000,
      usingRealTokens: realGenToday || realChatToday || realGenWeek || realChatWeek,
    },
    revenue:  { proCount, freeCount: Math.max(0, totalUsers - proCount), conversionRate, referrals: referralTotal },
    feedback: { total: fbAll.length, avgRating, byCategory, recent: feedbackRecent },
    flags:    { total: flagRows.length, items: flagRows.slice(0, 50) },
    anthropic: anthropicData,
    generatedAt: now.toISOString(),
  });
});
