# ClearCFA — Claude Code Reference

ClearCFA is a single-file React CFA exam prep tool served via GitHub Pages.

## Build & Deploy

```bash
# Build
node build.js          # Babel transforms src/app.jsx → app.js (~960KB, ~1-2s)

# Deploy (always push both branches)
git push origin main && git push origin main:claude/index-html-github-pages-cfa8fd

# Cache bust — increment v= in index.html by 100000 before every commit
# e.g. v=1784300000 → v=1784400000
# Users won't see changes without this step
```

Live URL: https://praneethgollamudi.github.io/ClearCFA/

## Architecture

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

### navPortal

The bottom navigation bar, rendered via `ReactDOM.createPortal` into `#nav-root`. Defined inside `CFAMock` render after `wrap()` (search `const _navRootEl`). Included automatically by `wrap()`.

The `activeTab` map inside `navPortal` must include every screen name. Search `activeTab =` to find it.

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
WHATS_NEW_KEY      = "cfa_whats_new_v1"   — what's new version seen
WHATS_NEW_VERSION  = "2026-06-25"         — bump this string each release
PRO_TOUR_KEY       = "cfa_pro_tour_v1"    — pro tour dismissed
SCREEN_ONBOARD_KEY = "cfa_screen_onboard_v1" — per-screen first-visit flags
```

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

- **navPortal**: `wrap()` includes it automatically. Never add it manually to a screen.
- **Cache bust**: Always increment `v=` in `index.html` before committing. Without this, users see the old cached version.
- **Two-branch push**: Always push both `main` AND `main:claude/index-html-github-pages-cfa8fd`.
- **Haiku only**: Never switch question generation to Sonnet — 4–6x cost increase.
- **Offline fallback**: `OFFLINE_QS_KEY` caches up to 30 questions per topic/module. The `catch` block in `generateQuestions` uses these automatically.
- **Build warning**: "deoptimised the styling" is normal. Not an error.
