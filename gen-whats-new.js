#!/usr/bin/env node
/**
 * gen-whats-new.js — Append a new What's New entry from recent git commits
 *
 * Usage:
 *   node gen-whats-new.js                          # print ready-to-paste JSX
 *   ANTHROPIC_API_KEY=sk-ant-... node gen-whats-new.js          # call Claude Haiku + print
 *   ANTHROPIC_API_KEY=sk-ant-... node gen-whats-new.js --write  # write directly to src/app.jsx + index.html
 *
 * --write mode:
 *   • Appends a new {version, slides} entry to the WHATS_NEW_SLIDES array in src/app.jsx
 *   • Trims the array to at most 5 entries (oldest dropped first)
 *   • Updates WHATS_NEW_VERSION (derived automatically from last array entry)
 *   • Bumps the app.js?v= cache version in index.html by 100000
 */

const {execSync} = require('child_process');
const fs = require('fs');
const https = require('https');

const WRITE_MODE = process.argv.includes('--write');
const MAX_ENTRIES = 5;

// ── Read current version from src/app.jsx ─────────────────────────────────────
const src = fs.readFileSync('src/app.jsx', 'utf8');
const vMatch = src.match(/WHATS_NEW_VERSION=WHATS_NEW_SLIDES\[[\s\S]*?\]\.version/);
// Extract last version from WN_VER comments
const verMatches = [...src.matchAll(/\/\/ WN_VER:([^\n]+)/g)];
const lastVersion = verMatches.length ? verMatches[verMatches.length-1][1].trim() : new Date(Date.now()-30*864e5).toISOString().slice(0,10);
const today = new Date().toISOString().slice(0,10);

// If today's version already exists, add a suffix to keep it unique
let newVersion = today;
const existingVers = verMatches.map(m => m[1].trim());
if (existingVers.includes(newVersion)) {
  const suffixes = 'bcdefghij'.split('');
  for (const s of suffixes) {
    if (!existingVers.includes(newVersion + '-' + s)) { newVersion = newVersion + '-' + s; break; }
  }
}

console.log(`Last WHATS_NEW_VERSION: ${lastVersion}`);
console.log(`New version will be:    ${newVersion}`);

// ── Patterns that mark a commit as internal (never shown to users) ────────────
const INTERNAL_PATTERNS = [
  /admin.{0,30}(dashboard|stats|auth|tool)/i,
  /dashboard.{0,30}admin/i,
  /CLAUDE\.md/i,
  /gen-whats-new/i,
  /gen-claude-md/i,
  /\.github\//i,
  /workflow/i,
  /deployment.{0,30}pipeline/i,
  /edge.?function/i,
  /supabase.{0,20}deploy/i,
  /build\.js/i,
  /pre.?commit/i,
  /\[internal\]/i,
  /\[infra\]/i,
  /rebase.{0,20}(retry|push|fail)/i,
  /What's New:.*slide/i,
  /remove.*slide/i,
];

function isInternal(line) {
  return INTERNAL_PATTERNS.some(p => p.test(line));
}

// ── Get commits since last version ────────────────────────────────────────────
let commits = '';
let internalCommits = [];
try {
  const raw = execSync(`git log --oneline --since="${lastVersion}" --no-merges 2>/dev/null`, {encoding:'utf8'}).trim();
  const lines = raw.split('\n').filter(l => l && !l.includes('[skip ci]') && !l.includes('github-actions'));
  internalCommits = lines.filter(l => isInternal(l)).map(l => l.replace(/^[a-f0-9]+ /, '').trim());
  commits = lines.filter(l => !isInternal(l)).join('\n').trim();
} catch {}

if (!commits) {
  try {
    const raw = execSync('git log --oneline -10 --no-merges', {encoding:'utf8'}).trim();
    const lines = raw.split('\n').filter(Boolean);
    internalCommits = lines.filter(l => isInternal(l)).map(l => l.replace(/^[a-f0-9]+ /, '').trim());
    commits = lines.filter(l => !isInternal(l)).join('\n').trim();
  } catch {}
}

console.log(`\nUser-facing commits:\n${commits||"(none)"}`);
console.log(`\nInternal commits (admin changelog only):\n${internalCommits.join('\n')||"(none)"}\n`);

if (!commits) {
  console.log('No user-facing commits found — skipping What\'s New generation.');
  // Still write internal commits to admin changelog if any
  if (WRITE_MODE && internalCommits.length) writeAdminChangelog(internalCommits, today);
  process.exit(0);
}

// ── Build prompt ──────────────────────────────────────────────────────────────
const prompt = `You are writing release notes for ClearCFA, an AI-powered CFA Level 1/2/3 exam prep app for iOS/Android/web.

Recent git commits (since ${lastVersion}):
${commits}

Write 1 to 3 "What's New" slides — one per distinct user-facing change. Do NOT pad to reach 3 if there are fewer real changes. Group related commits into a single slide when they form one theme. Focus on USER-FACING benefits only.

Rules:
- Title: 3-5 words, benefit-first (e.g. "Faster Quiz Generation" not "Optimised API calls")
- Sub: "<Category> · ${today} update"  (Category = Speed, AI, Study Tools, UX, Bug Fix, Offline, etc.)
- Desc: 2 sentences. What changed + why it helps the student preparing for CFA.
- Tip: 1 sentence. A concrete action or thing to notice.
- Use distinct emojis and varied color tokens.
- Strictly omit anything that is internal plumbing: CI fixes, deployment changes, admin tools, auth fixes, build system, database migrations, CLAUDE.md, workflow files.

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
  if (WRITE_MODE) { console.log('⚠️  --write requires ANTHROPIC_API_KEY. Skipping write.'); process.exit(0); }
  printTemplate(newVersion);
  process.exit(0);
}

console.log('Calling Claude Haiku...');
callAnthropic(apiKey, prompt)
  .then(slides => {
    if (WRITE_MODE) {
      writeToSource(slides, newVersion);
      if (internalCommits.length) writeAdminChangelog(internalCommits, today);
    } else {
      printResult(slides, newVersion);
    }
  })
  .catch(e => {
    console.error('API error:', e.message);
    if (WRITE_MODE) { console.log('\n⚠️  API call failed — src/app.jsx unchanged.'); process.exit(1); }
    console.log('\nFalling back to template:');
    printTemplate(newVersion);
  });

// ── Write mode ────────────────────────────────────────────────────────────────
function writeToSource(slides, version) {
  // Build the new entry block
  const slideLines = slides.map(s => {
    const color = String(s.color).replace(/^"?(C\.\w+)"?$/, '$1');
    const bg    = String(s.bg).replace(/^"?(C\.\w+)"?$/, '$1');
    return `{emoji:${JSON.stringify(s.emoji)},color:${color},bg:${bg},title:${JSON.stringify(s.title)},sub:${JSON.stringify(s.sub)},desc:${JSON.stringify(s.desc)},tip:${JSON.stringify(s.tip)}}`;
  }).join(',\n');
  const newEntry = `// WN_VER:${version}\n{version:${JSON.stringify(version)},slides:[\n${slideLines},\n]},\n`;

  let appSrc = fs.readFileSync('src/app.jsx', 'utf8');

  // Find the block between // WN_START and // WN_END
  const wnBlockRe = /(\/\/ WN_START\n)([\s\S]*?)(\/\/ WN_END)/;
  const match = appSrc.match(wnBlockRe);
  if (!match) { console.error('❌ Could not find // WN_START ... // WN_END markers in src/app.jsx'); process.exit(1); }

  // Split existing entries by WN_VER comment markers, keep last (MAX_ENTRIES - 1)
  const existingBlock = match[2];
  const entryChunks = existingBlock.split(/(?=\/\/ WN_VER:)/).filter(c => c.trim());
  const kept = entryChunks.slice(-(MAX_ENTRIES - 1));
  const newBlock = kept.join('') + newEntry;

  appSrc = appSrc.replace(wnBlockRe, `$1${newBlock}$3`);
  fs.writeFileSync('src/app.jsx', appSrc);
  console.log(`✅ src/app.jsx updated — appended version ${version}, kept ${kept.length + 1} of ${MAX_ENTRIES} max entries`);

  // Bump cache version in index.html
  let html = fs.readFileSync('index.html', 'utf8');
  const cacheRe = /app\.js\?v=(\d+)/;
  const cMatch = html.match(cacheRe);
  if (cMatch) {
    const newV = parseInt(cMatch[1]) + 100000;
    html = html.replace(cacheRe, `app.js?v=${newV}`);
    fs.writeFileSync('index.html', html);
    console.log(`✅ index.html cache version bumped to ${newV}`);
  }

  console.log('\nNext: node build.js && git add src/app.jsx app.js index.html && git commit -m "What\'s New: ' + version + ' [skip ci]"');
}

// ── Admin changelog writer ────────────────────────────────────────────────────
const MAX_AC_ENTRIES = 10;

function writeAdminChangelog(entries, date) {
  if (!entries.length) return;
  let appSrc = fs.readFileSync('src/app.jsx', 'utf8');
  const acBlockRe = /(\/\/ AC_START\n)([\s\S]*?)(\/\/ AC_END)/;
  const match = appSrc.match(acBlockRe);
  if (!match) { console.warn('⚠️  Could not find // AC_START ... // AC_END markers — skipping admin changelog'); return; }

  const entryLines = entries.map(e => `"${e.replace(/"/g, '\\"')}"`).join(',\n');
  const newEntry = `// AC_VER:${date}\n{date:${JSON.stringify(date)},entries:[\n${entryLines},\n]},\n`;

  const existingBlock = match[2];
  const chunks = existingBlock.split(/(?=\/\/ AC_VER:)/).filter(c => c.trim());
  const kept = chunks.slice(-(MAX_AC_ENTRIES - 1));
  const newBlock = kept.join('') + newEntry;

  appSrc = appSrc.replace(acBlockRe, `$1${newBlock}$3`);
  fs.writeFileSync('src/app.jsx', appSrc);
  console.log(`✅ ADMIN_CHANGELOG updated — ${entries.length} internal entries for ${date}`);
}

// ── Print helpers ─────────────────────────────────────────────────────────────
function printResult(slides, version) {
  console.log('\n✅ Generated slides:\n');
  console.log(JSON.stringify(slides, null, 2));
  console.log('\n══ PASTE INTO src/app.jsx (between // WN_END and the entry before it) ══');
  const slideLines = slides.map(s => {
    const color = String(s.color).replace(/^"?(C\.\w+)"?$/, '$1');
    const bg    = String(s.bg).replace(/^"?(C\.\w+)"?$/, '$1');
    return `{emoji:${JSON.stringify(s.emoji)},color:${color},bg:${bg},title:${JSON.stringify(s.title)},sub:${JSON.stringify(s.sub)},desc:${JSON.stringify(s.desc)},tip:${JSON.stringify(s.tip)}}`;
  }).join(',\n');
  console.log(`// WN_VER:${version}\n{version:${JSON.stringify(version)},slides:[\n${slideLines},\n]},`);
  console.log('\n════════════════════════════════════════');
  console.log('Or pass --write to apply automatically.');
}

function printTemplate(version) {
  console.log(`\n// WN_VER:${version}
{version:"${version}",slides:[
{emoji:"⚡",color:C.accentLight,bg:C.accent,title:"Short benefit title",sub:"Category · ${version} update",desc:"2 sentences: what changed and why it helps.",tip:"One concrete tip."},
{emoji:"🎯",color:C.easy,bg:C.easy,title:"Short benefit title",sub:"Category · ${version} update",desc:"2 sentences: what changed and why it helps.",tip:"One concrete tip."},
{emoji:"🔧",color:C.medium,bg:C.medium,title:"Short benefit title",sub:"Category · ${version} update",desc:"2 sentences: what changed and why it helps.",tip:"One concrete tip."},
]},`);
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
          let text = (parsed.content?.[0]?.text || '').replace(/```json\n?|```/g,'').trim();
          // Extract just the JSON array in case Claude added trailing text
          const arrM = text.match(/\[[\s\S]*\]/);
          if (arrM) text = arrM[0];
          // Attempt 1: direct parse
          try { return resolve(JSON.parse(text)); } catch {}
          // Attempt 2: sanitize literal newlines inside string values
          const fixed = text.replace(/("(?:[^"\\]|\\.)*")/gs, s => s.replace(/\n/g, '\\n').replace(/\r/g, ''));
          resolve(JSON.parse(fixed));
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
