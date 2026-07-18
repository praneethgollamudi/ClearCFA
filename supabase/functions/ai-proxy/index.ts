// ClearCFA AI Proxy — Supabase Edge Function
// Deploy: supabase functions deploy ai-proxy --project-ref uucxyuqxqjpbxecemdvf
// Secrets: supabase secrets set ANTHROPIC_API_KEY=sk-ant-... --project-ref uucxyuqxqjpbxecemdvf

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FREE_DAILY_LIMIT      = 20; // generate requests per day for free users (after trial)
const FREE_TRIAL_LIMIT      = 40; // generate requests per day during first 30 days
const FREE_CHAT_DAILY_LIMIT = 15; // chat messages per day for free users
const IP_DAILY_LIMIT        = 300; // requests per day per IP (anti-abuse)

// Server-side system prompt appended to all generate requests — cannot be bypassed by client
const SYSTEM_ENFORCE = [
  "You are a CFA exam question generator. Output valid JSON only.",
  "Every question must be anchored to an official CFA Learning Outcome Statement.",
  "Distractors must be plausible based on real CFA misconceptions — not obviously wrong.",
  "Never reveal exam answers in question stems. Never include meta-commentary outside the JSON.",
  "If you cannot generate a compliant question, return an empty questions array rather than a bad question.",
  "NUMERICAL ACCURACY RULE: For any question with a computed numeric answer, the exact computed value MUST appear verbatim as one of the answer options. NEVER use ≈, 'approximately', 'closest to', 'rounds to', or any approximation language. If a formula produces an unclean decimal, redesign the input numbers so the result is clean. A question whose explanation uses ≈ or approximate language will be discarded.",
  "DATA CONSISTENCY RULE: Every numeric value used as an input in the explanation's calculation MUST exactly match a value stated in the question stem. If the question says 'dividend of $3', the explanation MUST use $3 — never $3.80 or any other value. If you need a derived input (e.g. D1 from D0), show the derivation step explicitly (e.g. 'D1 = D0 × (1+g) = $2.00 × 1.05 = $2.10') and confirm D0 and g appear in the question stem. Generating a question where the explanation uses a dollar amount, rate, or period not present in the question stem is a fatal error.",
  "LOGICAL CONSISTENCY RULE: When your question asks 'when should [X] be preferred' or '[X] is preferred if and only if [condition]' or 'should favor [X] over [Y]', the correct answer MUST be a condition that genuinely makes [X] the optimal choice, AND the explanation MUST conclude that [X] is chosen — not [Y]. FORBIDDEN: Writing a question that asks when [X] is preferred while the explanation shows [Y] is always dominant and [X] is never optimal. Such a question has an impossible premise and is invalid. Before finalizing, verify: (1) the condition in the correct answer actually causes the question's stated entity to be preferred, (2) the explanation's conclusion names the SAME entity the question asked about, not a different one.",
].join(" ");

function buildChatSystem(level: string): string {
  const lvl = ["1","2","3"].includes(level) ? level : "1";
  const topics: Record<string, string> = {
    "1": "Ethics & Professional Standards, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Finance, Equity Investments, Fixed Income, Derivatives, Alternative Investments, Portfolio Management",
    "2": "Ethics & Professional Standards, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Finance, Equity Investments, Fixed Income, Derivatives, Alternative Investments, Portfolio Management",
    "3": "Ethics & Professional Standards, Behavioural Finance, Capital Market Expectations, Asset Allocation, Fixed Income Portfolio Management, Equity Portfolio Management, Derivatives & Currency Management, Alternative Investments, Risk Management, Portfolio Construction & Trading",
  };
  const refusal = `I'm here to help with CFA Level ${lvl} exam topics only.`;
  return [
    `You are a CFA Level ${lvl} exam preparation tutor.`,
    `You may ONLY discuss CFA Level ${lvl} curriculum topics: ${topics[lvl]}.`,
    `If asked about ANYTHING outside CFA Level ${lvl}, respond only with: "${refusal}"`,
    "Never invent specific CFA rules, thresholds, or figures — if uncertain say 'verify this in the official CFA curriculum.'",
    "Be concise: 3 short paragraphs maximum. Use numeric examples where they clarify. Plain text only, no markdown.",
  ].join(" ");
}

const MAX_CHAT_TOKENS = 900;
const MAX_CHAT_HISTORY = 10;
const MAX_MSG_CHARS = 800;

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

function todayUTC(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

// Returns true if user has an active Pro subscription.
async function checkIsPro(supabaseUrl: string, serviceKey: string, userId: string): Promise<boolean> {
  try {
    const now = new Date().toISOString();
    const res = await fetch(
      `${supabaseUrl}/rest/v1/subscriptions?user_id=eq.${encodeURIComponent(userId)}&active=eq.true&valid_until=gte.${encodeURIComponent(now)}&select=user_id&limit=1`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return false; // fail open — treat as free if check errors
  }
}

// IP-based rate limiter — 300 req/day per IP to prevent abuse.
async function checkIpRateLimit(
  supabaseUrl: string,
  serviceKey: string,
  ip: string
): Promise<boolean> {
  if (!ip) return true; // unknown IP — allow
  const today = todayUTC();
  const ipDate = `ip:${today}:${ip.slice(0, 45)}`; // truncate IPv6 to fit column
  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
  try {
    const getRes = await fetch(
      `${supabaseUrl}/rest/v1/ip_rate_limit?ip_date=eq.${encodeURIComponent(ipDate)}&select=req_count`,
      { headers }
    );
    const rows = await getRes.json() as Array<{ req_count: number }>;
    const count = Array.isArray(rows) && rows.length > 0 ? (rows[0].req_count ?? 0) : 0;
    if (count >= IP_DAILY_LIMIT) return false;
    // Upsert incremented count
    await fetch(`${supabaseUrl}/rest/v1/ip_rate_limit`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ ip_date: ipDate, req_count: count + 1, updated_at: new Date().toISOString() }),
    });
    return true;
  } catch {
    return true; // DB error — allow rather than block
  }
}

// Returns true if user's first AI usage was within the last 30 days (new-user trial).
async function isNewUserTrial(supabaseUrl: string, serviceKey: string, userId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/ai_quota?user_id=eq.${encodeURIComponent(userId)}&quota_date=not.like.chat-*&order=quota_date.asc&limit=1&select=quota_date`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    const rows = await res.json() as Array<{ quota_date: string }>;
    if (!Array.isArray(rows) || rows.length === 0) return true; // no prior usage → new user
    const firstDate = rows[0].quota_date;
    const daysDiff = (Date.now() - new Date(firstDate + 'T00:00:00Z').getTime()) / 86400000;
    return daysDiff <= 30;
  } catch {
    return false;
  }
}

// Atomically increments the daily counter for a free user.
// Returns { allowed: boolean, used: number, limit: number }.
async function checkAndIncrementQuota(
  supabaseUrl: string,
  serviceKey: string,
  userId: string,
  limit: number = FREE_DAILY_LIMIT
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const today = todayUTC();
  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };

  // Fetch current row
  try {
    const getRes = await fetch(
      `${supabaseUrl}/rest/v1/ai_quota?user_id=eq.${encodeURIComponent(userId)}&select=quota_date,quota_count`,
      { headers }
    );
    const rows = await getRes.json() as Array<{ quota_date: string; quota_count: number }>;

    let currentCount = 0;
    if (Array.isArray(rows) && rows.length > 0) {
      const row = rows[0];
      // Same day — use existing count; different day — count resets to 0
      currentCount = row.quota_date === today ? (row.quota_count ?? 0) : 0;
    }

    if (currentCount >= limit) {
      return { allowed: false, used: currentCount, limit };
    }

    // Upsert with incremented count
    const newCount = currentCount + 1;
    const upsertRes = await fetch(
      `${supabaseUrl}/rest/v1/ai_quota`,
      {
        method: 'POST',
        headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({ user_id: userId, quota_date: today, quota_count: newCount }),
      }
    );

    if (!upsertRes.ok) {
      return { allowed: true, used: newCount, limit };
    }

    return { allowed: true, used: newCount, limit };
  } catch {
    return { allowed: true, used: 0, limit };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY') ?? '';

  if (!anthropicKey) return jsonResponse({ error: 'Service not configured.' }, 503);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return jsonResponse({ error: 'Invalid JSON' }, 400); }

  const { userId, requestType, messages, prompt, maxTokens, model, level } = body as Record<string, unknown>;

  // Require a valid userId
  if (!userId || typeof userId !== 'string' || userId.length < 32) {
    return jsonResponse({ error: 'Sign in to use AI features.' }, 401);
  }

  // ── LOG WRONG ANSWERS (data flywheel, fire-and-forget from client) ───────
  if (requestType === 'log_wrongs') {
    const wrongs = body.wrongs;
    if (!Array.isArray(wrongs) || wrongs.length === 0) {
      return jsonResponse({ ok: true });
    }
    // Sanitize and insert — ignore errors (best-effort analytics)
    const rows = (wrongs as Array<Record<string, unknown>>).slice(0, 20).map(w => ({
      user_id: userId,
      topic: String(w.topic ?? '').slice(0, 120),
      module: String(w.module ?? '').slice(0, 120),
      q_hash: String(w.hash ?? '').slice(0, 64),
      correct_answer: String(w.correct ?? '').slice(0, 200),
      wrong_answer: String(w.wrong ?? '').slice(0, 200),
    }));
    try {
      await fetch(`${supabaseUrl}/rest/v1/wrong_answers`, {
        method: 'POST',
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(rows),
      });
    } catch { /* never block on analytics failure */ }
    return jsonResponse({ ok: true });
  }

  // Verify user exists in our sessions table
  try {
    const checkRes = await fetch(
      `${supabaseUrl}/rest/v1/sessions?user_id=eq.${encodeURIComponent(userId as string)}&limit=1`,
      { headers: { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}` } }
    );
    const rows = await checkRes.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return jsonResponse({ error: 'Account not found. Please sign in and sync first.' }, 403);
    }
  } catch {
    return jsonResponse({ error: 'Auth check failed — try again.' }, 503);
  }

  // IP rate limit check (anti-abuse, applied after auth)
  const clientIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
  const ipAllowed = await checkIpRateLimit(supabaseUrl, supabaseServiceKey, clientIp);
  if (!ipAllowed) {
    return jsonResponse({ error: 'Too many requests from your network. Try again tomorrow.' }, 429);
  }

  // ── CHAT (tutor Q&A) — soft quota for free users ────────────────────────
  if (requestType === 'chat') {
    if (!Array.isArray(messages) || (messages as unknown[]).length === 0) {
      return jsonResponse({ error: 'No messages provided.' }, 400);
    }

    // Enforce daily chat limit for free users
    const isChatPro = await checkIsPro(supabaseUrl, supabaseServiceKey, userId as string);
    if (!isChatPro) {
      const today = todayUTC();
      const chatDate = `chat-${today}`;
      try {
        const getRes = await fetch(
          `${supabaseUrl}/rest/v1/ai_quota?user_id=eq.${encodeURIComponent(userId as string)}&quota_date=eq.${chatDate}&select=quota_count`,
          { headers: { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}` } }
        );
        const rows = await getRes.json() as Array<{ quota_count: number }>;
        const used = Array.isArray(rows) && rows.length > 0 ? (rows[0].quota_count ?? 0) : 0;
        if (used >= FREE_CHAT_DAILY_LIMIT) {
          return jsonResponse({
            error: `Daily chat limit reached (${FREE_CHAT_DAILY_LIMIT} messages/day on free plan). Upgrade to Pro for unlimited AI tutoring.`,
            quotaExceeded: true,
            used,
            limit: FREE_CHAT_DAILY_LIMIT,
          }, 429);
        }
      } catch { /* DB error — allow rather than block */ }
    }

    const trimmed = (messages as Array<{role: string; content: string}>)
      .slice(-MAX_CHAT_HISTORY)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: String(m.content ?? '').slice(0, MAX_MSG_CHARS),
      }));

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: Math.min(typeof maxTokens === 'number' ? maxTokens : MAX_CHAT_TOKENS, MAX_CHAT_TOKENS),
        temperature: 0.2,
        system: buildChatSystem(typeof level === 'string' ? level : '1'),
        messages: trimmed,
      }),
    });

    const data = await res.json();

    // Increment chat counter in ai_quota and log actual token usage
    if (res.ok) {
      const chatDate = `chat-${todayUTC()}`;
      const svcHdrs = { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}`, 'Content-Type': 'application/json' };
      try {
        const chatGetRes = await fetch(
          `${supabaseUrl}/rest/v1/ai_quota?user_id=eq.${encodeURIComponent(userId as string)}&quota_date=eq.${chatDate}&select=quota_count`,
          { headers: { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}` } }
        );
        const chatRows = await chatGetRes.json() as Array<{ quota_count: number }>;
        const chatCount = Array.isArray(chatRows) && chatRows.length > 0 ? (chatRows[0].quota_count || 0) + 1 : 1;
        await fetch(`${supabaseUrl}/rest/v1/ai_quota`, {
          method: 'POST',
          headers: { ...svcHdrs, Prefer: 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify({ user_id: userId, quota_date: chatDate, quota_count: chatCount }),
        });
      } catch { /* never block on analytics failure */ }
      // Log actual token counts for accurate cost reporting
      const usage = (data as { usage?: { input_tokens?: number; output_tokens?: number } }).usage;
      if (usage?.input_tokens != null) {
        fetch(`${supabaseUrl}/rest/v1/api_usage`, {
          method: 'POST',
          headers: { ...svcHdrs, Prefer: 'return=minimal' },
          body: JSON.stringify({ user_id: userId, request_type: 'chat', token_in: usage.input_tokens, token_out: usage.output_tokens ?? 0 }),
        }).catch(() => {});
      }
    }

    return jsonResponse(data, res.ok ? 200 : res.status);
  }

  // ── GENERATE (question / content generation) — quota enforced ────────────
  if (requestType === 'generate') {
    if (!prompt || typeof prompt !== 'string') return jsonResponse({ error: 'No prompt provided.' }, 400);

    // Check pro status; free users are subject to daily quota
    const isPro = await checkIsPro(supabaseUrl, supabaseServiceKey, userId as string);

    if (!isPro) {
      const isTrial = await isNewUserTrial(supabaseUrl, supabaseServiceKey, userId as string);
      const effectiveLimit = isTrial ? FREE_TRIAL_LIMIT : FREE_DAILY_LIMIT;
      const quota = await checkAndIncrementQuota(supabaseUrl, supabaseServiceKey, userId as string, effectiveLimit);
      if (!quota.allowed) {
        const trialNote = isTrial ? ` (first 30 days: ${FREE_TRIAL_LIMIT}/day)` : '';
        return jsonResponse({
          error: `Daily limit reached (${quota.limit} AI questions/day on free plan${trialNote}). Upgrade to Pro for unlimited access.`,
          quotaExceeded: true,
          used: quota.used,
          limit: quota.limit,
          isTrial,
        }, 429);
      }
    }

    const cappedTokens = Math.min(typeof maxTokens === 'number' ? maxTokens : 4000, 8000);
    const useModel = typeof model === 'string' ? model : 'claude-haiku-4-5-20251001';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: useModel,
        max_tokens: cappedTokens,
        system: SYSTEM_ENFORCE,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (res.status === 429 || res.status === 529) {
      const retryAfter = res.headers.get('retry-after');
      return jsonResponse({ error: `Rate limit — retry in ${retryAfter ?? '60'}s.` }, 429);
    }

    const data = await res.json();
    // Log actual token counts for accurate cost reporting (fire-and-forget)
    if (res.ok) {
      const usage = (data as { usage?: { input_tokens?: number; output_tokens?: number } }).usage;
      if (usage?.input_tokens != null) {
        fetch(`${supabaseUrl}/rest/v1/api_usage`, {
          method: 'POST',
          headers: {
            apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json', Prefer: 'return=minimal',
          },
          body: JSON.stringify({ user_id: userId, request_type: 'generate', token_in: usage.input_tokens, token_out: usage.output_tokens ?? 0 }),
        }).catch(() => {});
      }
    }
    return jsonResponse(data, res.ok ? 200 : res.status);
  }

  // ── ANALYZE MOCK PDF (exam-length study plan from uploaded mock review) ─────
  if (requestType === 'analyze_mock_pdf') {
    const pdfText = body.pdfText;
    if (!pdfText || typeof pdfText !== 'string' || pdfText.length < 50) {
      return jsonResponse({ error: 'Could not extract text from this PDF.' }, 400);
    }

    // 3 PDF analyses per day for free users, unlimited for Pro
    const isPdfPro = await checkIsPro(supabaseUrl, supabaseServiceKey, userId as string);
    if (!isPdfPro) {
      const pdfDate = `pdf-${todayUTC()}`;
      const svcHdrs = { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}`, 'Content-Type': 'application/json' };
      try {
        const getRes = await fetch(
          `${supabaseUrl}/rest/v1/ai_quota?user_id=eq.${encodeURIComponent(userId as string)}&quota_date=eq.${pdfDate}&select=quota_count`,
          { headers: { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}` } }
        );
        const rows = await getRes.json() as Array<{ quota_count: number }>;
        const used = Array.isArray(rows) && rows.length > 0 ? (rows[0].quota_count ?? 0) : 0;
        if (used >= 3) {
          return jsonResponse({ error: 'Daily PDF analysis limit reached (3/day on free plan). Upgrade to Pro for unlimited.', quotaExceeded: true }, 429);
        }
        await fetch(`${supabaseUrl}/rest/v1/ai_quota`, {
          method: 'POST',
          headers: { ...svcHdrs, Prefer: 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify({ user_id: userId, quota_date: pdfDate, quota_count: used + 1 }),
        });
      } catch { /* allow on DB error */ }
    }

    const cfaLvl = typeof level === 'string' ? level : '1';
    const examDateStr = typeof body.examDate === 'string' ? body.examDate : 'approximately 60 days away';
    const daysLeft = typeof body.daysLeft === 'number' ? body.daysLeft : 60;
    const mockPerfHistory = Array.isArray(body.mockPerfHistory) ? body.mockPerfHistory : [];
    const historyContext = mockPerfHistory.length > 0
      ? `\n\nPRIOR UPLOAD HISTORY (${mockPerfHistory.length} previous mock reviews analyzed):\n${JSON.stringify(mockPerfHistory.slice(-3))}`
      : '';
    const uploadCount = mockPerfHistory.length + 1;

    const analysisPrompt = `You are a CFA Level ${cfaLvl} exam coach. Analyze this mock exam review text and generate a phased study plan covering the time until the exam.

MOCK EXAM REVIEW TEXT:
${(pdfText as string).slice(0, 13000)}
${historyContext}

EXAM DATE: ${examDateStr}
DAYS UNTIL EXAM: ${daysLeft}
UPLOAD NUMBER: ${uploadCount} (this is the ${uploadCount === 1 ? '1st' : uploadCount === 2 ? '2nd' : uploadCount === 3 ? '3rd' : uploadCount + 'th'} mock review analyzed)

Generate a JSON study plan. Return ONLY valid JSON with no markdown or explanation:
{
  "summary": "2-3 sentence plain-English coaching summary of what this mock shows and exactly what the user must do to pass",
  "estimatedPassProb": "e.g. 52%",
  "phases": [
    {
      "id": "phase1",
      "title": "Phase 1: [short descriptive name based on actual weak areas]",
      "weeks": "Weeks 1-N (dates if possible)",
      "startDay": 1,
      "endDay": 21,
      "primaryFocus": "Exact CFA topic name",
      "secondaryFocus": "Exact CFA topic name or null",
      "weeklyTarget": "e.g. 5 sessions/week, 10Q each — Fixed Income only",
      "milestoneGoal": "Specific measurable target: e.g. Score 70%+ on Fixed Income by Day 21",
      "keyTopics": ["Exact module from mock", "Another exact module"],
      "checkpointAction": "Specific action at end of this phase, e.g. take a 10Q Fixed Income drill and aim for 70%+"
    }
  ],
  "weakTopics": ["topic based on mock data"],
  "strongTopics": ["topic that scored well"],
  "keyInsights": ["specific insight from the mock data", "another specific insight"],
  "uploadCount": ${uploadCount}
}

STRICT RULES:
- Create 2-4 phases based on ${daysLeft} days available. LAST phase must always be "Final Mock & Review" (last 7-10 days: 2 full mocks + targeted fixes).
- Phase focus MUST come directly from the mock data — only mention topics that appear in the PDF text.
- If prior history exists, note what IMPROVED vs. what is still weak across uploads.
- Each phase must have a realistic weekly target (not more than 1-2 hr/day).
- uploadCount must be ${uploadCount}.`;

    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2500,
        temperature: 0.3,
        messages: [{ role: 'user', content: analysisPrompt }],
      }),
    });

    if (!aiRes.ok) {
      return jsonResponse({ error: 'AI analysis failed — try again.' }, 502);
    }

    const aiData = await aiRes.json() as { content?: Array<{ text?: string }>; usage?: { input_tokens?: number; output_tokens?: number } };
    const rawText = aiData?.content?.[0]?.text ?? '';

    let plan: Record<string, unknown>;
    try {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('no JSON');
      plan = JSON.parse(match[0]);
      if (!Array.isArray(plan.phases)) throw new Error('no phases');
    } catch {
      return jsonResponse({ error: 'Could not parse study plan. Try uploading a clearer mock review PDF.' }, 500);
    }

    const perfSummary = {
      weakTopics: plan.weakTopics ?? [],
      estimatedPassProb: plan.estimatedPassProb ?? '?',
    };

    // Log token usage
    const usage = aiData.usage;
    if (usage?.input_tokens != null) {
      const svcHdrs = { apikey: supabaseServiceKey, Authorization: `Bearer ${supabaseServiceKey}`, 'Content-Type': 'application/json' };
      fetch(`${supabaseUrl}/rest/v1/api_usage`, {
        method: 'POST',
        headers: { ...svcHdrs, Prefer: 'return=minimal' },
        body: JSON.stringify({ user_id: userId, request_type: 'analyze_mock_pdf', token_in: usage.input_tokens, token_out: usage.output_tokens ?? 0 }),
      }).catch(() => {});
    }

    return jsonResponse({ plan, perfSummary });
  }

  return jsonResponse({ error: 'Unknown requestType.' }, 400);
});
