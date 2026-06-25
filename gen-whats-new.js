#!/usr/bin/env node
/**
 * gen-whats-new.js — Generate What's New slide content from recent git commits
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node gen-whats-new.js
 *
 * Without an API key it prints a structured template you can fill in manually.
 * With a key it calls Claude Haiku and prints ready-to-paste JSX.
 *
 * After running:
 *   1. Paste the new WHATS_NEW_VERSION value into src/app.jsx
 *   2. Paste the slides array into the SlideOverlay block (~search "whatsNewDismissed")
 *   3. node build.js && git add -A && git commit -m "What's New: <date>"
 */

const {execSync} = require('child_process');
const fs = require('fs');
const https = require('https');

// ── Read current version from src/app.jsx ─────────────────────────────────────
const src = fs.readFileSync('src/app.jsx', 'utf8');
const vMatch = src.match(/WHATS_NEW_VERSION\s*=\s*"([^"]+)"/);
const lastVersion = vMatch?.[1] || new Date(Date.now()-30*864e5).toISOString().slice(0,10);
const today = new Date().toISOString().slice(0,10);

console.log(`Current WHATS_NEW_VERSION: ${lastVersion}`);
console.log(`New version will be:       ${today}`);

// ── Get commits since last version ────────────────────────────────────────────
let commits = '';
try {
  commits = execSync(`git log --oneline --since="${lastVersion}" --no-merges 2>/dev/null`, {encoding:'utf8'}).trim();
} catch {}

if (!commits) {
  // Fallback: last 15 commits
  try { commits = execSync('git log --oneline -15 --no-merges', {encoding:'utf8'}).trim(); } catch {}
}

if (!commits) { console.error('No git history found.'); process.exit(1); }
console.log(`\nCommits:\n${commits}\n`);

// ── Build prompt ──────────────────────────────────────────────────────────────
const prompt = `You are writing release notes for ClearCFA, an AI-powered CFA Level 1/2/3 exam prep app for iOS/Android/web.

Recent git commits (since ${lastVersion}):
${commits}

Write EXACTLY 3 "What's New" slides. Group related commits into themes. Focus on USER-FACING benefits — not implementation details.

Rules:
- Title: 3-5 words, benefit-first (e.g. "Faster Quiz Generation" not "Optimised API calls")
- Sub: "<Category> · ${today} update"  (Category = Speed, AI, Study Tools, UX, Bug Fix, Offline, etc.)
- Desc: 2 sentences. What changed + why it helps the student preparing for CFA.
- Tip: 1 sentence. A concrete action or thing to notice.
- Use distinct emojis and varied color tokens.
- If a commit is purely internal/infrastructure (CLAUDE.md, hooks, build), omit it.

Available color tokens (use the raw token name as a string — the app substitutes them):
  C.accentLight, C.easy, C.medium, C.hard, C.reward

Respond with ONLY a JSON array — no markdown, no extra text:
[
  {"emoji":"⚡","color":"C.easy","bg":"C.easy","title":"...","sub":"...","desc":"...","tip":"..."},
  {"emoji":"🎯","color":"C.accentLight","bg":"C.accent","title":"...","sub":"...","desc":"...","tip":"..."},
  {"emoji":"🔧","color":"C.medium","bg":"C.medium","title":"...","sub":"...","desc":"...","tip":"..."}
]`;

// ── Call Anthropic API ─────────────────────────────────────────────────────────
const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.log('ℹ️  No ANTHROPIC_API_KEY set — printing blank template.\n');
  printTemplate(today);
  process.exit(0);
}

console.log('Calling Claude Haiku...');
callAnthropic(apiKey, prompt)
  .then(slides => printResult(slides, today))
  .catch(e => {
    console.error('API error:', e.message);
    console.log('\nFalling back to template:');
    printTemplate(today);
  });

// ── Helpers ───────────────────────────────────────────────────────────────────
function printResult(slides, newVersion) {
  // Replace "C.foo" strings with actual token references for the JSX output
  const jsxSlides = JSON.stringify(slides, null, 2)
    .replace(/"(C\.\w+)"/g, '$1');  // "C.easy" → C.easy (unquoted)

  console.log('\n✅ Generated slides:\n');
  console.log(JSON.stringify(slides, null, 2));

  console.log('\n══ PASTE INTO src/app.jsx ══════════════════════════════════════\n');
  console.log(`// 1. Update the version constant (search WHATS_NEW_VERSION):`);
  console.log(`const WHATS_NEW_VERSION    = "${newVersion}";`);
  console.log('');
  console.log(`// 2. Replace the slides={[...]} array in the SlideOverlay block`);
  console.log(`//    (search "whatsNewDismissed" to find it):`);
  console.log(`slides={${jsxSlides}}`);
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('\nNext: node build.js && git add -A && git commit -m "What\'s New: ' + newVersion + '"');
}

function printTemplate(today) {
  console.log('══ BLANK TEMPLATE — fill in and paste into src/app.jsx ══════════\n');
  console.log(`const WHATS_NEW_VERSION    = "${today}";\n`);
  console.log(`slides={[
  {emoji:"⚡",color:C.accentLight,bg:C.accent,
   title:"Short benefit title",
   sub:"Category · ${today} update",
   desc:"2 sentences: what changed and why it helps the student.",
   tip:"One concrete tip or action."},
  {emoji:"🎯",color:C.easy,bg:C.easy,
   title:"Short benefit title",
   sub:"Category · ${today} update",
   desc:"2 sentences: what changed and why it helps the student.",
   tip:"One concrete tip or action."},
  {emoji:"🔧",color:C.medium,bg:C.medium,
   title:"Short benefit title",
   sub:"Category · ${today} update",
   desc:"2 sentences: what changed and why it helps the student.",
   tip:"One concrete tip or action."},
]}`);
  console.log('\n════════════════════════════════════════════════════════════════');
}

function callAnthropic(key, prompt) {
  const body = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 900,
    messages: [{role:'user', content: prompt}]
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(body)
      }
    };

    // Respect HTTPS_PROXY if set (for corporate/cloud environments)
    const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
    if (proxy) {
      try {
        const {URL} = require('url');
        const proxyUrl = new URL(proxy);
        options.hostname = proxyUrl.hostname;
        options.port = proxyUrl.port || 443;
        options.path = `https://api.anthropic.com/v1/messages`;
        options.headers['host'] = 'api.anthropic.com';
      } catch {}
    }

    const req = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          const text = (parsed.content?.[0]?.text || '').replace(/```json\n?|```/g,'').trim();
          resolve(JSON.parse(text));
        } catch(e) {
          reject(new Error(`Parse failed: ${e.message}\nRaw: ${data.slice(0,400)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
