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

  const { accessToken } = body as { accessToken?: string };
  if (!accessToken) return jsonResponse({ error: 'No access token' }, 401);

  // Verify the token and gate on admin email
  const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${accessToken}`, apikey: serviceKey },
  });
  if (!userRes.ok) return jsonResponse({ error: 'Auth failed' }, 401);
  const userInfo = await userRes.json() as { email?: string };
  if (userInfo.email !== ADMIN_EMAIL) return jsonResponse({ error: 'Unauthorized' }, 403);

  const svcHeaders: Record<string, string> = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const d14 = new Date(now.getTime() - 13 * 86400000).toISOString().slice(0, 10);
  const d7ts  = new Date(now.getTime() -  7 * 86400000).toISOString();
  const d30ts = new Date(now.getTime() - 30 * 86400000).toISOString();

  // Run all queries in parallel
  const [sessions, aiQuota14, subs, feedbackAll, feedbackRecent, referrals] = await Promise.all([
    safe(queryTable(supabaseUrl, svcHeaders, 'sessions?select=user_id,updated_at&limit=5000') as Promise<Array<{user_id:string;updated_at:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `ai_quota?select=user_id,quota_date,quota_count&quota_date=gte.${d14}&limit=5000`) as Promise<Array<{user_id:string;quota_date:string;quota_count:number}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, `subscriptions?select=user_id,valid_until&active=eq.true&valid_until=gte.${now.toISOString()}&limit=500`) as Promise<Array<{user_id:string;valid_until:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=rating,category&limit=2000') as Promise<Array<{rating:number;category:string}>>, []),
    safe(queryTable(supabaseUrl, svcHeaders, 'feedback?select=rating,category,message,created_at&order=created_at.desc&limit=8') as Promise<Array<{rating:number;category:string;message:string;created_at:string}>>, []),
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

  // ── Feedback ─────────────────────────────────────────────────────────────────
  const fbAll = (feedbackAll as Array<{rating:number;category:string}>).filter(f => f.rating > 0);
  const avgRating = fbAll.length > 0
    ? Math.round(fbAll.reduce((s, f) => s + f.rating, 0) / fbAll.length * 10) / 10
    : null;
  const byCategory: Record<string, number> = {};
  for (const f of fbAll) { byCategory[f.category] = (byCategory[f.category] || 0) + 1; }

  return jsonResponse({
    users:    { total: totalUsers, dau, wau, mau, recentSessions },
    ai:       { today: aiToday, week: aiWeek, usersAtLimit, activeAiToday, trend },
    cost:     { today: costToday, week: costWeek, perCall: Math.round(COST_PER_CALL * 1_000_000) / 1_000_000 },
    revenue:  { proCount, freeCount: Math.max(0, totalUsers - proCount), conversionRate, referrals: referralTotal },
    feedback: { total: fbAll.length, avgRating, byCategory, recent: feedbackRecent },
    generatedAt: now.toISOString(),
  });
});
