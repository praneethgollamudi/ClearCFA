# ClearCFA — Claude Code Reference

ClearCFA is a single-file React CFA exam prep tool served via GitHub Pages.

## Branding & Identity

- **Creator:** GSP (initials). Never use "Praneeth" in user-facing strings — it was replaced.
- **Admin email:** `sai.praneeth557@gmail.com` (functional only — auth gating, never displayed to users)
- **Contact / support email:** `gspbuilds@gmail.com`
- **Live URL:** https://praneethgollamudi.github.io/ClearCFA/

## Supabase Infrastructure

**Admin stats edge function update**: `admin-stats` now accepts `userId` in the request body in addition to `accessToken` (which may be `undefined` for password-based logins). The function uses `userId` as a fallback for auth when `accessToken` is missing.


- **Project ref:** `uucxyuqxqjpbxecemdvf`
- **Supabase URL:** `https://uucxyuqxqjpbxecemdvf.supabase.co` (hardcoded in `src/app.jsx` line ~17)
- **Anon key:** hardcoded in `src/app.jsx` line ~18 (safe to be public — RLS enforced)
- **Service role key / PAT:** stored as `SUPABASE_ACCESS_TOKEN` in GitHub Actions secrets

### Edge Functions (in `supabase/functions/`)

**`admin-stats` dashboard display**: The admin dashboard now displays user email in the "Recently active" section (field: `display` or fallback to truncated `user_id`). The "Revenue" card clarifies "Paid Pro subscribers" (from `subscriptions` table) and notes that the admin account itself is Pro via owner override and not counted in metrics.


**`admin-stats` password login fallback**: When `accessToken` is undefined (password-based login), the function now accepts `userId` and `email` in the request body. It checks `ADMIN_USER_ID` environment secret first; if not set, it verifies `userId` exists in the `sessions` table and `email` matches `ADMIN_EMAIL`. Always send `{accessToken, userId, email}` from client for robustness.


**`admin-stats` auth update**: Now accepts `userId` and `email` in request body as fallbacks for password-based logins (where `accessToken` is `undefined`). If `ADMIN_USER_ID` environment secret is set, it's checked first; otherwise falls back to verifying `userId` exists in `sessions` table + `email` matches `ADMIN_EMAIL`. Always send all three (`accessToken`, `userId`, `email`) from the client for robustness.


All AI prompts (`buildVignettePrompt()`, `buildFSAStatementPrompt()`, `WEEKLY_PLAN_PROMPT`) now accept a `level` parameter ("1", "2", or "3") and inject it into the prompt template. Callers must pass `cfaLevel` from state — failure to do so defaults to Level 1 prompts. The `WEEKLY_PLAN_PROMPT` uses `{level}` placeholder which is replaced at call time via `.split("{level}").join(cfaLevel)`.


All AI prompts that call `buildVignettePrompt()`, `buildFSAStatementPrompt()`, and `WEEKLY_PLAN_PROMPT` now accept a `level` parameter ("1", "2", or "3") and inject it into the prompt. This makes question generation, vignettes, FSA problems, and weekly study plans level-aware. Always pass `cfaLevel` from state when calling these builders.


| Function | Purpose |
|---|---|
| `ai-proxy` | All Anthropic API calls — question generation + AI chat. Enforces quotas. |
| `admin-stats` | Admin-only analytics dashboard data. Gated by admin email check. |

### Migrations & Deployment (fully automated)

SQL migrations in `supabase/migrations/*.sql` run automatically via the **"Deploy Supabase"** GitHub Actions workflow on every push to `main` that touches `supabase/**`. The workflow also redeploys all edge functions. **Never need to run migrations manually** — just push the `.sql` file.

Edge functions are deployed with `supabase functions deploy <name> --project-ref uucxyuqxqjpbxecemdvf` via the same workflow.

## Payment & Pricing

Payment is **manual**: user pays via UPI, WhatsApp a screenshot, GSP manually inserts a row into the `subscriptions` Supabase table.

```
PAYMENT_UPI_ID      = '9493413121@upi'
PAYMENT_WHATSAPP    = '919493413121'
PAYMENT_CONTACT_EMAIL = 'gspbuilds@gmail.com'
```

### Pricing tiers (constants in `src/app.jsx` ~line 996)

```javascript
const PRICE_TIER1   = 799;   // launch price — first 10 slots
const PRICE_TIER2   = 1199;  // next 20 slots
const PRICE_REGULAR = 1499;  // regular price once all tiers fill
const TIER1_SLOTS   = 10;
const TIER2_SLOTS   = 20;
const TIER1_TAKEN   = 0;     // ← update manually as subscribers join
const TIER2_TAKEN   = 0;     // ← update manually as subscribers join
```

`ACTIVE_PRICE`, `ACTIVE_WAS`, `ACTIVE_TIER` are derived automatically — never hardcode ₹ amounts in UI strings, always use these constants.

WhatsApp message template uses `` `₹${ACTIVE_PRICE}` `` — do not hardcode the price there.

## Pro Status & Subscriptions

**Admin account Pro override**: The admin account (email: `sai.praneeth557@gmail.com`) is Pro via owner override and is **excluded from all Pro subscriber counts** in the admin dashboard. When inserting manual Pro grants to the `subscriptions` table, the admin row should not be counted in `revenue.proCount` metrics.


`proStatus` (boolean, in CFAMock state) is determined by checking the `subscriptions` table:

```
subscriptions table: user_id, active (bool), valid_until (timestamptz)
```

Pro = row exists where `active=true AND valid_until >= now()`. Checked via `checkIsPro()` in `ai-proxy` edge function and via Supabase REST in the app on load.

To grant Pro manually: insert/upsert a row in `subscriptions` with `active=true` and `valid_until` 30 days out.

## AI Quota System

**Weekly Plan prompt level-awareness**: The `WEEKLY_PLAN_PROMPT` now accepts a `level` parameter ("1", "2", or "3") and injects it via `.split("{level}").join(cfaLevel)` at call time. Callers must pass `cfaLevel` from state; failure to do so defaults to Level 1 prompts.


Free users are limited server-side in the `ai-proxy` edge function. Quotas tracked in the `ai_quota` table:

```
ai_quota table: user_id (PK), quota_date (TEXT), quota_count (INT)
```

| Request type | Quota date format | Free limit |
|---|---|---|
| Question generation (`requestType:"generate"`) | `"YYYY-MM-DD"` | 20/day |
| AI chat (`requestType:"chat"`) | `"chat-YYYY-MM-DD"` | 15/day |

The `"chat-"` prefix lets both live in the same table row-space without schema changes. String comparison `quota_date=lt.z` in PostgREST excludes chat rows from generate queries (because `'c' > '9'` in ASCII).

Pro users bypass both limits entirely.

## Referral System

- Referral links: `?ref=<userId>` in URL → stored in sessionStorage → recorded to `referrals` table on sign-in
- **Reward triggers on Pro upgrade, not sign-up** — a PostgreSQL trigger (`trg_referral_on_pro_upgrade` on the `subscriptions` table) fires when a referred user gets a subscription row inserted, automatically granting the referrer 1 free month per 2 paid referrals
- `REFERRAL_THRESHOLD = 2` (friends who must subscribe per free month)
- `recordReferral()` in `src/app.jsx` only records the relationship — it does NOT call `grantReferralPro` anymore
- `getReferralStats(cfg, referrerId)` returns `{signups, paid}` — card shows paid count for progress, sign-up count as context

## Build & Deploy

**What's New slides versioning**: Added internal-only release notes versions (`2026-06-26-b`, `2026-06-26-c`, etc.) to document UX improvements and bug fixes. These appear in the What's New carousel and track product updates for users.


**GitHub Actions deployment retry logic**: The workflow now automatically detects push rejections due to concurrent commits and retries with rebase — no manual intervention needed when CI runs collide.


**Deployment retry logic**: The GitHub Actions workflow now includes rebase+retry logic to automatically recover from push rejections caused by concurrent commits. Failed pushes retry automatically — you do not need manual intervention for concurrent CI runs.


```bash
# Build
node build.js          # Babel transforms src/app.jsx → app.js (~960KB, ~1-2s)

# Deploy (always push both branches)
git push origin main && git push origin main:claude/index-html-github-pages-cfa8fd

# Cache bust — increment v= in index.html by 100000 before every commit
# e.g. v=1784300000 → v=1784400000
# Users won't see changes without this step
```

## Architecture

**Settings screen redesign**: Cloud Sync row has been removed. Sync status (sessions count, sync button, status indicator) is now consolidated into the account footer text at the bottom of Settings for a cleaner UX.


**Settings screen Cloud Sync UI**: Cloud Sync row button was removed from Settings. Sync status (sessions count, SR card count, sync button, status indicator) is now consolidated into the account footer text at the bottom of Settings — displayed inline and compact with a ☁ icon. The sync button remains clickable in the footer.


**Settings screen UI folding**: Cloud Sync status (sessions count, SR card count, sync button) was moved from a dedicated row button into the account footer text in Settings. The sync UI is now inline and compact — always show sync status next to the email footer, not as a separate card.


- **Multi-file source**: `build.js` concatenates source files then runs Babel → `app.js` (~960KB)
- No npm bundler, no webpack, no TypeScript, no tests
- React loaded from CDN (`react.min.js`, `react-dom.min.js`)
- Build output warning "deoptimised the styling" is normal for a file this size — not an error

## Source Files (concatenated in this order by build.js)

| File | Lines | Contents |
|------|-------|----------|
| `src/data/los.js` | ~2070 | LOS curriculum data (L1/L2/L3), misconceptions, formulas, power notes |
| `src/data/ethics.js` | ~183 | Ethics case studies |
| `src/data/q-templates.js` | ~493 | Question generation templates |
| `src/app.jsx` | ~10,150 | Everything else — utils, components, CFAMock, screens |

### src/app.jsx Structure (top to bottom)

| Lines | Contents |
|-------|----------|
| ~1–5 | React destructure |
| ~6–150 | Level-aware data getters (`getActiveLOS`, `getMisconceptions`, etc.) |
| ~150–400 | Storage, SM-2, dedup, prompts, analytics, pass probability |
| ~400–750 | App constants (storage keys, design tokens, pricing) |
| ~750–1800 | Small components (`Badge`, `StatCard`, `ScoreRing`, etc.) + formula/revision helpers |
| ~1800–3300 | `UpgradeModal`, `FeedbackModal`, `LessonSection`, `RevisionScreen` |
| ~3300–4500 | `SlideOverlay`, `StudyPathScreen`, `FixToPassScreen`, `CFACalculator`, `LofiPlayer`, `ReferralCard` |
| ~4500–10100 | `CFAMock` — main component (all state, effects, screen renders) |
| ~10100+ | `ToastManager` |

Use `grep "SCREEN:"` to get a full screen index with line numbers. Each screen block is preceded by:

```javascript
// ════════════════════════════════════════
// SCREEN: readiness
// ════════════════════════════════════════
```

## Key Patterns

**Admin dashboard auto-fetch**: A `useEffect` hook watches the `screen` state and auto-calls `fetchAdminStats()` when navigating to `"adminDashboard"` if `isAdmin=true`, `adminStats` is empty, and not already loading — prevents blank initial load.


**Admin access gate**: Check `isAdmin` at render time and call `setScreen("home")` if unauthorized — do NOT render admin content conditionally in JSX. This prevents hooks violations and ensures clean redirect behavior.


**Admin screen auto-fetch**: Admin dashboard now has a useEffect that auto-fetches stats when `screen==="adminDashboard"` and `!adminStats && !adminStatsLoading`. This eliminates blank page on first navigation to admin screen.


**Admin dashboard state management**: `adminBudget` is now a top-level React state variable (not useState inside the render function) to avoid hook violations on route changes. Initialize from localStorage via useState initializer function. This prevents crashes when navigating away from admin screen mid-render.


**State reset on sign-out/switch**: Beyond localStorage cleanup, ALL user-specific React state variables must be explicitly reset: `setCfaLevel("1")`, `setStudyGoal(null)`, `setPresets([])`, `setDailyMission(null)`, `setDailyRefresher(null)`, `setTopicLessons({})`, `setConfidenceLog({})`, `setWorkedExamples({})`, `setSessionDraft(null)`, `setQuestionFlags([])`, `setPersonalBests({})`, `setWeeklyPlan(null)`, `setDiagWeak([])`. Failure to reset state causes data bleed across account switches.


**SESSION_KEYS completeness**: The `SESSION_KEYS` array in the sign-out logic must explicitly list ALL direct-localStorage keys (those without auto-prefixed "cfa_") to ensure complete user isolation on account switch. Current list includes: `CFA_LEVEL_KEY`, `REFRESHER_KEY`, `LESSONS_KEY`, `STUDY_GOAL_KEY`, `PRESETS_KEY`, `MISSION_KEY`, `CONFIDENCE_KEY`, `WORKED_EX_KEY`, `DYNAMIC_PN_KEY`, `DYNAMIC_FORMULAS_KEY`, `STREAK_FREEZE_KEY`, `CALC_SNAP_KEY`, `SESSION_DRAFT_KEY`, `FLAGS_KEY`, `BESTS_KEY`, `RESOLVED_GAPS_KEY`, `REMINDER_TIME_KEY`. Adding new direct-localStorage keys requires updating this array in both the auth effect and the sign-out handler.


**Admin dashboard auto-fetch**: The admin stats dashboard now auto-fetches data when navigating to the `adminDashboard` screen (via useEffect listening to `screen`), but only if `isAdmin && !adminStats && !adminStatsLoading`. The `fetchAdminStats()` call now accepts both password-based login (no `accessToken`) and token-based login — it passes `userId` always and `accessToken` only if present.


**Sign-out state reset**: When signing out, all local state variables (not just localStorage) must be reset: `setCfaLevel("1")`, `setStudyGoal(null)`, `setPresets([])`, `setDailyMission(null)`, `setDailyRefresher(null)`, `setTopicLessons({})`, `setConfidenceLog({})`, `setWorkedExamples({})`, `setSessionDraft(null)`, `setQuestionFlags([])`, `setPersonalBests({})`. This prevents account-switch bleed.


**SESSION_KEYS expansion**: Direct-localStorage keys (those without auto-prefixed "cfa_") must be explicitly listed in `SESSION_KEYS` for complete user isolation on sign-out. This now includes: `CFA_LEVEL_KEY`, `REFRESHER_KEY`, `LESSONS_KEY`, `STUDY_GOAL_KEY`, `PRESETS_KEY`, `MISSION_KEY`, `CONFIDENCE_KEY`, `WORKED_EX_KEY`, `DYNAMIC_PN_KEY`, `DYNAMIC_FORMULAS_KEY`, `STREAK_FREEZE_KEY`, `CALC_SNAP_KEY`, `SESSION_DRAFT_KEY`, `FLAGS_KEY`, `BESTS_KEY`, `RESOLVED_GAPS_KEY`, `REMINDER_TIME_KEY`. Always maintain this list when adding new localStorage state.


**Admin state hydration**: `adminBudget` state (line ~5174) is hydrated from localStorage key `"cfa_admin_budget"` on mount. Wrap in try/catch to handle quota-exceeded errors. This should be added to `SESSION_KEYS` array if admin logout clears all budget data.


**FixToPassScreen level awareness**: `FixToPassScreen` now accepts `cfaLevel` prop (defaults to "1") and uses it when calling `getActiveLOS(cfaLevel)` to fetch the correct curriculum for the user's exam level. Always pass `cfaLevel` from parent state when rendering this screen.


**Level-aware prompts**: All AI prompt builders (`buildVignettePrompt()`, `buildFSAStatementPrompt()`, `WEEKLY_PLAN_PROMPT`) now accept a `level` parameter ("1", "2", or "3"). For `WEEKLY_PLAN_PROMPT`, use `.split("{level}").join(cfaLevel)` to inject the level. Always pass `cfaLevel` from state when calling these builders — failure to do so defaults to Level 1 prompts.


**Complete user isolation on sign-out**: When a user signs out or switches accounts, `SESSION_KEYS` array now includes all direct-localStorage keys (those without "cfa_" prefix auto-added) like `CFA_LEVEL_KEY`, `REFRESHER_KEY`, `STUDY_GOAL_KEY`, etc. These are explicitly cleared alongside prefixed keys. Always maintain this list when adding new localStorage state — add both the key constant and the literal key name if it differs.


**FixToPassScreen level awareness**: `FixToPassScreen` now accepts `cfaLevel` prop (defaults to "1") and uses it when calling `getActiveLOS(cfaLevel)` to fetch the correct curriculum for the user's exam level. Always pass `cfaLevel` from parent state.


### Screen navigation

All screens are early-return if-blocks inside `CFAMock`:

```javascript
if(screen==="home")      return wrap(<>...</>);
if(screen==="readiness") return wrap(<>...</>);
// etc.
```

### wrap() helper

Defined inside `CFAMock` render (search `const wrap=` in src/app.jsx). Wraps every screen in the app shell:

```javascript
const wrap = (children, maxW=860) => (...);
```

**wrap() automatically includes `{navPortal}` and a 70px bottom spacer.** Do NOT add `{navPortal}` or `<div style={{height:70}}/>` to screens manually.

### navPortal & activeTab map

The bottom navigation bar, rendered via `ReactDOM.createPortal` into `#nav-root`. Included automatically by `wrap()`. The `activeTab` map determines which nav tab is highlighted per screen:

```javascript
{
  home:"home", setup:"practice", quiz:"practice", results:"practice",
  revision:"practice", studyPath:"practice",
  srReview:"drill", calcTrainer:"drill",
  dashboard:"progress", readiness:"progress", losCoverage:"progress", masteryGrid:"progress",
  adminDashboard:"home"
}
```

Screens not in this map (e.g. `backup`, `walkthrough`) won't highlight any tab — add them if needed.

### All screens (18 total)

**`FixToPassScreen` now accepts `cfaLevel` prop** — used when calling `getActiveLOS(cfaLevel)` to fetch level-specific curriculum data for weak module targeting. Always pass `cfaLevel` from parent state.


| Screen | Purpose |
|--------|---------|
| `home` | Main dashboard |
| `setup` | Quiz configuration (topic, module, difficulty, count, mode) |
| `quiz` | Active question screen |
| `results` | Post-session results + AI debrief |
| `srReview` | Spaced repetition card review |
| `revision` | Notes / formulas / AI lessons per topic |
| `studyPath` | Guided curriculum (learn → practice per topic) |
| `readiness` | Module readiness + LOS coverage |
| `losCoverage` | Topic/LOS coverage heatmap |
| `masteryGrid` | Topic mastery grid |
| `dashboard` | Score history + analytics |
| `studyPlan` | Weekly study planner |
| `calcTrainer` | CFA calculator practice (Pro) |
| `walkthrough` | Concept walkthrough |
| `review` | General review screen |
| `adminDashboard` | Admin-only analytics (email-gated) |
| `backup` | Data export/import |
| `apiKey` | Dummy — redirects to home |

### Adding a new screen — checklist

1. Add `if(screen==="myScreen") return wrap(<>...</>);` near the other screen returns
2. Add `"myScreen": "tabName"` to the `activeTab` map inside `navPortal` (~line 9880)
3. Add a nav or More grid entry to navigate to the new screen
4. Do NOT add `{navPortal}` — `wrap()` handles it

### SlideOverlay component

Reusable swipeable slide overlay (search `function SlideOverlay` in src/app.jsx):

```jsx
<SlideOverlay
  slides={[{emoji, color, bg, title, sub, desc, tip}]}
  onDismiss={() => { ... }}
  skipLabel="Skip →"
  ctaLabel="Let's go →"
  zIndex={350}
/>
```

Used for: feature tour, What's New, Pro tour, screen onboarding.

## Design Tokens (C object)

```
C.bg          — page background
C.surface     — card background
C.surfaceHigh — elevated card
C.border      — default border
C.accent      — indigo (#6366f1), primary brand color
C.accentLight — lighter indigo
C.text        — primary text
C.textMid     — secondary text
C.muted       — muted/hint text
C.easy        — green (#22c55e), correct/pass
C.medium      — amber (#f59e0b), medium/warning
C.hard        — red (#ef4444), wrong/fail
C.reward      — gold, streaks/rewards
```

**CRITICAL: `C` is a module-level constant defined at ~line 976 in `src/app.jsx`** (after the palette definitions). Any module-level code that references `C.*` color tokens **must be placed after that line**. Placing it before causes a `ReferenceError` at runtime that results in a blank page — the Babel build will succeed without error, so this won't be caught until the app is opened in a browser.

The pre-commit hook checks for this automatically and will abort the commit if a `C.*` token appears before the `C=Object.assign(...)` definition.

## Key State (in CFAMock)

| Variable | Type | Description |
|----------|------|-------------|
| `screen` | string | Current screen name |
| `proStatus` | boolean | User has Pro |
| `authUser` | object \| null | `{id, email, accessToken}` |
| `history` | array | Completed sessions |
| `srDeck` | object | Spaced repetition deck |
| `cfaLevel` | `"1"` \| `"2"` \| `"3"` | Active CFA level |

Key function: `generateQuestions(topic, module, difficulty, count, mode)` — starts a quiz.

## AI Model

Always use **`claude-haiku-4-5-20251001`** for question generation. Never switch to Sonnet — it costs 4–6x more per question.

```javascript
const useModel = "claude-haiku-4-5-20251001";
```

## Storage Keys

```
STORAGE_KEY        = "cfa_mock_v7"        — session history
SR_KEY             = "cfa_sr_v7"          — SR deck
OFFLINE_QS_KEY     = "cfa_offline_qs_v1"  — cached questions (up to 30 per topic/module)
OFFLINE_SEED_KEY   = "cfa_offline_seed_seeded_v1" — flag: OFFLINE_SEED_QS already seeded
TOUR_KEY           = "cfa_tour_v1"        — feature tour dismissed
WHATS_NEW_KEY      = "cfa_whats_new_v1"   — last seen What's New version (string)
PRO_TOUR_KEY       = "cfa_pro_tour_v1"    — pro tour dismissed
SCREEN_ONBOARD_KEY = "cfa_screen_onboard_v1" — per-screen first-visit flags
```

## AI Functions — `callClaude` vs `callAIChat`

Two distinct AI functions, never interchangeable:

| | `callClaude()` | `callAIChat()` |
|---|---|---|
| **Use for** | Question generation, content generation, JSON output | Multi-turn chat (AI Coach, Socratic tutor, AI debrief) |
| **Lives in** | `CFAMock` component (~line 5737) | Module-level function (~line 2251) |
| **Returns** | Parsed JSON object | Plain string |
| **requestType** | `"generate"` | `"chat"` |
| **Free quota** | 20/day | 15/day |
| **Model** | Always `claude-haiku-4-5-20251001` | Always `claude-haiku-4-5-20251001` |
| **Error handling** | Retries (default 2×, 8s delay), logs to API_LOG_KEY | Propagates `quotaExceeded` errors — callers must catch and show `UpgradeModal` |

`callAIChat` quota errors have `err.quotaExceeded = true`. Any call site must catch this and call `setUpgradeModal({reason:"chat_limit"})`.

## UpgradeModal — All Trigger Reasons

`setUpgradeModal({reason: "..."})` triggers the upgrade modal. Known reasons and where they fire:

| Reason | Trigger |
|--------|---------|
| `"limit"` | Daily AI question limit reached (also passes `passProb`, `weakCount`, `streakDays`) |
| `"chat_limit"` | Daily chat limit reached (15/day) |
| `"learn"` | AI Lessons tab in RevisionScreen (Pro only) |
| `"coach"` | AI Coach feature |
| `"timed_mock"` | Timed mock exam |

## Pro Status

`proStatus` (boolean in CFAMock state) is set by `checkProFromServer(cfg, userId, email)`:
1. Email in `OWNER_EMAILS` array → always Pro (admin/owner accounts)
2. Cached status fresh in localStorage → return cached
3. Supabase `subscriptions` table: `active=true AND valid_until >= now()`

`OWNER_EMAILS` includes `sai.praneeth557@gmail.com` — that account is always Pro regardless of subscriptions table.

## What's New System

Slides are stored in `WHATS_NEW_SLIDES` array in `src/app.jsx` (~line 960), between `// WN_START` and `// WN_END` marker comments. Each entry:

```javascript
// WN_VER:2026-06-26          ← version tag (date, optionally +suffix: 2026-06-26-b)
{emoji:"✨", color:C.easy, bg:"...", title:"...", sub:"...", desc:"...", tip:"..."}
```

`WHATS_NEW_VERSION` is auto-derived from the last entry's `WN_VER:` tag. Users see slides for versions newer than their `lastSeenWN` (stored in `WHATS_NEW_KEY` localStorage). The array is trimmed to the last 5 entries by `gen-whats-new.js`.

### gen-whats-new.js script

Automatically generates What's New slides from git commits using Claude Haiku. Run via the **"Generate What's New Slides"** GitHub Actions workflow (triggers on push to `main` that touches `src/**` or `supabase/functions/**`).

```bash
# Manual usage (dry-run — prints template):
node gen-whats-new.js

# Manual usage (write mode — appends to src/app.jsx, bumps cache version):
ANTHROPIC_API_KEY=sk-ant-... node gen-whats-new.js --write
```

Never add `WN_VER:` entries manually — use the script so the array stays trimmed and versioning is consistent.

## Offline Question Cache

Questions are cached in localStorage under `OFFLINE_QS_KEY` (`"cfa_offline_qs_v1"`):

```javascript
// Structure:
{ [topic]: { [module]: [question, question, ...] } }  // max 30 per topic/module
```

On first load, `OFFLINE_SEED_QS` (hardcoded fallback questions, ~3 per module) are seeded into the cache if empty. The seed runs once, gated by `OFFLINE_SEED_KEY` flag. The `catch` block in `generateQuestions` falls back to this cache automatically — never needs explicit handling.

## Level-Aware Data Getters

Always use these functions instead of accessing LOS data directly — they respect `cfaLevel`:

```javascript
getActiveLOS(level)            // → LOS | LOS_L2 | LOS_L3 object
getActiveMisconceptions(level)
getActiveFormulas(level)
getActivePowerNotes(level)
getActiveTopicMap(level)
```

`cfaLevel` is `"1"` | `"2"` | `"3"` (string, not number).

## Workflow Discipline

### When to use plan mode

Use `/plan` (plan mode) **before** any medium or large feature. Rule of thumb:

- **Small** (< 20 lines changed, single function): dive in directly
- **Medium** (new state, new component, or multi-screen change): enter plan mode first
- **Large** (new screen, architectural change, data model change): always plan mode

Plan mode costs nothing and prevents large context-wasting mistakes. Exit plan mode only after identifying exact file paths, line numbers, and insertion points.

### Build before commit

A pre-commit hook (`/.git/hooks/pre-commit`) runs `node build.js` automatically and stages the rebuilt `app.js`. If the build fails, the commit is aborted.

To build manually: `node build.js`

### Verify with screenshots

The `run-cfa` skill (`.claude/skills/run-cfa.md`) builds, serves locally on port 5555, and screenshots key screens using Playwright. Use it to confirm UI changes actually render correctly.

```
/run run-cfa
```

### Error visibility

API errors (callClaude failures) are logged to `API_LOG_KEY` with `err:true` flag alongside success entries. Visible in the Settings → Debug panel. Check there first when diagnosing AI issues.

## Common Gotchas

- **C before definition**: `C` is defined at ~line 976. Any module-level code using `C.*` color tokens must come after that line. Violating this causes a blank page — Babel won't catch it, but the pre-commit smoke check will.
- **navPortal**: `wrap()` includes it automatically. Never add it manually to a screen.
- **Cache bust**: Always increment `v=` in `index.html` before committing. Without this, users see the old cached version.
- **Two-branch push**: Always push both `main` AND `main:claude/index-html-github-pages-cfa8fd`.
- **Haiku only**: Never switch question generation to Sonnet — 4–6x cost increase.
- **Offline fallback**: `OFFLINE_QS_KEY` caches up to 30 questions per topic/module. The `catch` block in `generateQuestions` uses these automatically.
- **Build warning**: "deoptimised the styling" is normal. Not an error.

<!-- AUTO_FACTS_START -->
<!-- Regenerated by gen-claude-md.js — do not edit this block manually -->

## Quick Reference (auto-maintained)

### Pricing tiers
| Constant | Value | Slots | Taken | Left |
|---|---|---|---|---|
| `PRICE_TIER1` | ₹799 | 10 | 0 | 10 |
| `PRICE_TIER2` | ₹1199 | 20 | 0 | 20 |
| `PRICE_REGULAR` | ₹1499 | — | — | — |

**Active:** Tier 1 — ₹799/mo. Update `TIER1_TAKEN` / `TIER2_TAKEN` manually as subscribers join — all UI prices derive automatically.

### Free quotas
| Type | Limit | quota_date format |
|---|---|---|
| AI questions | 20/day | `YYYY-MM-DD` |
| AI chat | 15/day | `chat-YYYY-MM-DD` |

Referral threshold: **2 paid subscribers** = 1 free Pro month.

### Payment
- UPI: `9493413121@upi`
- WhatsApp: `919493413121`
- Manual grant: insert row into Supabase `subscriptions` table (active=true, valid_until=+30d)

### Screens (18 total)
`adminDashboard`, `apiKey`, `backup`, `calcTrainer`, `dashboard`, `home`, `losCoverage`, `masteryGrid`, `quiz`, `readiness`, `results`, `review`, `revision`, `setup`, `srReview`, `studyPath`, `studyPlan`, `walkthrough`

### activeTab map (current)
```
{home:"home",setup:"practice",quiz:"practice",srReview:"drill",
        results:"practice",revision:"practice",studyPath:"practice",
        dashboard:"progress",readiness:"progress",losCoverage:"progress",
        masteryGrid:"progress",calcTrainer:"drill",adminDashboard:"home"}
```

### Storage keys
| localStorage value | Constant |
|---|---|
| `cfa_backup_v7` | `BACKUP_KEY` |
| `cfa_mock_v7` | `STORAGE_KEY` |
| `cfa_sr_v7` | `SR_KEY` |
| `cfa_qdb_v7` | `QDB_KEY` |
| `cfa_usage_v1` | `USAGE_KEY` |
| `cfa_bests_v1` | `BESTS_KEY` |
| `cfa_qcache_v1` | `QCACHE_KEY` |
| `cfa_api_log_v1` | `API_LOG_KEY` |
| `cfa_flags_v1` | `FLAGS_KEY` |
| `cfa_pass_trend_v1` | `PASS_TREND_KEY` |
| `cfa_week_plan_v1` | `PLAN_KEY` |
| `cfa_last_uid` | `LAST_UID_KEY` |
| `cfa_streak_freeze_v1` | `STREAK_FREEZE_KEY` |
| `cfa_dynamic_pn_v1` | `DYNAMIC_PN_KEY` |
| `cfa_dynamic_formulas_v1` | `DYNAMIC_FORMULAS_KEY` |
| `cfa_resolved_gaps_v1` | `RESOLVED_GAPS_KEY` |
| `cfa_lessons_v1` | `LESSONS_KEY` |
| `cfa_refresher_v1` | `REFRESHER_KEY` |
| `cfa_mission_v1` | `MISSION_KEY` |
| `cfa_reminder_time_v1` | `REMINDER_TIME_KEY` |
| `cfa_offline_qs_v1` | `OFFLINE_QS_KEY` |
| `cfa_offline_seed_seeded_v1` | `OFFLINE_SEED_KEY` |
| `cfa_calc_snap_v1` | `CALC_SNAP_KEY` |
| `cfa_confidence_v1` | `CONFIDENCE_KEY` |
| `cfa_study_goal_v1` | `STUDY_GOAL_KEY` |
| `cfa_worked_ex_v1` | `WORKED_EX_KEY` |
| `cfa_presets_v1` | `PRESETS_KEY` |
| `cfa_session_draft_v1` | `SESSION_DRAFT_KEY` |
| `cfa_pending_gen_v1` | `PENDING_GEN_KEY` |
| `cfa_tour_v1` | `TOUR_KEY` |
| `cfa_whats_new_v1` | `WHATS_NEW_KEY` |
| `cfa_pro_tour_v1` | `PRO_TOUR_KEY` |
| `cfa_screen_onboard_v1` | `SCREEN_ONBOARD_KEY` |
| `cfa_checklist_done` | `CHECKLIST_KEY` |
| `cfa_level_v1` | `CFA_LEVEL_KEY` |

### Build
Cache version: `app.js?v=1787900000` (increment by 100000 before each commit)
<!-- AUTO_FACTS_END -->

**Level-aware prompts**: Functions like `buildVignettePrompt(topic, module, difficulty, vigCount, subtopic2, losData, level)` and `buildFSAStatementPrompt(subtopic, difficulty, level)` now default `level="1"` but must be called with the user's actual `cfaLevel` from state. `WEEKLY_PLAN_PROMPT` uses template string `{level}` — replace it with `.split("{level}").join(cfaLevel)` before sending to Claude.

**Recently active user display**: The "Recently active" card now shows `display` field (user email) for each session, with fallback to truncated `user_id` if display is null. Update the admin-stats query to include email in the `recentSessions` response for proper display in the UI.
