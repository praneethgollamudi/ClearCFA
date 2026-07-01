# ClearCFA — Claude Code Reference

ClearCFA is a single-file React CFA exam prep tool served via GitHub Pages.

## Branding & Identity

**What's New version 2026-06-30-f & 2026-07-01**: Latest versions document AI debrief reliability improvements, formula display fixes, and calculator addition to SR review. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**What's New slides versioning**: WHATS_NEW_SLIDES is a versioned array with `version` (e.g. "2026-06-30", "2026-06-30-b") and `slides` array. Versions with `-b`, `-c` suffixes are refinements of the same date. New versions are prepended at `// WN_START` marker. Use concise, emoji-led titles and actionable tip text; avoid vague marketing language.


- **Creator:** GSP (initials). Never use "Praneeth" in user-facing strings — it was replaced.
- **Admin email:** `sai.praneeth557@gmail.com` (functional only — auth gating, never displayed to users)
- **Contact / support email:** `gspbuilds@gmail.com`
- **Live URL:** https://praneethgollamudi.github.io/ClearCFA/

## Supabase Infrastructure

**`admin-stats` cost metrics**: The admin dashboard now tracks real token counts from Anthropic API responses instead of estimates, providing accurate cost attribution per user and per question type. Token data is logged during `ai-proxy` calls and aggregated in the dashboard.


**Admin stats edge function update**: `admin-stats` now accepts `userId` in the request body in addition to `accessToken` (which may be `undefined` for password-based logins). The function uses `userId` as a fallback for auth when `accessToken` is missing.


- **Project ref:** `uucxyuqxqjpbxecemdvf`
- **Supabase URL:** `https://uucxyuqxqjpbxecemdvf.supabase.co` (hardcoded in `src/app.jsx` line ~17)
- **Anon key:** hardcoded in `src/app.jsx` line ~18 (safe to be public — RLS enforced)
- **Service role key / PAT:** stored as `SUPABASE_ACCESS_TOKEN` in GitHub Actions secrets

### Edge Functions (in `supabase/functions/`)

**`ai-proxy` debrief error handling**: AI debrief now displays meaningful error messages when it fails (e.g., quota exhausted) instead of a blank screen, and includes a Retry button. Quota-exhausted errors are caught gracefully and inform the user when their quota resets.


**`ai-proxy` daily question quota graceful degradation**: When daily AI question quota is exhausted, AI debrief now shows standard explanation only and skips Socratic follow-up prompts instead of failing. If the quota error occurs during debrief, the client displays a meaningful error message with retry capability. Always check remaining quota before offering AI Debrief to free users.


**`ai-proxy` numeric validation**: AI question generation now validates that numeric values in explanations (e.g., "= X", "X%", "X basis points/bps") match the marked correct option exactly. Questions with explanations contradicting all options or matching wrong options are rejected. Always ensure computed/concluding values align with the correct answer, accounting for unit conversions (e.g., 2.5% = 250 bps).


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

**Calculator on Self-Review**: A calculator button is now permanently available on the Self-Review screen to allow users to verify calculations while reviewing answers. This is a permanent UI feature—do not remove without migrating users elsewhere.


**Calculator in SR review**: A calculator button is now available on the Short Rate review screen to allow users to compute values during drilling without switching apps. This is a permanent UI feature—do not remove without migrating users elsewhere.


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

**Calculator on SR review**: A calculator button is permanently available on the Short Rate review screen (mentioned in Payment section but documented here for visibility). Do not remove this feature without migrating users to an alternative workflow.


**USD price display in UpgradeModal**: The upgrade modal now displays an approximate USD conversion (`~${Math.round(ACTIVE_PRICE/85)} USD`) below the INR price using a fixed 85 INR/USD exchange rate. This is for reference only — all payments remain in INR via UPI.


**Admin account Pro override**: The admin account (email: `sai.praneeth557@gmail.com`) is Pro via owner override and is **excluded from all Pro subscriber counts** in the admin dashboard. When inserting manual Pro grants to the `subscriptions` table, the admin row should not be counted in `revenue.proCount` metrics.


`proStatus` (boolean, in CFAMock state) is determined by checking the `subscriptions` table:

```
subscriptions table: user_id, active (bool), valid_until (timestamptz)
```

Pro = row exists where `active=true AND valid_until >= now()`. Checked via `checkIsPro()` in `ai-proxy` edge function and via Supabase REST in the app on load.

To grant Pro manually: insert/upsert a row in `subscriptions` with `active=true` and `valid_until` 30 days out.

## AI Quota System

**Leech card graduation**: Leech cards (high-repetition, low-success items) now properly graduate and stop appearing after a correct SR answer. This prevents indefinite cycling of already-learned material and improves study efficiency.


**Leech card graduation fix**: Spaced repetition cards marked as "leech" now properly graduate after correct answers instead of staying stuck in the learning phase. This prevents demotivating infinite loops on previously-failed cards.


**AI Coach loading fix**: AI Coach button no longer displays blank loading page due to navPortal temporal dead zone. The portal is now properly initialized before use. Always ensure portal refs are available in the render tree before attempting to render into them.


**AI Debrief error recovery**: AI debrief now catches quota exhaustion and other errors gracefully, displaying a user-friendly error message with a Retry button instead of a blank screen. Quota-exhausted errors inform the user when the quota resets. Always assume debrief can fail and provide meaningful feedback.


**AI Debrief error messaging**: When debrief fails due to quota or other errors, show a user-friendly error message with a Retry button instead of crashing. The quota-exhausted error should indicate when the quota will reset (typically next day).


**AI Debrief graceful degradation**: When daily AI question quota is exhausted, AI Debrief now gracefully skips Socratic follow-up prompts and shows standard explanation only instead of failing. Always check `proStatus` and remaining quota before offering AI Debrief buttons to free users.


**Focus completion tracking & diversity**: Today's Focus suggestions now persist completion history in `localStorage` under `cfa_focus_done` with structure `{date: "YYYY-MM-DD", done: {focusKey: true}}`. Suggestions include a `_type` field (e.g., `"leech"`, `"weak"`) to track source. UI filters out already-done suggestions to prevent repetition and ensure daily diversity. When a quiz session triggered by a Today's Focus suggestion completes, check `pendingFocusKeyRef.current` and mark that focus key as done.


**Focus completion on session end**: When a quiz/practice session completes, check `pendingFocusKeyRef.current` — if set, mark that focus key as done in localStorage and update `focusDone` state. Always set `pendingFocusKeyRef.current` before launching a practice session triggered by a Today's Focus suggestion card.


**Focus suggestion type diversity**: Focus candidates now include a `_type` field (e.g., `"leech"` for high-miss cards, `"weak"` for weak topics) to track suggestion source. The UI filters out suggestions already marked done in `focusDone` state (persisted in localStorage under `cfa_focus_done` with structure `{date: "YYYY-MM-DD", done: {focusKey: true}}`) to prevent repetitive recommendations and ensure daily diversity.


**AI Debrief quota exhaustion handling**: When the daily AI question quota is exhausted, the AI Debrief feature now gracefully degrades instead of failing — it shows the standard explanation and skips Socratic follow-up prompts. Always check `proStatus` and remaining quota before offering AI Debrief buttons to free users.


**Numeric validation in AI questions**: AI question generation now validates that numeric values in explanations (e.g. "= X", "X%", "X basis points/bps") match the marked correct option exactly. Questions with explanations contradicting all options or matching wrong options are rejected. Always ensure computed/concluding values (DIFFERENCE/CHANGE/RESULT/GAP/DELTA/SPREAD statements) align with the correct answer, accounting for unit conversions (e.g. 2.5% = 250 bps).


**Focus completion tracking**: Today's Focus suggestions now persist a completion history in `localStorage` under `cfa_focus_done` with structure `{date: "YYYY-MM-DD", done: {focusKey: true}}`. When a quiz/practice session triggered by a Today's Focus suggestion completes, `pendingFocusKeyRef.current` is checked and marked done. Always set `pendingFocusKeyRef.current` before launching a session from a Today's Focus card to enable proper completion tracking.


**Focus suggestion type diversity**: Focus candidates now include a `_type` field (e.g., `"leech"` for high-miss cards) to track suggestion source. The UI filters out suggestions already marked done in `focusDone` state to prevent repetitive recommendations. When building focus candidates in `buildTodaysFocus()`, always include `_type` so completion tracking can diversify future suggestions.


**Focus completion tracking**: Today's Focus suggestions now track which recommendations have been completed by the user. Completion state is stored in `localStorage` under `cfa_focus_done` with structure `{date: "YYYY-MM-DD", done: {focusKey: true}}`. When a quiz/practice session completes, if `pendingFocusKeyRef.current` is set, the focus key is marked done and localStorage is updated. Always set `pendingFocusKeyRef.current` before launching a practice session triggered by a Today's Focus suggestion.


**Focus suggestion generation**: Today's Focus suggestions now track a `_type` field (e.g., `"leech"` for high-miss cards) to diversify recommendations and prevent suggesting the same module repeatedly. Always include `_type` when building focus candidates so the UI can filter by completion history.


**Numeric validation in questions**: AI question generation now validates that numeric values in explanations (including basis points/bps format) match the marked correct option. Explanations using "= X", "X%", or "X basis points/bps" patterns are parsed and cross-checked against option values. Questions are rejected if a stated numeric result matches a wrong option or if a concluding statement (DIFFERENCE/CHANGE/RESULT/GAP/DELTA/SPREAD) contradicts all options. Always ensure computed values in explanations match the correct option exactly, accounting for unit conversions (e.g., 2.5% = 250 bps).


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

**Today's Focus completion tracking**: New state `focusDone` (localStorage key `cfa_focus_done`) tracks which Today's Focus suggestions have been completed. Format: `{date: localDateKey(), done: {[focusKey]: true}}`. When a quiz completes after a focus suggestion, `pendingFocusKeyRef` marks that focus as done. Focus suggestions are diversified by type (`_type: "leech"` for leech cards, others for spaced review/weak topics) to avoid repetition.


**Screen persistence across refresh**: Progress and revision screens (including selected tab like `los`, Notes, Formulas) now persist across page refresh via localStorage. The screen name and active tab are saved/restored automatically — no special handling required in new features.


**Question generation explanation strictness**: The vignette prompt now explicitly forbids reinterpretive pivots ("reinterpreting"/"however") in explanations near correct answer values, in addition to existing chain-of-thought and self-correction bans. Explanations must be single clean final solutions with correct units.


**UpgradeModal USD pricing**: Added approximate USD conversion display (`~${Math.round(ACTIVE_PRICE/85)} USD`) below INR amount using fixed 85 INR/USD rate for reference. Always update CLAUDE.md if exchange rate assumption changes.


**LOS (Learning Outcome Statements) tab**: RevisionScreen now includes a new `los` tab alongside Notes, Formulas, Learn, and Coach. Displays 2026 LOS by module with expandable sections and a "Practice this module" button that triggers guided quizzes. Data sourced from `activeLOSR` object keyed by topic.


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

- **AI Coach navPortal timing**: The AI Coach button loading state depends on `navPortal` being defined. If the button is rendered before `navPortal` is assigned (temporal dead zone), it loads a blank page. Always ensure `navPortal` is set in the parent component before rendering AI Coach buttons.


- **RevisionScreen topic picker duplication**: The topic picker on the Revision screen should only render for `tab==='notes'||tab==='formulas'||tab==='los'` — the Learn and Coach tabs render their own topic selectors below. Wrap the shared picker in a conditional to prevent duplicate controls.


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
| `cfa_last_screen_v1` | `LAST_SCREEN_KEY` |
| `cfa_level_v1` | `CFA_LEVEL_KEY` |

### Build
Cache version: `app.js?v=1790900000` (increment by 100000 before each commit)
<!-- AUTO_FACTS_END -->

**Level-aware prompts**: Functions like `buildVignettePrompt(topic, module, difficulty, vigCount, subtopic2, losData, level)` and `buildFSAStatementPrompt(subtopic, difficulty, level)` now default `level="1"` but must be called with the user's actual `cfaLevel` from state. `WEEKLY_PLAN_PROMPT` uses template string `{level}` — replace it with `.split("{level}").join(cfaLevel)` before sending to Claude.

**Recently active user display**: The "Recently active" card now shows `display` field (user email) for each session, with fallback to truncated `user_id` if display is null. Update the admin-stats query to include email in the `recentSessions` response for proper display in the UI.

## User-Facing Features (complete inventory)

Keep this section accurate. When doing competitive analysis or writing copy, always check here first before claiming a feature exists or doesn't exist.

### Practice Modes
| Mode | Description | Access |
|---|---|---|
| **Quick Start / Office Mode** | Adaptive 3–15 min session targeting weakest topic. AI-selects topic, module, difficulty. Preset options: 3 Qs ~5 min, 5 Qs ~8 min, 10 Qs ~15 min. | Free |
| **Custom Quiz** | User picks topic, module, difficulty, question count, mode (guided/timed/drill). | Free |
| **Timed Mock Exam** | Full 135-minute timed exam. AI generates questions across all topics. Supports AM/PM session split. Simulates real exam pacing. | Pro |
| **Ethics Case Studies** | Pre-authored ethics vignettes; standalone mode from home More grid. | Free |
| **Speed Drill** | Fast-paced timed questions with per-question countdown. | Free |
| **Guided Mode** | Questions with explanations after each answer, worked examples, AI debrief at session end. | Free |
| **Vignette Mode** | Multi-part case-based questions (L2/L3 style). | Free |

### AI Features
| Feature | Description | Access |
|---|---|---|
| **AI Question Generation** | Generates fresh CFA questions per session anchored to official 2026 LOS. Never repeats exact questions. | 20/day free, unlimited Pro |
| **AI Chat Tutor** | Multi-turn conversational tutor scoped strictly to CFA curriculum (L1/L2/L3). Explains concepts, answers follow-ups. | 15 msg/day free, unlimited Pro |
| **AI Debrief** | Post-session AI analysis of mistakes — identifies patterns, suggests focus areas. | Free |
| **AI Lessons** | AI-generated topic lessons (notes + examples) per module, accessible from Revision screen. | Pro |
| **AI Weekly Study Plan** | Personalised 7-day study plan generated by AI based on weak areas and days left. | Free |
| **AI Daily Mission** | Daily 3-sentence focus briefing generated per user's weakest areas. | Free |
| **AI Daily Refresher** | Short concept recap generated for the user's weakest topic each day. | Free |
| **AI Worked Examples** | Step-by-step worked calculation examples generated on demand per topic. | Free |

### Spaced Repetition
- Full SM-2 spaced repetition deck (`srDeck`). Cards created from wrong answers and flagged questions.
- SR Review screen: shows due cards, accepts Again/Hard/Good/Easy ratings, schedules next review.
- SR card count shown in home screen stats strip ("SR Due").
- Deck syncs to cloud with session history.

### Progress & Analytics
| Feature | Description |
|---|---|
| **Pass Probability** | Live % computed from accuracy, topic coverage, trajectory, and days left. Updates after every session. |
| **Pass Probability Sparkline** | Trend chart vs N sessions ago, shown on home screen. |
| **Module Readiness** | Per-topic readiness score, accuracy, sessions, coverage — shown on Readiness screen. |
| **LOS Coverage Heatmap** | Heatmap of all Learning Outcome Statements covered/uncovered. |
| **Mastery Grid** | Topic × difficulty grid showing performance per cell. |
| **Score History / Dashboard** | Session history, score trend, time patterns, quality metrics, SR stats, flagged questions, API log. |
| **Confidence Calibration** | Tracks when high-confidence answers are wrong — shows calibration insight on home screen. |
| **Streak** | Daily study streak with flame indicator. Loss-aversion nudge when streak is at risk. |
| **Streak Freeze** | Buy (200 XP) or use a freeze to protect streak on missed days. Max 2 held. |
| **XP System** | XP earned per session. Displayed as progress bar (e.g. "3,698 / 5,000 XP"). |
| **Personal Bests** | Tracks longest streak, best session score. |

### Study Tools
| Feature | Description | Access |
|---|---|---|
| **Revision Screen** | Per-topic notes, formulas, power notes, AI lessons, worked examples, flashcard drill. | Free (AI lessons Pro) |
| **Study Path** | Guided curriculum walkthrough — learn then practice each module in sequence. | Free |
| **Fix to Pass** | Identifies weakest modules and creates targeted drill sessions. | Free |
| **CFA Calculator Trainer** | TI BA II Plus calculator practice with keystroke-by-keystroke guidance. | Pro |
| **Lofi Player** | Built-in ambient music player for focus sessions. | Free |
| **Question Flags** | Flag any question for later review. Flagged questions appear in Dashboard. | Free |
| **Offline Cache** | Up to 30 questions per topic/module cached locally. Falls back to cache when offline. | Free |
| **Preset Sessions** | Save custom quiz configurations (topic/module/difficulty/count) for one-tap replay. | Free |

### Engagement & Gamification
- Daily Mission with topic + practice prompt
- Streak with milestone toasts at 7/14/30/60/100 days
- Streak at-risk banner when streak > 0 and not yet studied today
- XP progress bar on home screen
- Badge system (Associate, Analyst, etc.) based on XP level
- What's New carousel on app updates

### Data & Sync
- Cloud sync of session history and SR deck via Supabase
- Full JSON backup export / import
- Anki deck export (flashcard format)
- Progress Report CSV export (topic-level accuracy, sessions, coverage, readiness)
- Referral system: share link → referred user signs up → earn free Pro month per 2 paid referrals

### Supported Levels
- CFA Level 1, 2, and 3 (full LOS for each)
- Level-aware question generation, AI prompts, curriculum data, and study plans
- Switch levels from Settings; all state resets cleanly on switch

### Platform
- Progressive Web App (PWA) — installable on iOS and Android home screen
- Works in any mobile browser, no app store download required
- Offline question cache for low-connectivity use
- Admin dashboard (email-gated) with user analytics, revenue, activity feed

Recent slides (2026-06-30-d, 2026-06-30-e) document formula column display fixes, AI debrief reliability improvements, and duplicate topic picker removal. When adding new versions, ensure emoji consistency and actionable tip text. Previous versions (2026-06-26-b, 2026-06-26-c) are retained in `WHATS_NEW_SLIDES` history for reference but are no longer shown to users.

**Recent critical fixes (2026-07-01)**: AI Coach/debrief error handling now displays meaningful messages instead of blank screens; formula display fixed to prevent single-character column collapse; duplicate question IDs and mismatched explanations eliminated. These fixes improve reliability for free-tier users hitting quota limits and for all users interacting with AI features.
