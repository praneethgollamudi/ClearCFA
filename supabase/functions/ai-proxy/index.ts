// ClearCFA AI Proxy — Supabase Edge Function
// Deploy: supabase functions deploy ai-proxy --project-ref uucxyuqxqjpbxecemdvf
// Secrets: supabase secrets set ANTHROPIC_API_KEY=sk-ant-... APP_SECRET=<random> --project-ref uucxyuqxqjpbxecemdvf

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

const MAX_CHAT_TOKENS = 450;
const MAX_CHAT_HISTORY = 10;
const MAX_MSG_CHARS = 800;

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
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

  // Require a valid userId (64-char hex from SHA-256)
  if (!userId || typeof userId !== 'string' || userId.length < 32) {
    return jsonResponse({ error: 'Sign in to use AI features.' }, 401);
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

  // ── CHAT (tutor Q&A) ─────────────────────────────────────────────────────
  if (requestType === 'chat') {
    if (!Array.isArray(messages) || (messages as unknown[]).length === 0) {
      return jsonResponse({ error: 'No messages provided.' }, 400);
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
        max_tokens: MAX_CHAT_TOKENS,
        temperature: 0.2,
        system: buildChatSystem(typeof level === 'string' ? level : '1'),
        messages: trimmed,
      }),
    });

    const data = await res.json();
    return jsonResponse(data, res.ok ? 200 : res.status);
  }

  // ── GENERATE (question / content generation) ─────────────────────────────
  if (requestType === 'generate') {
    if (!prompt || typeof prompt !== 'string') return jsonResponse({ error: 'No prompt provided.' }, 400);

    const cappedTokens = Math.min(typeof maxTokens === 'number' ? maxTokens : 4000, 8000);
    const useModel = typeof model === 'string' ? model : 'claude-haiku-4-5-20251001';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': anthropicKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: useModel,
        max_tokens: cappedTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (res.status === 429 || res.status === 529) {
      const retryAfter = res.headers.get('retry-after');
      return jsonResponse({ error: `Rate limit — retry in ${retryAfter ?? '60'}s.` }, 429);
    }

    const data = await res.json();
    return jsonResponse(data, res.ok ? 200 : res.status);
  }

  return jsonResponse({ error: 'Unknown requestType.' }, 400);
});
