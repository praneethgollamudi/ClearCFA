#!/usr/bin/env node
/**
 * gen-whats-new.js — Generate What's New slide content from recent git commits
 *
 * Usage:
 *   node gen-whats-new.js                  # print ready-to-paste JSX
 *   ANTHROPIC_API_KEY=sk-ant-... node gen-whats-new.js          # call Claude Haiku + print
 *   ANTHROPIC_API_KEY=sk-ant-... node gen-whats-new.js --write  # write directly to src/app.jsx + index.html
 *
 * --write mode:
 *   • Updates WHATS_NEW_VERSION in src/app.jsx
 *   • Replaces the slides={[...]} array in the What's New SlideOverlay block
 *   • Bumps the app.js?v= cache version in index.html by 100000
 *   • Requires ANTHROPIC_API_KEY (skips write without it)
 *
 * Without --write:
 *   Prints the version constant + slides array — paste manually into src/app.jsx
 */

const {execSync} = require('child_process');
const fs = require('fs');
const https = require('https');

const WRITE_MODE = process.argv.includes('--write');

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
  if (WRITE_MODE) {
    console.log('⚠️  --write requires ANTHROPIC_API_KEY. Skipping write.');
    process.exit(0);
  }
  printTemplate(today);
  process.exit(0);
}

console.log('Calling Claude Haiku...');
callAnthropic(apiKey, prompt)
  .then(slides => {
    if (WRITE_MODE) {
      writeToSource(slides, today);
    } else {
      printResult(slides, today);
    }
  })
  .catch(e => {
    console.error('API error:', e.message);
    if (WRITE_MODE) {
      console.log('\n⚠️  API call failed — src/app.jsx unchanged.');
      process.exit(1);
    }
    console.log('\nFalling back to template:');
    printTemplate(today);
  });

// ── Write mode ────────────────────────────────────────────────────────────────
function writeToSource(slides, newVersion) {
  // 1. Build the JSX slides block (each slide on one line, 8-space indent)
  const slideLines = slides.map(s => {
    const color = String(s.color).replace(/^"?(C\.\w+)"?$/, '$1');
    const bg    = String(s.bg).replace(/^"?(C\.\w+)"?$/, '$1');
    return `        {emoji:${JSON.stringify(s.emoji)},color:${color},bg:${bg},title:${JSON.stringify(s.title)},sub:${JSON.stringify(s.sub)},desc:${JSON.stringify(s.desc)},tip:${JSON.stringify(s.tip)}}`;
  }).join(',\n');
  const slidesBlock = `[\n${slideLines},\n      ]`;

  // 2. Patch src/app.jsx
  let appSrc = fs.readFileSync('src/app.jsx', 'utf8');

  // Replace WHATS_NEW_VERSION
  const versionRe = /const WHATS_NEW_VERSION\s*=\s*"[^"]+";/;
  if (!versionRe.test(appSrc)) {
    console.error('❌ Could not find WHATS_NEW_VERSION in src/app.jsx');
    process.exit(1);
  }
  appSrc = appSrc.replace(versionRe, `const WHATS_NEW_VERSION    = "${newVersion}";`);

  // Replace slides array in the What's New SlideOverlay block
  const slidesRe = /(tourDismissed&&!whatsNewDismissed&&<SlideOverlay\s+slides=\{)\[[\s\S]*?\](\})/;
  if (!slidesRe.test(appSrc)) {
    console.error('❌ Could not find What\'s New slides block in src/app.jsx');
    process.exit(1);
  }
  appSrc = appSrc.replace(slidesRe, `$1${slidesBlock}$2`);

  fs.writeFileSync('src/app.jsx', appSrc);
  console.log(`✅ src/app.jsx updated (WHATS_NEW_VERSION → ${newVersion}, slides replaced)`);

  // 3. Bump cache version in index.html
  let html = fs.readFileSync('index.html', 'utf8');
  const cacheRe = /app\.js\?v=(\d+)/;
  const cMatch = html.match(cacheRe);
  if (cMatch) {
    const oldV = parseInt(cMatch[1]);
    const newV = oldV + 100000;
    html = html.replace(cacheRe, `app.js?v=${newV}`);
    fs.writeFileSync('index.html', html);
    console.log(`✅ index.html cache version bumped: ${oldV} → ${newV}`);
  } else {
    console.warn('⚠️  Could not find app.js?v= in index.html — skipping cache bump');
  }

  console.log('\nNext: node build.js && git add src/app.jsx app.js index.html && git commit -m "What\'s New: ' + newVersion + '"');
  console.log('  Or: bash deploy.sh  (runs the full pipeline)');
}

// ── Print helpers ─────────────────────────────────────────────────────────────
function printResult(slides, newVersion) {
  const jsxSlides = JSON.stringify(slides, null, 2)
    .replace(/"(C\.\w+)"/g, '$1');

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
  console.log('  Or pass --write to apply changes automatically.');
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

// ── Anthropic API call ────────────────────────────────────────────────────────
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
