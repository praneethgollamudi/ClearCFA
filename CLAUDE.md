# ClearCFA — Claude Code Reference

ClearCFA is a single-file React CFA exam prep tool served via GitHub Pages.

## Branding & Identity

**Re-engage Brevo error handling (425d490)**: re-engage edge function now wraps Brevo API calls in try-catch blocks with comprehensive error diagnostics. When Brevo requests fail (network error, invalid credentials, rate limit), errors are caught and returned with both `error` and optional `message` fields for frontend display.


**What's New version consolidation (425d490)**: Version 2026-07-12 has been moved to end of WHATS_NEW_SLIDES and now announces "Reliable Re-engagement Emails" instead of "Complete Mock Exam Experience"; version 2026-07-12-f added as empty placeholder. Currently active versions are 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, 2026-07-12-f, and 2026-07-12. Always verify against active list when adding future versions to prevent duplicate messaging.


**Re-engage error display robustness (425d490)**: reengage_test error display now falls back to `d.message`, full JSON stringification, and "unknown error" if `d.error` is missing. When testing re-engagement preview flows, check for multiple error field formats in the response to ensure comprehensive error reporting.


**What's New version 2026-07-12 removal (861c53f)**: Version 2026-07-12 (mock exam complete experience slide) has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-f is now an empty placeholder. Always verify against active list when adding new versions to prevent duplicate messaging.


**Re-engage error array surface (861c53f)**: re-engage bulk send results now include `d.errors` array with individual send failures. Frontend displays up to 3 errors inline: `Re-engage emails sent: ${d.sent} delivered, ${d.failed} failed of ${d.total} — ${d.errors.slice(0,3).join(" | ")}`. When testing bulk sends, check the result message for per-recipient Brevo API errors.


**Resend to Brevo migration (861c53f)**: re-engage email delivery now uses Brevo API instead of Resend. `BREVO_API_KEY` env var required; `FROM_EMAIL` defaults to `ADMIN_EMAIL` if not set. Brevo supports unrestricted recipient delivery without free-plan verification limits. When testing re-engagement, ensure Brevo credentials are configured and preview emails route to ADMIN_EMAIL.


**Push subscriptions migration safety (bdcde94)**: push_subscriptions migration now drops existing FK constraints before converting user_id from uuid to text. When running migrations on existing databases, the script safely detects and removes the old FK to prevent type-mismatch errors during deployment.


**Re-engage error display (6fe08b8)**: Re-engage bulk send results now surface error details via `d.errors` array. Display up to 3 errors inline: `Re-engage emails sent: ${d.sent} delivered, ${d.failed} failed of ${d.total} — ${d.errors.slice(0,3).join(" | ")}`. When testing re-engagement flows, check the result message for Resend API errors.


**What's New version consolidation (6fe08b8)**: Version 2026-07-12-f has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-e. Version 2026-07-12-e is now an empty placeholder slide. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (bdcde94)**: Versions 2026-07-12-e and 2026-07-12-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-e. Version 2026-07-12-d now announces re-engagement email fixes. Version 2026-07-12-e is now an empty placeholder slide. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (c002c83)**: Versions 2026-07-12-d and 2026-07-12-e have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-f. Versions 2026-07-12-c and 2026-07-12-d now announce re-engagement email fixes and error messaging improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**Re-engage preview email recipient update (c002c83)**: Re-engage preview emails are now always sent to the ADMIN_EMAIL constant for Resend free-plan compatibility, regardless of which user initiates the preview. When testing re-engagement flows via admin dashboard, expect preview emails to arrive at the configured ADMIN_EMAIL address, not the test user's inbox.


**What's New version consolidation (863f4ce)**: Version 2026-07-12-d has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-c now announces better error messages for re-engagement. Always verify against active list when adding future versions to prevent duplicate messaging.


**Re-engage preview email recipient (863f4ce)**: Re-engage test emails are now sent to `gspbuilds@gmail.com` (Resend account owner) instead of the current user's email. When testing re-engagement flows via admin dashboard, verify the preview arrives at gspbuilds@gmail.com, not the admin user's own inbox.


**Re-engage email error messaging (89ad21a)**: admin-stats reengage_test endpoint now surfaces Resend API errors and includes optional `hint` field in response (e.g., free-plan restriction warnings). When displaying re-engage test results, append the hint if present: `Failed: ${error} — ${hint}`.


**What's New version consolidation (89ad21a)**: Version 2026-07-12-c has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-b is now an empty placeholder slide. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (12146f7)**: Versions 2026-07-12-b and 2026-07-12-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12 now announces mock exam features (realistic pacing, no reference tools). Always verify against active list when adding future versions to prevent duplicate messaging.


**Admin-stats authorization email fallback (12146f7)**: admin-stats endpoint now accepts `email` in request body and authorizes OAuth users via email+userId presence check without requiring userId length validation. When implementing admin features, email fallback runs unconditionally—no length guards or gating on other credentials. This ensures OAuth users (who may lack traditional userId) can still be authorized if their email is in ADMIN_EMAILS and they have a valid userId.


**What's New version consolidation (39b7423)**: Version 2026-07-12-b has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12 now announces mock exam features (realistic pacing, no reference tools). Always verify against active list when adding future versions to prevent duplicate messaging.


**Admin authorization simplification (39b7423)**: admin-stats endpoint now authorizes admin users via email+userId presence check only—no sessions table lookup required. When implementing admin features, if a user's email is in ADMIN_EMAILS and they have a valid userId (proving app login), grant access immediately without additional session verification.


**Admin authorization logic simplification (894c794)**: admin-stats endpoint now authorizes via email+userId presence check instead of sessions table lookup. When implementing admin features, rely on ADMIN_EMAILS list and valid userId (64-char SHA-256 hex for password users) for access control—no sessions table validation required.


**Leaderboard SQL jsonb casting (78e568c)**: leaderboard SQL function now explicitly casts sessions.data to jsonb to prevent type mismatches. When querying or aggregating session data in SQL functions, ensure jsonb casts are applied to JSON columns for safe operator usage.


**Push subscriptions user_id type constraint (7b7229f)**: push_subscriptions.user_id is now TEXT (not UUID) to support both Supabase auth UUIDs and password-based users with 64-char SHA-256 hex strings. When querying or filtering push_subscriptions, cast auth.uid() to text for joins and always drop RLS policies before altering column types in migrations.


**Supabase RLS policy idempotency (0a1639e)**: All RLS policies in migrations now use `DROP IF EXISTS` before `CREATE POLICY` to ensure idempotent re-runs. When modifying or adding RLS policies, always drop them first to prevent deployment failures if migrations are replayed.


**Supabase RLS idempotency (1d16652)**: study_groups table RLS migration is now idempotent to unblock deployment pipeline. When modifying Supabase migrations, ensure all DDL operations can be safely re-run without errors (e.g., use `IF NOT EXISTS`, `DROP IF EXISTS`) to prevent deployment failures on retry.


**Topic normalization mapping (1d16652)**: TNORM constant now maps canonical topic names to display variants (e.g., `{"Equity":"Equity Investments","Alternatives":"Alternative Investments"}`). When referencing topics in calculations, comparisons, or storage, use canonical names ("Equity", "Alternatives") and apply TNORM only for display purposes to prevent matching failures.


**What's New version consolidation (1d16652)**: Versions 2026-07-12 and 2026-07-12-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-e announces AI resilience, topic name clarity, and daily question user isolation. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (57aece5)**: Versions 2026-07-12-e and 2026-07-12-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-e. Version 2026-07-12-d announces AI retry improvements and daily question isolation. Version 2026-07-12-e announces AI resilience, topic naming clarity, and user data isolation. Always verify against active list when adding future versions.


**Daily Question user isolation fix (c312adf)**: Daily question assignments and push notification subscriptions are now properly isolated per user. When implementing or modifying user data storage or push features, ensure user context is correctly scoped to prevent data leakage between users sharing the same device or browser.


**AI retry resilience upgrade (9ac45b3)**: AI request retry logic now attempts up to 4 times with improved rate-limit handling before timeout. When implementing AI-dependent features (question generation, explanations), rely on this resilience—users should experience fewer failures during peak hours without requiring manual intervention.


**Topic name normalization (57aece5)**: "Alternative Investments" has been normalized to "Alternatives" across all topic references, including HARD_TOPICS_LIST and topic weight warnings. When adding or referencing CFA exam topics, use "Alternatives" as the canonical name to avoid duplicate weight alerts and inconsistent UI messaging.


**Pro access for founder/tester (175720b)**: sai.praneeth557@gmail.com has been added to OWNER_EMAILS alongside gspbuilds@gmail.com to restore Pro tier access for the founder. Maintain both emails in OWNER_EMAILS—do not consolidate or remove sai.praneeth557@gmail.com unless explicitly instructed.


**What's New version consolidation (9ac45b3)**: Versions 2026-07-12-b and 2026-07-12-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Versions 2026-07-12 and 2026-07-12-b now announce email reliability improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (31cd1d7 & recent)**: Versions 2026-07-12 and 2026-07-12-b have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-f consolidates web push notifications and streak tracking. Always verify against active list when adding future versions to prevent duplicate messaging.


**Pro access restoration (175720b)**: sai.praneeth557@gmail.com has been restored to OWNER_EMAILS for Pro access, separate from admin operations which use gspbuilds@gmail.com. When managing Pro tier access or admin features, ensure these two email roles remain distinct—founder/tester Pro access vs. operational admin contact.


**What's New version consolidation (31cd1d7)**: Versions 2026-07-12 and 2026-07-12-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-e. Version 2026-07-12-e consolidates mock session progress tracking and streak/reminder features. Always verify against active list when adding future versions to prevent duplicate messaging.


**VAPID public key replacement (31cd1d7)**: VAPID_PUB_KEY has been updated from a fabricated key to a real P-256 generated key (`"BBXW1DGWNhK1tUyzVkrsfhiNF5PIwiztq7PsRntHGvuzxnPsnR07UV-H631e-UHPWzIPkeouGg_giEsH3BVjQM8"`). When implementing or modifying web push infrastructure, ensure this canonical VAPID key is used and matches server-side push configuration.


**What's New version consolidation (79381e1)**: Versions 2026-07-12-e and 2026-07-12-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-e. Version 2026-07-12-d announces calendar export, mock exam progress tracking, and streak/reminder features. Version 2026-07-12-e consolidates mock session progress tracking. Always verify against active list when adding future versions to prevent duplicate messaging.


**Admin email update (79381e1)**: Admin contact email has been changed from sai.praneeth557@gmail.com to gspbuilds@gmail.com across all codebase references. When adding new admin features or modifying contact configurations, ensure gspbuilds@gmail.com is used as the canonical admin address.


**Reply-To header for re-engagement emails (3ea0245)**: Re-engagement emails now include a Reply-To header alongside FROM_EMAIL. When implementing or modifying email infrastructure, ensure Reply-To is set consistently with FROM_EMAIL to maintain email deliverability and user response routing.


**What's New version consolidation (3ea0245)**: Versions 2026-07-12-d and 2026-07-12-e have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, and 2026-07-12-f. Version 2026-07-12-c now announces calendar export, Exam-Weight mock crediting fix, and retention features (web push + re-engagement). Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (bac486b)**: Versions 2026-07-12-c and 2026-07-12-d have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-b announces Exam-Weight Mock sessions, calendar export (.ics), and LinkedIn share cards. Always verify against active list when adding future versions to prevent duplicate messaging.


**Web Push subscription constants (784302a)**: App uses PUSH_SUB_KEY (`"cfa_push_sub_v1"`) for localStorage and VAPID_PUB_KEY (`"BJyw3vH_hMLq348vR8P_uy1tqWJT3NzemwYye8tyBJze8aHLLTKtLi9FrDJc21jP6m_jzbaGdx6pu6sfRo5Cgj64"`) for push notifications. When modifying push infrastructure or storage, preserve both constants and ensure VAPID key matches server configuration.


**Resend shared sender for re-engagement emails (bac486b)**: Re-engagement email FROM_EMAIL uses Resend's shared sender until a custom domain is acquired. When implementing email features or modifying sender configuration, ensure FROM_EMAIL respects the Resend shared domain constraint to prevent delivery failures.


**Exam-Weight Mock crediting bug fix (02e6aca)**: Exam-Weight Mock sessions now properly credit module readiness scores and pass trend calculations. When modifying mock session result handling or readiness calculation, ensure Exam-Weight sessions update metrics identically to standard sessions.


**Web Push notifications and retention features (784302a)**: App now supports Web Push subscriptions (PUSH_SUB_KEY, VAPID_PUB_KEY) for re-engagement messaging, panic streak banners, and re-engagement emails. When implementing push features or modifying notification logic, ensure VAPID public key and subscription storage respect browser permissions and user opt-in preferences.


**Calendar export to Study Plan screen (298773d)**: Study Plan screen now includes calendar export functionality (.ics format) for scheduling study sessions. When modifying Study Plan UI or adding new export features, ensure calendar integration maintains compatibility with common calendar applications (Google Calendar, Outlook, Apple Calendar).


**What's New version consolidation (298773d)**: Versions 2026-07-11-e and 2026-07-12 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-e announces Exam-Weight Mock sessions, AI-Generated Study Notes, and Challenge Mode availability. Version 2026-07-12-f appears to be a variant consolidating Exam-Weight Mock sessions. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (4643366)**: Versions 2026-07-11-d and 2026-07-11-e have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, and 2026-07-12-e. Version 2026-07-12-d announces AI Study Notes generator and Challenge Mode. Version 2026-07-12-e announces Exam-Weight Mock sessions. Always verify against active list when adding future versions to prevent duplicate messaging.


**LinkedIn landscape share card (c19362b)**: Results screen now includes a 1200x627px LinkedIn landscape share card for social sharing. When modifying results screen or adding new social features, ensure share card dimensions and branding are maintained for optimal LinkedIn display.


**Exam-Weight Mock sessions (3cfea94)**: New 18-question practice sessions are now aligned to official CFA exam topic weight distributions. When generating or modifying mock exam sessions, ensure question selection respects realistic topic weighting to provide authentic exam-condition practice.


**What's New version consolidation (4643366)**: Versions 2026-07-11-c and 2026-07-11-d have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-11-e, 2026-07-12, 2026-07-12-b, 2026-07-12-c, and 2026-07-12-d. Version 2026-07-12-c announces AI-powered study notes generator and pass probability explainability drawer. Version 2026-07-12-d consolidates AI study notes, Challenge Mode, and smarter question context with LOS badges. Always verify against active list when adding future versions to prevent duplicate messaging.


**LOS source badges and exam topic weights (12c12a3)**: Questions now display Learning Outcome Statement source badges with associated exam topic weightings. Question generation respects realistic topic distributions based on CFA exam blueprints. When modifying question selection or difficulty scaling, ensure topic weight constraints are enforced to prevent over-practicing low-weight areas.


**Pass probability explainability drawer (3129d2d)**: Incorrect answers now display an explainability drawer that breaks down probability reasoning step-by-step. When modifying answer feedback or explanation display, ensure probability concept breakdowns are accurate and accessible to users who got questions wrong.


**AI Study Notes generator (90e0fa3)**: Revision screen Notes tab now includes AI-powered study note generation. When adding or modifying AI features, ensure note generation respects topic context and user mastery level to provide appropriately scoped summaries.


**Challenge Mode toggle (4643366)**: Setup screen now includes a Challenge Mode toggle option. When modifying setup flow or session configuration options, ensure Challenge Mode preference is properly persisted and respected during question generation and difficulty scaling.


**What's New version consolidation (4643366)**: Versions 2026-07-11-b and 2026-07-11-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-11-d, 2026-07-11-e, 2026-07-12, 2026-07-12-b, and 2026-07-12-c. Version 2026-07-12-b announces pass probability explainability drawer and LOS source badges with exam topic weightings. Version 2026-07-12-c announces AI-powered study notes generator for Revision screen. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (90e0fa3)**: Versions 2026-07-11 and 2026-07-11-b have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-11-c, 2026-07-11-d, 2026-07-11-e, 2026-07-12, and 2026-07-12-b. Version 2026-07-12 announces LOS source badges with exam topic weights, daily wrong-answer review panel, and 70% topic mastery milestones. Version 2026-07-12-b announces pass probability explainability drawer for incorrect answers. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (3129d2d)**: Versions 2026-07-08 and 2026-07-11 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-11-b, 2026-07-11-c, 2026-07-11-d, 2026-07-11-e, and 2026-07-12. Version 2026-07-11-e consolidates daily wrong-answer review panel, topic mastery celebration milestones, and six new social & effectiveness features. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (adae950)**: Versions 2026-07-07-b and 2026-07-07-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-08, 2026-07-11, 2026-07-11-b, 2026-07-11-c, and 2026-07-11-d. Version 2026-07-11-c announces six new effectiveness and social features. Version 2026-07-11-d announces topic mastery celebrations (70% accuracy toast milestone) and reiterates six new study features. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (1ee95d3)**: Version 2026-07-07-b has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-07-c, 2026-07-08, 2026-07-11, 2026-07-11-b, and 2026-07-11-c. Version 2026-07-11-c announces six new effectiveness and social features including leaderboards and progress tracking. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (2783ae0)**: Version 2026-07-07 has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-07-b, 2026-07-08, 2026-07-11, and 2026-07-11-b. Version 2026-07-11-b consolidates per-session LOS prioritization and Indian rupee pricing display fixes. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (1424fa2)**: Versions 2026-07-06-d and 2026-07-07 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-07-b, 2026-07-08, 2026-07-11, and 2026-07-11-b. Version 2026-07-11 consolidates per-session LOS prioritization, same-day question repeat prevention, and correct regional currency display. Version 2026-07-11-b appears to be a partial duplicate variant still being finalized. Always verify against active list when adding future versions to prevent duplicate messaging.


**Admin dashboard metrics expansion (f144a3e)**: Admin dashboard now displays growth metrics, retention analytics, and Monthly Recurring Revenue (MRR) tracking. When adding new metrics or modifying dashboard data fetching, ensure performance metrics are properly aggregated and displayed alongside core business KPIs.


**Admin dashboard JWT token expiration handling (5b42172)**: Admin dashboard now gracefully handles expired JWT tokens during authentication rather than failing silently. When modifying admin authentication or token validation logic, ensure expired token detection triggers appropriate re-authentication flow to maintain dashboard accessibility.


**What's New version consolidation (17df29b)**: Versions 2026-07-06-c and 2026-07-06-d have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-07, 2026-07-08, and 2026-07-11. Version 2026-07-08 addresses free tier pricing currency display. Version 2026-07-11 consolidates per-session LOS coverage prioritization and same-day question repeat prevention. Always verify against active list when adding future versions to prevent duplicate messaging.


**Free tier pricing display (7ecc5c7)**: Free tier pricing now correctly displays rupee currency symbol instead of dollar sign. When modifying pricing display or currency formatting, ensure localization context is respected to show appropriate currency symbols for regional pricing tiers.


**What's New version consolidation (7ecc5c7)**: Versions 2026-07-06 and 2026-07-06-b have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-c, 2026-07-06-d, 2026-07-07, and 2026-07-07-b. Version 2026-07-07-b consolidates delta bar readiness visualization, same-day question repeat prevention, and calculator keystroke display. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (17df29b)**: Versions 2026-07-06-f and 2026-07-06 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-b, 2026-07-06-c, 2026-07-06-d, 2026-07-07. Version 2026-07-07 introduces combined module drill sessions and Super Focus Mode. Always verify against active list when adding future versions to prevent duplicate messaging.


**Per-session LOS coverage tracking (17df29b)**: Question generation now prioritizes Learning Outcomes (LOS) that haven't been tested in the current session, tracking coverage per-session rather than globally. When modifying question selection or difficulty scaling, ensure untested LOS within the active session are prioritized to improve coverage diversity within single study blocks.


**Same-day question repeat prevention (0d79422)**: The app now prevents question repeats across multiple sessions within the same day to maintain focused practice. When modifying session question selection or daily session tracking, ensure questions answered in any session on the current date are excluded from subsequent sessions that day to prevent redundant practice.


**What's New version consolidation (0d79422)**: Versions 2026-07-06-e and 2026-07-06-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06, 2026-07-06-b, 2026-07-06-c, 2026-07-06-d, and 2026-07-07. Version 2026-07-06-d consolidates pass probability stability after easy sessions, calculator keystroke display, and multi-module question count calibration. Version 2026-07-07 is newly added. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (fc8166f)**: Versions 2026-07-06-d and 2026-07-06-e have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-f, 2026-07-06-b, and 2026-07-06-c. Version 2026-07-06-c consolidates calculator keystroke display, multi-module question count calibration, and session history metadata preservation. Always verify against active list when adding future versions to prevent duplicate messaging.


**Readiness screen trajectory bar replaced with delta bar (fc8166f)**: Readiness screen now displays a ±-centered delta bar instead of a trajectory bar to show pass probability change. When modifying readiness screen visualization or pass probability display logic, ensure delta bar rendering reflects directional movement from baseline rather than historical trajectory to maintain accurate readiness feedback.


**Pass probability stability after easy sessions (da7b4bb)**: Pass probability calculations now remain stable after completing easy difficulty sessions, preventing artificial drops in readiness scores. When modifying difficulty scaling or performance history updates, ensure pass probability calculations account for session difficulty context to maintain score consistency across varying challenge levels.


**What's New version consolidation (da7b4bb)**: Versions 2026-07-06-c and 2026-07-06-d have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-e, 2026-07-06-f, and 2026-07-06-b. Version 2026-07-06-b consolidates multi-module session question count fixes, question deduplication improvements, and session history metadata preservation. Always verify against active list when adding future versions to prevent duplicate messaging.


**Calculator keystroke display truncation (6f7a6f8)**: Calculator step sequences now display full keystroke text instead of ellipsis abbreviations. When modifying calculator step rendering or keystroke display logic, ensure text truncation is not applied to keystroke sequences to maintain clarity of calculation steps.


**What's New version consolidation (6f7a6f8)**: Versions 2026-07-06-b and 2026-07-06-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06, 2026-07-06-d, 2026-07-06-e, and 2026-07-06-f. Version 2026-07-06 consolidates multi-module progress tracking, question deduplication, and session history preservation fixes. Always verify against active list when adding future versions to prevent duplicate messaging.


**Multi-module drill question count calibration (78a94ff)**: Multi-module drill sessions now generate appropriate question counts by properly accounting for combined module difficulty and user performance across all selected modules. When modifying multi-module drill initialization or question count calculations, ensure adaptive scaling considers cumulative difficulty of all selected modules to prevent under-scoping combined sessions.


**What's New version consolidation (78a94ff)**: Versions 2026-07-06 and 2026-07-06-b have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-c, 2026-07-06-d, and 2026-07-06-f. Version 2026-07-06-f consolidates multi-module drill selection, question deduplication fixes, and multi-module progress tracking fixes. Always verify against active list when adding future versions to prevent duplicate messaging.


**Session history stripping level and subtopics fields on reload (93f1642)**: Session history now properly strips `level` and `subtopics` fields when reloading to prevent stale session metadata from corrupting active study state. When modifying session persistence or history loading logic, ensure deprecated fields are removed before state reconciliation to maintain session data integrity.


**What's New version consolidation (93f1642)**: Versions 2026-07-05 and 2026-07-06 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-b, 2026-07-06-c, 2026-07-06-d, and 2026-07-06-e. Version 2026-07-06-e consolidates multi-module drill selection, adaptive difficulty scaling, and multi-module progress tracking fixes. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (cacf288)**: Versions 2026-07-05 and 2026-07-05-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06, 2026-07-06-b, 2026-07-06-c, 2026-07-06-d, and 2026-07-06-e. Always verify against active list when adding future versions to prevent duplicate messaging.


**Question deduplication and seen-stems tracking (cacf288)**: QDB loading now properly deduplicates questions by stem and tracks offline seed questions in seen stems to prevent duplicate question presentation across online and offline contexts. When modifying question loading, QDB initialization, or offline seed integration, ensure seen stems are updated when offline seeds are loaded to maintain deduplication consistency across session types.


**Multi-module session module coverage tracking (2aa628d)**: Multi-module drill sessions now properly credit all covered modules in user progress, preventing scenarios where combining modules skips updating performance for non-primary topics. When modifying multi-select drill completion logic or progress tracking, ensure all selected modules are credited in performanceHistory regardless of drill question distribution to maintain accurate per-module readiness assessment.


**What's New version consolidation (2aa628d)**: Versions 2026-07-05-f and 2026-07-05-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-05, 2026-07-06, 2026-07-06-b, 2026-07-06-c, and 2026-07-06-d. Versions 2026-07-06-c and 2026-07-06-d consolidate Super Focus Mode, adaptive difficulty scaling, multi-module drill selection, and offline/ETA polish. Always verify against active list when adding future versions to prevent duplicate messaging.


**Multi-module drill loading state display (75f6ff1)**: Multi-module drill sessions now show correct loading indicators during initialization. When modifying drill loading screens or multi-select drill logic, ensure loading display reflects actual drill preparation state across all selected modules to prevent UX confusion during session startup.


**Multi-module drill adaptive count (75f6ff1)**: Multi-module drill sessions now calculate question count adaptively based on combined module difficulty and user performance history. When modifying drill initialization for multi-select sessions, ensure adaptive count respects historical performance across all selected modules to prevent over/under-scoping combined drills.


**What's New version consolidation (75f6ff1)**: Versions 2026-07-05-e and 2026-07-05-f have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-05-c, 2026-07-05-d, 2026-07-06, 2026-07-06-b, and 2026-07-06-c. Version 2026-07-06-b and 2026-07-06-c consolidate adaptive drill difficulty, Super Focus Mode tab-switch tracking, and offline polish. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (e73da89)**: Versions 2026-07-05-d and 2026-07-05-e have been removed from WHATS_NEW_SLIDES; current active versions are 2026-07-05-f and 2026-07-06. Version 2026-07-06 consolidates Super Focus Mode, calculator keystrokes, Study Groups real-time syncing, and Daily Q/offline polish. Always verify against active list when adding future versions to prevent duplicate messaging.


**Multi-select module pills on readiness screen (77b7fa9)**: Readiness screen now supports multi-select module pills for combined drill sessions across topics. When modifying readiness screen drill logic or module selection state, ensure multi-select state is properly tracked and passed to drill initialization to maintain combined session scope.


**What's New version 2026-07-06 (e73da89)**: Added new What's New version 2026-07-06 documenting Super Focus Mode with tab-switch tracking and wake lock functionality. When adding future What's New versions, verify that consolidated versions (e.g., 2026-07-05-b, 2026-07-05-d) are removed to avoid duplicate feature messaging.


**Super Focus Mode tab-switch detection and Wake Lock (9189fda)**: Super Focus Mode now detects tab visibility changes and enforces wake lock to prevent screen dimming during study sessions. When modifying focus mode state management or implementing new focus features, ensure tab visibility listeners are properly attached/detached and wake lock cleanup occurs on mode exit to prevent battery drain and listener leaks.


**Adaptive difficulty on readiness screen drill buttons (e73da89)**: Readiness screen drill buttons now apply adaptive difficulty based on user performance. When modifying drill button behavior or readiness assessment logic, ensure difficulty scaling respects historical performance data to maintain appropriate challenge levels across study sessions.


**Offline seed questions expansion scope (a4de3b2)**: OFFLINE_SEED_QS now totals 21 seeded questions across Ethics (6), Quantitative Methods (6), Economics (6), and Financial Statement Analysis (3). When expanding offline seeds further, maintain the "Correct: [option]" prefix convention and track total question count to ensure balanced topic coverage for new users.


**Super Focus Mode with tab-switch tracking and Wake Lock (9189fda)**: Super Focus Mode now detects tab switches and enforces wake lock to prevent screen dimming during study sessions. When modifying focus mode state management or implementing new focus features, ensure tab visibility changes are tracked and wake lock cleanup occurs on mode exit to prevent battery drain.


**ETA display polish (a4de3b2)**: Estimated time-to-completion calculations and displays have been refined for accuracy and clarity. When modifying time estimation logic or study progress calculations, validate ETA outputs against actual study session durations to maintain user trust in completion predictions.


**Leaderboard empty state handling (a4de3b2)**: Study Groups leaderboard now includes explicit empty state display when no members have answered questions yet. When updating leaderboard rendering logic, ensure empty states are properly detected and displayed to prevent confusing blank screens before data loads.


**Daily Question rotation logic (a4de3b2)**: Daily Question feature now includes rotation logic to cycle through different questions across user sessions. When modifying Daily Q state management or persistence, verify that question rotation respects session boundaries and doesn't display the same question repeatedly within a user's study window.


**Offline seed questions Quantitative Methods & Economics expansion (a4de3b2)**: OFFLINE_SEED_QS now includes 6 additional Quantitative Methods questions (s_qm_4 through s_qm_6) covering joint probability, Type I/II errors, and regression coefficients, plus 6 Economics questions (s_ec_4 through s_ec_6) covering GDP components, monetary policy transmission, and PPP. All new explanations use the "Correct: [option]" prefix format. When expanding offline seeds further, maintain consistent prefix conventions across all topics.


**What's New 'Got it' button persistence fix (97db805)**: The What's New overlay 'Got it' buttons now properly dismiss the overlay and prevent it from re-appearing on subsequent visits. When modifying What's New modal state management or persistence logic, ensure dismissal state is correctly saved and respected to prevent overlay loop regression.


**Offline seed questions Ethics expansion (97db805)**: OFFLINE_SEED_QS Ethics suite now includes 6 questions (s_et_1 through s_et_6) covering MNPI, Standards hierarchy, gift disclosure, suitability, and supervisor responsibilities. All explanations use the "Correct: [option]" prefix format. When adding or modifying offline seed questions, maintain this prefix convention for consistency across all question types.


**Four UX improvements deployed (cbdd9fd)**: Recent release added abort/cancel request handling, share functionality, offline seed expansion, and answer format validation. When implementing async operations or new user actions, ensure abort signals are properly propagated and cancel handlers clean up pending API calls to prevent orphaned requests.


**Offline seed questions expansion (cbdd9fd)**: OFFLINE_SEED_QS now includes 6 Ethics questions (s_et_1 through s_et_6) covering MNPI, Standards hierarchy, gift disclosure, suitability, and supervisor responsibilities. When adding offline seed questions, ensure explanations are prefixed with "Correct: [option]" to maintain consistency with the expanded Ethics suite.


**Study Groups leaderboard scope (7a16812)**: Study group leaderboards display real-time member rankings fetched from Supabase with proper authentication context. When querying or updating leaderboard data, ensure the Supabase client scope is limited to the current group and authenticated user to prevent cross-group data leakage.


**Session race condition fix (8fe6efd)**: Session generation now checks for active sessions before creating new ones, preventing stale sessions from overwriting the current user's active session state. When modifying session creation or authentication flows, verify that session checks occur before state mutation to maintain data consistency across concurrent user actions.


**What's New version consolidation (8fe6efd)**: Versions 2026-07-04-e and 2026-07-05 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-05-b, 2026-07-05-c, 2026-07-05-d, 2026-07-05-e, and 2026-07-05-f. Versions 2026-07-05-e and 2026-07-05-f consolidate BA II Plus keystroke display, rule-based hint fallback, Daily Q collapse, Study Groups integration, and leaderboard features. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (7a16812)**: Versions 2026-07-04-d and 2026-07-04-e have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-05, 2026-07-05-b, 2026-07-05-c, 2026-07-05-d, and 2026-07-05-e. Version 2026-07-05-d and 2026-07-05-e consolidate BA II Plus keystroke display, Daily Q collapse, rule-based hint fallback, and AI diagnosis fixes. Always verify against active list when adding future versions to prevent duplicate messaging.


**Study Groups Supabase integration (7a16812)**: Study Groups feature now uses Supabase for real-time create/join/leave/leaderboard operations. When modifying Study Groups functionality, ensure all CRUD operations and leaderboard queries are routed through Supabase client and authenticated properly to maintain data consistency across user sessions.


**What's New version consolidation (c6d16c7)**: Versions 2026-07-04-c and 2026-07-04-d have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-04-e, 2026-07-05, 2026-07-05-b, 2026-07-05-c, and 2026-07-05-d. Version 2026-07-05-c consolidates BA II Plus keystroke display, AI diagnosis reliability fix, and YTM sign-entry improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**Rule-based calculator hint fallback for cached questions (c6d16c7)**: Questions cached from previous sessions now fall back to rule-based hint generation when AI hints are unavailable, ensuring consistent guidance across all question states. When modifying hint generation or question caching logic, verify that both AI and rule-based hint paths remain functional to prevent blank hint displays on cached questions.


**AI diagnosis argument order fix (0db1e7c)**: The callAIChat function now receives arguments in the correct order (question, answer, mode) to ensure AI diagnosis reliably connects user errors to the right analysis. When invoking AI diagnosis from question cards or feedback UI, verify argument order matches the function signature to prevent analysis mismatch.


**Daily Q card done-state collapse (fde2299)**: The Daily Question card now collapses to a compact done-state immediately after the user answers a question, reducing visual clutter and encouraging progression through multiple questions. When modifying the Daily Q UI or feedback flow, maintain this collapse behavior to preserve the streamlined study experience.


**What's New version consolidation (fde2299–d81f23c)**: Versions 2026-07-04-b and 2026-07-04-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-04-d, 2026-07-04-e, 2026-07-05, 2026-07-05-b, and 2026-07-05-c. Version 2026-07-05-c consolidates BA II Plus keystroke display, AI diagnosis reliability fix, and YTM sign-entry improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (0db1e7c–d81f23c)**: Versions 2026-07-04 and 2026-07-04-b have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-04-c, 2026-07-04-d, 2026-07-05, and 2026-07-05-b. Version 2026-07-05-b consolidates BA II Plus keystroke display feature and negative value entry fix. Always verify against active list when adding future versions to prevent duplicate messaging.


**BA II Plus keystroke display for calculator questions (d81f23c)**: Calculator-applicable exam questions now display exact BA II Plus keystroke sequences alongside solutions to bridge concept understanding with practical exam execution. When adding new calculator-applicable questions or problem types, ensure keystroke sequences are documented and validated against actual BA II Plus behavior to maintain exam preparation accuracy.


**App architecture refactor: utils.js and calculator.jsx separation (d43b633)**: Core utility functions (storage, auth, data transformations) now live in utils.js while calculator-specific logic resides in calculator.jsx. When adding features, maintain this separation: general utilities → utils.js, calculator UI/logic → calculator.jsx, to preserve code organization established by this refactor.


**BA II Plus keystroke display for calculator questions (d81f23c)**: The app now shows exact BA II Plus keystrokes for exam questions that are calculator-applicable. When adding new question types or calculator-assisted content, ensure keystroke sequences are documented and tested against the BA II Plus emulator behavior to maintain accuracy for exam preparation.


**App architecture refactor (d43b633)**: The monolithic src/app.jsx has been split into utils.js and calculator.jsx to improve maintainability and code organization. When adding new features or modifying existing logic, ensure utility functions remain in utils.js and calculator-specific code stays in calculator.jsx to maintain the separation of concerns established by this refactor.


**What's New version reordering (f47b7af)**: Versions 2026-07-04-d and 2026-07-04-e have been removed from WHATS_NEW_SLIDES array and replaced with consolidated 2026-07-04-c and reordered 2026-07-04-d; currently active versions are 2026-07-04-f, 2026-07-04-b, 2026-07-04-c, 2026-07-04-d, and 2026-07-04. Always verify against active list when adding future versions to prevent duplicate messaging and maintain chronological clarity.


**YTM guide sign entry fix (f47b7af)**: The Yield-to-Maturity guide now uses [+/-] sign change button for negative Present Value entry instead of requiring manual sign handling. When modifying YTM or similar financial calculation guides, use the [+/-] button for sign changes to match calculator behavior and prevent user confusion.


**What's New version consolidation (6ebf5a0)**: Versions 2026-07-04-c and 2026-07-04-d have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-04-e, 2026-07-04-f, 2026-07-04-b, and 2026-07-04. Version 2026-07-04-b now consolidates reference cards expansion and P/Y worksheet workflow improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**TVM key display reset after storage (6ebf5a0)**: The BA II Plus TVM calculator now resets the display to 0 after storing a TVM key value to fix sign entry behavior. When modifying TVM storage logic, ensure the display is cleared to allow users to enter negative values correctly on subsequent inputs.


**What's New version consolidation (038617b)**: Versions 2026-07-04-b and 2026-07-04-c have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-04-d, 2026-07-04-e, 2026-07-04-f, and 2026-07-04. Version 2026-07-04 documents TVM reference card, P/Y worksheet workflow, and note formatting improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**TVM and CF storage operator evaluation (038617b)**: TVM and CF calculator storage now evaluates any pending operator before storing the value, ensuring calculations are completed before saving. When modifying calculator storage logic, ensure pending operators are resolved to prevent incomplete calculations from being persisted.


**Reference cards expansion (ca9d6a7)**: Added reference cards to CF (Cash Flow), Amortization, and ICONV (Interest Conversion) calculator sections alongside the existing TVM key reference card. When adding new calculator guide sections or reference materials, ensure consistent formatting and keystroke documentation across all reference cards to support cohesive exam prep experience.


**What's New version consolidation (ca9d6a7)**: Versions 2026-07-04 and 2026-07-04-b have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-04-c, 2026-07-04-d, 2026-07-04-e, 2026-07-04-f, and 2026-07-04. Version 2026-07-04-f documents P/Y worksheet workflow fixes and calculator state clearing on guide step entry. Always verify against active list when adding future versions to prevent duplicate messaging.


**Note newline rendering fix (b92a12e)**: Fixed newline rendering in calculator notes and reference materials to ensure multi-line explanations display correctly. When adding educational content or notes to calculator guides or reference cards, test newline formatting across all screen sizes to prevent text overflow or truncation.


**What's New version consolidation (b92a12e)**: Versions 2026-07-03 and 2026-07-04 have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-04-b, 2026-07-04-c, 2026-07-04-d, 2026-07-04-e, and 2026-07-04-f. Versions 2026-07-04-e and 2026-07-04-f consolidate calculator guide, workflow, and learning mode improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**TVM key reference card (b92a12e)**: Added a Time Value of Money key reference card to the calculator guide system. When enhancing calculator educational materials or reference content, ensure TVM formulas and keystroke sequences are clearly documented alongside their visual representations to support exam prep workflow.


**What's New version consolidation (014868c)**: Versions 2026-07-02-c and 2026-07-03 have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-04, 2026-07-04-b, 2026-07-04-c, 2026-07-04-d, and 2026-07-04-e. Version 2026-07-04-d documents smoother calculator UX with snapshot clearing and improved guide steps. Version 2026-07-04-e consolidates calculator guide strip improvements and button navigation fixes. Always verify against active list when adding future versions to prevent duplicate messaging.


**P/Y worksheet ENTER/down/QUIT behavior (014868c)**: The BA II Plus P/Y worksheet now uses ENTER to save values in place, ↓ (down arrow) to advance to the next field, and QUIT to exit with confirmation dialog. When modifying worksheet navigation or keystroke handling, ensure this three-key pattern is maintained to prevent accidental exits and support intuitive field-by-field editing.


**Guide strip 2ND flag clearing (c33eab6)**: The calculator guide strip now clears the 2ND function flag after completing a keystroke sequence and provides step feedback to the user. When implementing guide strip operations or multi-step keystroke sequences, ensure 2ND state is reset upon sequence completion to prevent lingering mode states from affecting subsequent operations.


**What's New version consolidation (c33eab6)**: Versions 2026-07-02-b and 2026-07-02-c have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-03, 2026-07-04, 2026-07-04-b, 2026-07-04-c, and 2026-07-04-d. Version 2026-07-04-c documents calculator navigation and Learn tab stability fixes. Version 2026-07-04-d documents smoother calculator experience with snapshot clearing from guide steps. Always verify against active list when adding future versions to prevent duplicate messaging.


**Calculator snap clear on guide step open (4a414ab)**: The BA II Plus calculator now clears its snap/position state when opening from a guide step, preventing UI overlap or visual glitches during calculator-assisted learning. When enhancing calculator integration with guide steps, ensure state is reset to prevent lingering visual artifacts.


**What's New version consolidation (4a414ab)**: Versions 2026-07-02 and 2026-07-02-b have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-02-c, 2026-07-03, 2026-07-04, 2026-07-04-b, and 2026-07-04-c. Version 2026-07-04-b and 2026-07-04-c document calculator navigation fixes and Calc Trainer stability improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**Calc Trainer cache refresh on Learn tab entry (caac09d)**: The app now forces a cache refresh when entering the Calc Trainer Learn tab to ensure users always see up-to-date problems and solutions. When modifying Learn tab entry logic or content delivery, maintain this cache-busting behavior to prevent stale educational content.


**IS_2ND_FN guide-strip button fixes (caac09d)**: Fixed IS_2ND_FN guide-strip button rendering and added explanatory notes to improve clarity during calculator practice. When enhancing guide strip buttons or keystroke references, ensure all function labels and navigational logic are properly documented to prevent UI confusion during interactive drills.


**What's New version consolidation (caac09d)**: Versions 2026-07-01 and 2026-07-02 have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-02-b, 2026-07-02-c, 2026-07-03, 2026-07-04, and 2026-07-04-b. Version 2026-07-04 documents cache refresh and Learn tab stability fixes. Version 2026-07-04-b consolidates calculator navigation, drill card design, and stability improvements. Always verify against active list when adding future versions to prevent duplicate messaging.


**BA II Plus calculator button navigation fix (6afbafe)**: Fixed button navigation logic in BA II Plus calculator to ensure keystroke sequences and guide strip references work correctly during interactive calculator practice. When enhancing calculator features or keystroke handling, test button state transitions thoroughly to prevent navigation breakage.


**What's New version consolidation (6afbafe)**: Versions 2026-07-01 and 2026-07-01-f have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-02, 2026-07-02-b, 2026-07-02-c, 2026-07-03, and 2026-07-04. Version 2026-07-03 documents Calc Trainer Learn tab crash fix. Always verify against active list when adding future versions to prevent duplicate messaging.


**Drill card visual consolidation (a4748bb)**: Drill card redesign documented in version 2026-07-02-c now emphasizes color-coded topic headers and improved visual hierarchy. When rendering drill cards, ensure topic-specific colors are applied consistently to headers for better scannability and topic reinforcement across all quiz result summaries.


**What's New version consolidation (a4748bb)**: Versions 2026-07-01-e and 2026-07-01-f have been removed from WHATS_NEW_SLIDES array; new version 2026-07-02-c added documenting clearer drill card design with color-coded topic headers. Currently active versions are 2026-07-01, 2026-07-02, 2026-07-02-b, and 2026-07-02-c. Always verify against active list when adding future versions to prevent duplicate messaging.


**Error boundary for Calc Trainer Learn tab (a4748bb)**: Added `CalcLearnBoundary` React error boundary component to catch and gracefully display errors in the Calc Trainer Learn tab. When enhancing Learn tab features, wrap risky content with this boundary to prevent full app crashes and provide user-facing error messaging with retry capability.


**Calc Trainer Learn tab ReferenceError fix (d6e10ce)**: Fixed crash in Calc Trainer Learn tab that occurred when rendering guide strip or educational content. When enhancing calculator features or guide strip functionality, ensure all component references are defined before render to prevent runtime errors.


**What's New version consolidation (d6e10ce)**: Versions 2026-07-01-d and 2026-07-01-e have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01-f, 2026-07-02, 2026-07-02-b, and 2026-07-02-c. Version 2026-07-02-b now documents Wave 2 social features (Duel Mode, Study Groups, post-quiz learning CTAs, mock scheduler). Always verify against active list when adding future versions to prevent duplicate messaging.


**Wave 2 social features expansion (001c762)**: Duel Mode and Study Groups are now documented in What's New (2026-07-02-b). These features enable head-to-head real-time quiz competition and collaborative study group formation. Reference `DUEL_KEY` and `SG_KEY` localStorage constants when implementing peer competition and group functionality.


**Drill card visual redesign (001c762)**: Drill cards now feature topic-color headers and improved visual hierarchy for better scannability. When rendering drill cards or quiz result summaries, apply topic-specific colors to headers to enhance visual organization and reinforce topic grouping.


**What's New version consolidation (001c762)**: Versions 2026-07-01-c and 2026-07-01-d have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01-e, 2026-07-01-f, 2026-07-02, and 2026-07-02-b. Version 2026-07-02 now documents viral & effectiveness features (progress sharing, analytics). Version 2026-07-02-b now documents Wave 2 social features (Duel Mode, Study Groups). Always verify against active list when adding future versions to prevent duplicate messaging.


**What's New version consolidation (6fd6dec)**: Versions 2026-07-01-b and 2026-07-01-c have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01 (base), 2026-07-01-d, and 2026-07-01-f. Version base 2026-07-01 now documents 5 new study features (post-quiz drill CTA, mock topic breakdown, essay self-assess, mock scheduler, explanation ratings). Always verify against active list when adding future versions to prevent duplicate messaging.


**Daily question tracking (6fd6dec)**: Added `DAILY_Q_KEY` localStorage constant for tracking daily question volume and pacing metrics. Use this constant when persisting daily question counts and calculating user streaks or pace adherence across sessions.


**Wave 2 social features (6fd6dec)**: Added `DUEL_KEY` and `SG_KEY` localStorage constants for competitive duels and study groups respectively. These enable peer-to-peer competition and collaborative study features. Always reference these constants when persisting social/multiplayer state across sessions.


**What's New consolidation (968ec59)**: Versions 2026-07-01 (base) and 2026-07-01-b have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01-c, 2026-07-01-d, and 2026-07-01-f. Verify against active list when adding future versions to prevent duplicate messaging.


**New persistence constants (968ec59)**: Added `MOCK_SCHED_KEY`, `EXP_RATINGS_KEY`, `DAILY_Q_KEY`, `DUEL_KEY`, and `SG_KEY` localStorage keys for mock scheduling, explanation ratings, daily question tracking, competitive duels, and study group features respectively. Always reference these constants when persisting viral/effectiveness feature state.


**Mock topic breakdown function (968ec59)**: `getMockTopicBreakdown(qs, ans, qTimes)` analyzes quiz performance by topic, returning sorted array with `topic`, `pct` (accuracy %), `total` (question count), and `avgSecs` (average time). Topics sorted by accuracy (weakest first). Use after quiz completion to populate post-quiz drill CTAs and mock exam analytics.


**Explanation ratings system (bc4879a)**: Users can now rate explanations via `EXP_RATINGS_KEY` localStorage. When rendering explanations or feedback sections, ensure rating UI is accessible and ratings persist across drill sessions.


**Essay self-assessment & mock scheduler (bc4879a)**: New UX enhancements include essay self-assessment tools and a mock exam scheduler. When building practice features, reference `MOCK_SCHED_KEY` and `EXP_RATINGS_KEY` localStorage constants for persisting mock schedules and explanation ratings across sessions.


**Mock topic breakdown & drill post-quiz CTA (bc4879a)**: Quiz completion now triggers a post-quiz drill CTA and generates a mock topic breakdown showing accuracy % and avg seconds per topic. When rendering quiz results or follow-up drills, include `getMockTopicBreakdown(qs, ans, qTimes)` to display weakest topics first sorted by accuracy.


**BA II Plus calculator interactive guide strip (v402615b)**: Calculator Trainer now includes an interactive guide strip displaying keystroke sequences and step-by-step function guides (amortization, ICONV, etc.). When rendering calculator features, ensure guide strip is accessible during drills to provide real-time reference support.


**What's New version 2026-07-01-e and 2026-07-01-f removed (latest consolidation)**: Both versions removed from WHATS_NEW_SLIDES array; currently active versions are base 2026-07-01, -c, and -d. Version -d now consolidates calculator guide, lofi vibes, and pacing chip floor-hiding logic. Always verify against active WHATS_NEW_SLIDES list to prevent duplicate messaging.


**More menu item restoration (97d2f14)**: More menu restored to 12 items after accidental reduction to 8 items in v22c8816. When rendering More menu or overflow navigation, maintain the 12-item list as the canonical structure to avoid losing core utility shortcuts.


**More menu item reduction (v22c8816)**: More menu trimmed from 13 to 8 items by removing redundant navigation shortcuts. When rendering the More menu or overflow navigation, ensure only core utility items are displayed and duplicate shortcuts are excluded to reduce menu bloat.


**What's New version consolidation (2026-07-01-b and -e removed)**: Versions 2026-07-01-b and 2026-07-01-e have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01 (base), 2026-07-01-c, 2026-07-01-d, and 2026-07-01-f. Versions -c and -d have been re-added in reverse chronological order. Always verify against active list to prevent duplicate messaging when consolidating announcements.


**What's New version consolidation (2026-07-01-b re-added)**: Versions 2026-07-01-b, -c, -e, and -f are now active in WHATS_NEW_SLIDES array (with -b and -c re-added in latest consolidation). Version -b now documents lofi player (4 vibes, reverb, melody, visualizer), Q/day pacing, interactive Readiness, and Calc Trainer light-mode fixes. Always verify against active list to prevent duplicate messaging.


**Pacing chip floor hiding (v443171b)**: Pacing chip now hides the misleading floor indicator when users are ahead of pace. When rendering pacing guidance, check if user's actual progress exceeds needed pace and conditionally hide floor display to avoid confusing "catch-up" messaging for ahead-of-schedule users.


**Pacing chip metric now Qs/day**: Pacing guidance switched from sessions/day to questions/day display. When rendering study targets or pace calculations, always display questions per day for clarity on daily question volume targets rather than session counts.


**What's New version 2026-07-01-b and 2026-07-01-c removed**: Both versions have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01 (base), 2026-07-01-d, and 2026-07-01-f. When adding future versions, verify against active list to prevent duplicate messaging across consolidated announcements.


**Lofi player vibes & controls finalized**: Study sessions feature a fully enhanced lofi player with 4 distinct vibes (selectable moods), reverb effects, melody toggle, and live visualizer. When building or updating ambient study features, ensure all 4 controls are accessible and state persists across drill sessions.


**BA II Plus calculator interactive guide strip (v2026-07-01-g)**: Calculator now includes an interactive guide strip with expanded amortization guides and ICONV function documentation. When rendering calculator features or enhancing financial tools, reference the guide strip UI pattern for contextual help on complex functions.


**Readiness screen pills and drill navigation**: Module pills on Readiness cards are now fully interactive—tapping them navigates directly to focused drills. When updating Readiness card layout, ensure pill taps and drill CTAs are consistently wired across all card types (weak topics, leech, etc.).


**Pacing chip metric finalized (Questions/day)**: Pacing chip now exclusively displays `neededQsPerDay` (questions required daily to meet deadline) instead of sessions/day. When rendering pacing guidance or updating pace UI, always use Q/day metrics for clarity on daily study targets.


**What's New version consolidation (2026-07-01-f active)**: Versions 2026-07-01 (base) and 2026-07-01-b have been removed from WHATS_NEW_SLIDES array; currently active versions are 2026-07-01-c, 2026-07-01-d, and 2026-07-01-f. Version -f documents Questions/day pacing metric, interactive Readiness screen, and display bug fixes. When adding future versions, check active list to avoid duplicate messaging.


**Lofi player enhancements (v2026-07-01-e)**: Study sessions now include a lofi player with 4 vibes, reverb control, melody toggle, and real-time visualizer for ambient focus. When building focus or ambient study features, reference lofi player state in session rendering to provide audio accompaniment options.


**Pacing chip metric expansion (Questions/day)**: `getPaceStatus()` now returns `avgQsPerDay` (average questions studied per day) and `neededQsPerDay` (questions required daily to meet exam deadline). When rendering pacing guidance or updating pace calculations, use both session metrics and Q/day metrics together for comprehensive retaker pacing UI.


**What's New version 2026-07-01-e (added)**: This version documents interactive Readiness dashboard (tappable module pills and drill buttons), smarter pacing for retakers with vignette scenario panel, and lofi player enhancements (4 vibes, reverb, melody, visualizer). Currently active versions are -b, -c, and -e in WHATS_NEW_SLIDES array.


**What's New versions 2026-07-01-e and 2026-07-01-f removed**: Both versions removed from WHATS_NEW_SLIDES; currently active versions are base 2026-07-01, -c, and -d. Version -d documents pacing chip, Power Pro tier, and peer percentile features. Check WHATS_NEW_SLIDES for active versions to avoid duplicate messaging.


**Readiness screen interactivity (drill buttons)**: All Readiness cards now feature tappable module pills and drill CTAs that navigate directly to drills. When updating Readiness card layout or navigation, ensure both pill taps and drill buttons are consistently clickable across all card types.


**Pacing chip metric shift (Questions/day)**: Pacing chip now displays Questions/day instead of Sessions/day. `getPaceStatus()` now calculates `avgQsPerDay` and `neededQsPerDay` alongside session metrics. When rendering pacing guidance or updating pace calculations, use Q/day metrics for retaker-focused pacing UI.


**What's New version 2026-07-01-c (re-added)**: This version documents pacing chip & vignette scenario panel, pass probability percentile tracking, and leech card light-mode display fix. Currently active versions are -b, -c, -d, and -f. When consolidating What's New announcements, check WHATS_NEW_SLIDES array for active versions to avoid duplicate messaging.


**Readiness screen interactivity (recent)**: Readiness screen now features tappable module pills and drill buttons on all cards, allowing users to jump directly into drills from the Readiness view. When updating Readiness card rendering or navigation, ensure module pills are clickable and drill CTAs are consistently placed across all card types.


**40-question trial limit & peer percentile**: Free trial allows 40 questions with peer percentile benchmarking. When building trial gate or percentile display, ensure `QUALITY_FLAGS_KEY` and trial counter are properly tracked in localStorage to gate premium features.


**Power Pro tier & quality flags system**: Premium features gated by Power Pro upgrade; quality flags mark highest-caliber practice questions. When rendering question cards or trial limitations, reference Power Pro status and apply quality flag badges to premium content.


**Pacing chip & vignette scenario panel (v2026-07-01-b)**: Retaker-focused UI elements help users study at exam-realistic speed and understand vignette formats. When rendering Drill sessions for retakers (check `RETAKER_KEY`), ensure pacing chip and scenario panel are visible to guide pace and context.


**What's New ordering convention**: Versions are prepended at `// WN_START` marker in reverse chronological order of re-addition. When consolidating or re-adding versions, insert at the top of the array to ensure newest/most-relevant announcements appear first to users.


**What's New version 2026-07-01-b (re-added)**: This version documents persona gap features (retaker pre-seeding, pacing chip, vignette scenario panel), pass probability delta tracking, and Power Pro tier with quality flags system. Currently active versions are -b, -e, and -f in WHATS_NEW_SLIDES array.


**What's New version 2026-07-01 (consolidated base version)**: This canonical version documents Drill enhancements (slide animations, XP pops, swipe hints, weak spot pills, pass probability advice), session summary with streak tracking, and pass probability delta metrics. Versions -b and -c have been removed; only -d, -f, and base 2026-07-01 are active. Always check WHATS_NEW_SLIDES array for active versions to avoid duplicate messaging.


**Growth levers constants (v2026-07-01 complete)**: Three localStorage keys manage persona-driven features: `ONBOARDING_KEY` (onboarding gate), `QUALITY_FLAGS_KEY` (quality flags system), and `RETAKER_KEY` (retaker pre-seeding). When building onboarding, trial limits, or retaker-specific UX, reference these keys to gate features appropriately. `RETAKER_KEY` specifically enables retaker-focused guidance (pacing chip, vignette scenario panel) during onboarding flow.


**What's New versions 2026-07-01 and 2026-07-01-b removed**: Base and -b versions have been removed from WHATS_NEW_SLIDES; currently -c, -d, and -f are active. When creating future versions, consolidate overlapping announcements and prepend at `// WN_START` marker with emoji-led, tip-driven format.


**What's New version 2026-07-01-f (re-added)**: This version has been restored to WHATS_NEW_SLIDES array and documents Drill session improvements (pass probability advice, weak spot indicators, XP animations), Sessions card streak tracking, and Safari < 16 acronym compatibility fixes. Always check active versions when building related features.


**Persona gap features (latest)**: Recent update adds retaker pre-seeding, pacing chip UI, and vignette scenario panel for personalized exam prep paths. When building retaker onboarding or scenario-based learning flows, check `RETAKER_KEY` and ensure pacing guidance and scenario context are visible.


**Growth levers constants (v2026-07-01)**: Three new localStorage keys manage persona-driven features: `ONBOARDING_KEY` (onboarding gate), `QUALITY_FLAGS_KEY` (quality flags system), and `RETAKER_KEY` (retaker pre-seeding). When building onboarding, trial limits, or retaker-specific UX, reference these keys to gate features appropriately and track user progression.


**What's New version 2026-07-01-e & 2026-07-01-f**: Both versions now document Drill enhancements (slide animations, swipe hints, XP pops, weak spot pills, pass probability advice) and acronym expansion. Previous versions 2026-07-01 (base) have been removed. Always check WHATS_NEW_SLIDES array for active versions when building related features.


**Session summary & streak tracking (v2026-07-01)**: Study Reels sessions now display session summaries and streak counts on the Sessions card. When rendering session feedback or streak UI, ensure pass probability delta, session metrics, and streak indicators are visible to reinforce progress and engagement.


**Growth levers & onboarding gate (v2026-07-01)**: New `ONBOARDING_KEY` and `QUALITY_FLAGS_KEY` constants manage five growth features: onboarding gate, 40-question trial limit, peer percentile tracking, quality flags system, and Power Pro tier. When building onboarding or trial-related UI, reference these keys to gate features appropriately and track user progression through the trial funnel.


**Trap cards rule & context display**: Trap cards now display both the rule being tested and the trap context together on the card. When rendering trap card content, ensure rule section and trap explanation are visible side-by-side. Cards must fill the screen properly without content cutoff—test on various viewport sizes.

**Trap card learning moments**: Trap answer cards now consistently display the relevant rule and full context together so learners understand exactly why an answer is a trap. This design principle turns every wrong answer into an intentional learning moment—ensure trap card content always pairs the tested rule with the common pitfall explanation.



**Drill UI enhancements (v2026-07-01-f complete pack)**: Drill cards now feature smooth slide animations on swipe, XP pop-up animations, swipe hint UI (guiding next action), weak spot pill badges, and pass probability advice. When updating Drill card rendering or interaction logic, maintain consistency with these micro-interaction patterns for cohesive user experience.


**What's New versions 2026-07-01-d and 2026-07-01-e removed**: These versions have been removed from WHATS_NEW_SLIDES array; only versions -b, -c, and -f are retained. The 2026-07-01-c version (newly re-added) documents acronym expansion, Drill tab rename, and Safari compatibility fixes. Always check the active versions in WHATS_NEW_SLIDES when building related features to avoid duplicate messaging.


**What's New version 2026-07-01-c removed**: This version has been removed from WHATS_NEW_SLIDES array; only versions -b, -d, and -e are retained. Consolidate overlapping feature updates into single canonical versions to avoid redundant slides.


**What's New version 2026-07-01-f removed**: This version has been removed from WHATS_NEW_SLIDES array; only versions -b, -d, and -e are retained. When creating future versions, prepend at `// WN_START` marker with emoji-led, tip-driven format and avoid duplicating feature announcements across versions.

**What's New version 2026-07-01-e & 2026-07-01-f removed**: Both versions have been removed from WHATS_NEW_SLIDES array; only versions -b, -c, and -d are retained. Version 2026-07-01 (base) now serves as the primary announcement for Drill feature launch and trap card improvements. Always check WHATS_NEW_SLIDES when building related features to maintain accurate messaging.



**`expandAcroyms()` Safari < 16 compatibility**: Function now uses word-boundary regex (`\b`) instead of lookbehind (`?<!`) because Safari < 16 throws SyntaxError on negative lookbehind. For acronyms with non-word characters (P/E, M&A), falls back to space/start anchor patterns. Always use this function when rendering Drill card content to avoid Safari breakage.


**Drill enhancement pack (v2026-07-01-f)**: Recent update adds slide animation, swipe hint UI, XP pop animations, weak spot pill badges, and pass probability advice to Drill cards. When building or updating Drill UI, reference these enhancements for consistent micro-interaction patterns and visual feedback.


**`CFA_ACRONYMS` constant**: Object mapping ~90 CFA exam acronyms (EAR, WACC, FCF, etc.) to full forms across quantitative methods, finance, accounting, portfolio management, and economics. Used by `expandAcronyms()` to automatically expand acronyms in UI text. When building new UI that displays CFA terminology, call `expandAcronyms(text)` to ensure acronyms are expanded.


**`expandAcronyms()` function**: Takes text string and returns it with CFA acronyms replaced by their expanded forms using word-boundary regex. **Important**: Uses `\b` word boundaries (not lookbehind) for Safari < 16 compatibility. For acronyms with non-word chars (e.g., P/E, M&A), falls back to space/start anchor patterns. Always call this when rendering Drill card content, questions, or explanations.


**`expandAcronyms()` function**: Takes text string and returns it with CFA acronyms replaced by their expanded forms (e.g., "WACC" becomes "WACC (Weighted Average Cost of Capital)"). Uses word-boundary regex to avoid replacing acronyms that are part of longer words or URLs. Always call this function when rendering Drill card content, questions, or explanations to enhance learner comprehension.


**`CFA_ACRONYMS` constant**: Object mapping CFA exam acronyms (e.g., "EAR", "WACC", "FCF") to their full forms. Used by `expandAcronyms()` function to automatically expand acronyms in Drill card text. When building new UI that displays CFA terminology, call `expandAcronyms(text)` to ensure acronyms are expanded for learner clarity. Currently covers ~90 common CFA acronyms across quantitative methods, finance, accounting, and portfolio management.


**Drill feature (formerly Study Reels)**: The micro-learning feature has been renamed from 'Study Reels' to 'Drill' in navigation and user messaging. Uses `REEL_TOPIC_COLORS` constant for topic-consistent visual styling. When referencing this feature in new updates or features, use 'Drill' as the primary label and describe it as TikTok-style vertical swipe micro-learning for bite-sized concept review.

**Drill enhancement pack (v2026-07-01-d)**: Latest update adds smooth slide animations on swipe, XP pop-up animations, swipe hint UI guiding next action, weak spot pill badges indicating review-needed topics, and pass probability advice. When building or updating Drill UI, reference these enhancements for consistent micro-interaction patterns and visual feedback.



**What's New version 2026-07-01-f**: Latest version documents Drill feature (TikTok-style vertical swipe micro-learning renamed from Study Reels) with bite-sized concept drills. Versions 2026-07-01 and 2026-07-01-f have been removed from WHATS_NEW_SLIDES array; only -b, -d, and -e are retained. When creating future versions, prepend at `// WN_START` marker with emoji-led, tip-driven format.


**What's New version 2026-07-01-d**: Documents Study Reels (now Drill tab), BA II Plus Calculator Guide in Learn tab, and Flexible Mock Exam Builder multi-topic/module selection. Versions 2026-07-01-e and 2026-07-01-f have been removed from WHATS_NEW_SLIDES array. When creating future versions, prepend at `// WN_START` marker with emoji-led, tip-driven format.


**Study Reels renamed to Drill**: The Study Reels feature (TikTok-style vertical swipe micro-learning feed) is now accessed via a 'Drill' nav tab. Removed redundant Quick Drill entry point from More menu. When referencing this feature in future updates, use 'Drill' as the primary nav label.


**What's New version 2026-07-01-c**: Latest version documents Calculator Trainer Learn tab keystroke guides and flexible Custom Mock multi-topic/multi-module selection. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**`REEL_TOPIC_COLORS` constant**: Object mapping CFA topic names to hex color codes for Study Reels feature. Always reference this map when building reel UI to ensure topic-consistent coloring. Topics include Ethics, Quantitative Methods, Economics, FSA, Corporate Issuers, Equity, Fixed Income, Derivatives, Alternatives, Portfolio Management, Behavioral Finance, Capital Market Expectations, Asset Allocation, Alternative Investments, Risk Management, and Trading & Performance.


**What's New version 2026-07-01-b**: Documents Learn Calculator tab keystroke guides and Deep Study guide redesign. Older versions 2026-07-01-c and 2026-07-01-d have been removed from WHATS_NEW_SLIDES array; only -b and -e are now retained.


**Study Reels feature**: New TikTok-style vertical swipe micro-learning feed. Uses `REEL_TOPIC_COLORS` constant (object mapping topic names to hex color codes) for visual styling. When building reels, always reference this color map for topic-consistent UI.


**What's New version 2026-07-01-e**: Latest version documents Deep Study guide redesign and comprehensive Learn tab improvements. Older versions 2026-07-01-b and 2026-07-01-c have been removed from WHATS_NEW_SLIDES array; only -d and -e are retained. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**What's New version 2026-07-01-e**: Latest version documents Deep Study guide redesign and comprehensive Learn tab improvements. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**What's New version 2026-07-01-d**: Latest version documents leech card graduation fix, smarter AI coach guidance, and completes calculator on SR review. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**What's New version 2026-07-01-c & 2026-07-01-d**: Latest versions document smarter AI coach guidance, leech card graduation bug fix, and calculator on SR review. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**What's New version 2026-06-30-f & 2026-07-01**: Latest versions document AI debrief reliability improvements, formula display fixes, and calculator addition to SR review. When creating future slides, follow the same emoji-led, tip-driven format and always prepend new versions at the `// WN_START` marker.


**What's New slides versioning**: WHATS_NEW_SLIDES is a versioned array with `version` (e.g. "2026-06-30", "2026-06-30-b") and `slides` array. Versions with `-b`, `-c` suffixes are refinements of the same date. New versions are prepended at `// WN_START` marker. Use concise, emoji-led titles and actionable tip text; avoid vague marketing language.


- **Creator:** GSP (initials). Never use "Praneeth" in user-facing strings — it was replaced.
- **Admin email:** `sai.praneeth557@gmail.com` (functional only — auth gating, never displayed to users)
- **Contact / support email:** `gspbuilds@gmail.com`
- **Live URL:** https://praneethgollamudi.github.io/ClearCFA/

## Supabase Infrastructure

**Study Reels feature architecture**: TikTok-style vertical swipe micro-learning feed using `REEL_TOPIC_COLORS` for visual styling. Reels are accessed via nav tab and provide bite-sized concept review. When building reel screens, reference the color map for consistent topic-branded backgrounds.


**`buildQuestionPrompt()` multi-module support**: Now accepts optional `multiModuleList` parameter (array of `{t, st}` objects for topic and module). When provided, questions are generated across all listed modules with each question specifying which module it covers. Prompt header dynamically adjusts to show all selected modules. Always pass `multiModuleList` from Custom Mock setup when user selects multiple topics/modules.


**Multi-topic/module question generation**: `buildQuestionPrompt()` now accepts optional `multiModuleList` parameter (array of `{t, st}` objects for topic and module). When provided, questions are generated across all listed modules with each question specifying which module it covers. Always pass `multiModuleList` from Custom Mock setup when user selects multiple topics/modules.


**`supabaseCreateAccount()` return format**: Now returns an object `{ok, status, error}` instead of boolean. On success: `{ok:true, status:res.status}`. On failure: `{ok:false, status:res.status, error:errText}`. Always check `res.ok` in calling code and handle error cases with status/error details for better UX.


**`supabaseCreateAccount()` error handling**: Now returns an object `{ok, status, error}` instead of a boolean. On failure, includes HTTP status and error text for better debugging of sign-up connection issues. Always check `res.ok` and handle error cases gracefully in calling code.


**`admin-stats` cost metrics**: The admin dashboard now tracks real token counts from Anthropic API responses instead of estimates, providing accurate cost attribution per user and per question type. Token data is logged during `ai-proxy` calls and aggregated in the dashboard.


**Admin stats edge function update**: `admin-stats` now accepts `userId` in the request body in addition to `accessToken` (which may be `undefined` for password-based logins). The function uses `userId` as a fallback for auth when `accessToken` is missing.


- **Project ref:** `uucxyuqxqjpbxecemdvf`
- **Supabase URL:** `https://uucxyuqxqjpbxecemdvf.supabase.co` (hardcoded in `src/app.jsx` line ~17)
- **Anon key:** hardcoded in `src/app.jsx` line ~18 (safe to be public — RLS enforced)
- **Service role key / PAT:** stored as `SUPABASE_ACCESS_TOKEN` in GitHub Actions secrets

### Edge Functions (in `supabase/functions/`)

**Learn Calculator tab keystroke guides**: Calc Trainer now includes a Learn tab with BA II Plus keystroke guides alongside practice problems. Keystroke guides should be structured as step-by-step sequences with specific key notation (e.g., `[2nd]`, `[×]`, `[Enter]`) to build exam-day muscle memory.


**AI coach quality improvements**: Both AI coach implementations (question-specific and concept-based) now provide more targeted, exam-prep-focused explanations. Ensure prompts emphasize exam relevance and practical application when updating coach behavior in future sessions.


**Leech card graduation fix**: Spaced repetition now correctly advances 'leech' cards (frequently-reviewed difficult items) to graduation after consecutive correct answers. The algorithm no longer gets stuck when marking these cards as correct—track graduation state properly even for high-review-count items.


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

**Custom Mock multi-selection**: Users can now select multiple topics and/or multiple modules when creating a Custom Mock exam. The question generator spreads questions across all selected modules and labels each question with its source module.


**Calculator Trainer with Learn tab**: A new Calc Trainer feature includes a Learn Calculator tab with BA II Plus keystroke guides. This is a permanent study tool—do not remove without user migration.


**Learn tab redesigned**: The Learn tab is now a comprehensive Deep Study guide organizing CFA content into a structured learning path. This replaces scattered lessons with systematic, cohesive preparation. Do not remove or significantly alter this tab structure without migration plan.


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
| `src/utils.js` | ~907 | Pure utility functions — React destructure, data getters, auth, SM-2, dedup, prompts, analytics, pass probability. No JSX. |
| `src/calculator.jsx` | ~552 | `CFACalculator` component only. Uses `C.*` inside JSX (safe — resolved at render time after C is defined in app.jsx). |
| `src/app.jsx` | ~12,000 | App constants, `C` design tokens definition, `WHATS_NEW_SLIDES`, all other components, `CFAMock`, screens, `ToastManager` |

### src/app.jsx Structure (top to bottom)

| Lines | Contents |
|-------|----------|
| ~1–170 | App constants (storage keys, exam date, pricing) + `C` design tokens definition |
| ~170–1000 | Small components (`Badge`, `StatCard`, `ScoreRing`, etc.) + formula/revision helpers + `callAIChat` |
| ~1000–2200 | `UpgradeModal`, `FeedbackModal`, `LessonSection`, `RevisionScreen` |
| ~2200–3300 | `SlideOverlay`, `StudyPathScreen`, `FixToPassScreen`, `LofiPlayer`, `ReferralCard`, `WeaknessRadar` |
| ~3300–12000 | `CFAMock` — main component (all state, effects, screen renders, `CALC_GUIDES`) |
| ~12000+ | `ToastManager` |

### src/utils.js contents (top to bottom)

| Lines | Contents |
|-------|----------|
| ~1 | React destructure (`useState`, `useEffect`, etc.) |
| ~7–11 | Level-aware data getters (`getActiveLOS`, `getMisconceptions`, etc.) |
| ~14–46 | Supabase/AI constants (`SUPABASE_URL`, `SUPABASE_KEY`, `AI_PROXY_URL`) |
| ~47–146 | Auth helpers + Google login |
| ~147–908 | SM-2, dedup, prompts, analytics, pass probability, pace, `getMockTopicBreakdown` |

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

- **What's New version ordering**: Recent consolidation removed versions 2026-07-12-b and 2026-07-12-c; currently active are 2026-07-12, 2026-07-12-d, 2026-07-12-e, 2026-07-12-f. When adding future versions, verify against the WHATS_NEW_SLIDES array to prevent duplicate feature announcements across versions.


- **paceStatus declaration order**: The `paceStatus` variable must be declared before use in render logic to avoid blank page errors. Always declare persona-dependent state variables early in component logic, before conditional rendering that depends on them.


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

### Screens (19 total)
`adminDashboard`, `apiKey`, `backup`, `calcTrainer`, `dashboard`, `home`, `losCoverage`, `masteryGrid`, `quiz`, `readiness`, `reels`, `results`, `review`, `revision`, `setup`, `srReview`, `studyPath`, `studyPlan`, `walkthrough`

### activeTab map (current)
```
{home:"home",setup:"practice",quiz:"practice",srReview:"drill",reels:"drill",
        results:"practice",revision:"practice",studyPath:"practice",
        dashboard:"progress",readiness:"progress",losCoverage:"progress",
        masteryGrid:"progress",calcTrainer:"drill",adminDashboard:"home"}
```

### Storage keys
| localStorage value | Constant |
|---|---|
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
| `cfa_onboarding_v1` | `ONBOARDING_KEY` |
| `cfa_quality_flags_v1` | `QUALITY_FLAGS_KEY` |
| `cfa_retaker_v1` | `RETAKER_KEY` |
| `cfa_mock_sched_v1` | `MOCK_SCHED_KEY` |
| `cfa_exp_ratings_v1` | `EXP_RATINGS_KEY` |
| `cfa_daily_q_v1` | `DAILY_Q_KEY` |
| `cfa_duel_v1` | `DUEL_KEY` |
| `cfa_study_group_v1` | `SG_KEY` |
| `cfa_push_sub_v1` | `PUSH_SUB_KEY` |
| `cfa_level_v1` | `CFA_LEVEL_KEY` |

### Build
Cache version: `app.js?v=1802200000` (increment by 100000 before each commit)
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

**What's New version consolidation (f144a3e)**: Versions 2026-07-06-b and 2026-07-06-c have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-06-d, 2026-07-07, 2026-07-07-b, 2026-07-07-c, and 2026-07-08. Version 2026-07-07-c consolidates per-session LOS coverage tracking, delta bar readiness visualization, and same-day question repeat prevention. Always verify against active list when adding future versions to prevent duplicate messaging.

**Admin dashboard growth/retention metrics (f144a3e)**: Admin dashboard now includes growth and retention metrics alongside MRR (Monthly Recurring Revenue) for monitoring business health. When implementing new admin features or metrics, ensure analytics data integrates cleanly with existing dashboard state management to provide real-time visibility into subscription trends.

**Essay grading state management (2783ae0)**: Essay questions now support grading state with `essayGrades` and `essayGrading` state variables tracking grade values and grading-in-progress status. When implementing essay grading features or modifying essay answer tracking, ensure grading state is properly persisted alongside answer and reveal state to maintain consistency across sessions.

**Topic mastery toast on 70% accuracy threshold (1ee95d3)**: The app now displays a celebratory toast notification when a topic's accuracy first crosses 70%, providing positive reinforcement for user progress. When modifying accuracy calculations or toast triggers, ensure the 70% threshold is evaluated per-topic and fires only on the first upward crossing to avoid duplicate notifications.

**Essay grading state management (1ee95d3)**: Essay answer grading now uses separate `essayGrades` and `essayGrading` state objects to track graded responses and in-flight grading operations. When implementing essay grading features or persisting essay state, ensure both state objects are properly managed and synced with localStorage to maintain grading history and prevent duplicate submissions.

**Daily wrong-answer review panel (adae950)**: App now provides a daily wrong-answer review panel that surfaces questions answered incorrectly across all sessions on the current date. When adding session review features or question filtering, ensure wrong answers are aggregated per-day and made easily accessible for targeted review.

**Topic mastery celebrations (adae950)**: When topic accuracy first crosses 70% threshold in a session, a celebration toast notification is triggered to acknowledge the milestone. When modifying accuracy tracking or progress celebrations, ensure the 70% threshold is checked on first-cross only (not on subsequent re-entries) to avoid duplicate celebratory messaging.

**Exam topic weight guardrails (12c12a3)**: TOPIC_WEIGHTS constant now defines min/max question weight ranges per topic across Level 1, 2, and 3. When generating multi-topic sessions, enforce these ranges to ensure exam-realistic topic distribution. Validate generated question counts against the appropriate level's weight constraints before returning question set.

**LOS source badge on questions (12c12a3)**: Questions now display a source badge indicating the Learning Outcome they test. When rendering question cards, ensure the LOS badge is visible and properly formatted to help users understand coverage and traceability.

**Daily wrong-answer review panel (adae950)**: New screen/component surfaces user's most recent incorrect answers in a dedicated daily review panel. When modifying question history or session results, ensure wrong answers are accessible and sortable by recency to support focused error remediation workflows.

**Topic mastery 70% accuracy milestone (1ee95d3)**: App now detects when a topic's accuracy first crosses 70% and triggers a celebration toast notification. When updating performance metrics or accuracy calculations, ensure milestone detection fires only on the first crossing per topic to avoid duplicate celebrations.

**What's New version consolidation (12c12a3)**: Versions 2026-07-07-b, 2026-07-07-c, 2026-07-08 have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-11, 2026-07-11-b, 2026-07-11-c, 2026-07-11-d, and 2026-07-11-e. Version 2026-07-11-e announces daily wrong-answer review panel. Always verify against active list when adding future versions to prevent duplicate messaging.

**Exam topic weight guardrails (3129d2d)**: TOPIC_WEIGHTS constant now defines acceptable exam weight ranges for each topic by CFA level (L1, L2, L3). When generating questions or validating exam simulation coverage, ensure selected topics remain within these guardrail ranges to maintain exam-realistic distributions.

**Daily wrong-answer review panel (adae950)**: New feature surfaces most recent incorrect answers in a focused daily review view. When modifying question history or answer tracking, ensure wrong answers are timestamped and accessible via dedicated review interface to support immediate error reinforcement.

**Topic mastery celebration at 70% accuracy (1ee95d3)**: App now displays a celebration toast when per-topic accuracy first crosses 70% threshold. When modifying accuracy calculations or topic performance tracking, ensure milestone detection triggers once per topic per session to avoid duplicate celebrations.

**LOS source badge on questions (12c12a3)**: Questions now display source badge indicating their LOS origin. When rendering question cards or modifying question metadata display, ensure LOS source attribution is visible to support learning outcome transparency.

**LOS source badges and exam topic weight display (90e0fa3)**: Questions now display their Learning Outcome Statement (LOS) source and exam topic weightings. When modifying question rendering or adding new question metadata fields, ensure LOS badges and weight percentages are consistently displayed to help users align study priorities with official exam weightings.

**AI Study Notes generator (90e0fa3)**: Revision screen notes tab now includes an AI-powered study notes generator. When adding or modifying note-taking features, ensure the generator integrates with existing note display logic and respects user-generated notes storage without overwriting manual entries.

**Pass probability explainability drawer (3129d2d)**: New explainability drawer breaks down probability reasoning behind incorrect answers, showing step-by-step logic for where reasoning diverged. When modifying answer feedback or explanation systems, ensure probability insights are correctly calculated and clearly surfaced after wrong answers to support targeted misconception correction.

**Exam-Weight Mock sessions pass trend and module readiness (02e6aca)**: Exam-Weight Mock sessions now properly credit module readiness progression and pass trend analytics when users complete 18-question sessions. When modifying mock session completion logic or analytics tracking, ensure Exam-Weight sessions update both topic mastery and pass probability trends identically to standard sessions.

**What's New version consolidation (02e6aca)**: Versions 2026-07-12 and 2026-07-12-b have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, 2026-07-12-f. Version 2026-07-12-f announces Exam-Weight Mock sessions, AI Study Notes, and Challenge Mode toggleability. Always verify against active list when adding future versions to prevent duplicate messaging.

**AI resilience tuning (9ac45b3)**: callClaude now uses 4 retry attempts (increased from 2) with 6000ms retry delay (decreased from 8000ms) and removes duplicate wait logic on rate limit. When troubleshooting AI feature timeouts or rate limits, verify retry parameters match these defaults.

**Daily Question user isolation (c312adf)**: DAILY_Q_KEY state is now initialized as `null` and populated per-user in the authUser effect to prevent question leakage between users on shared devices. When modifying daily question logic or user switching, ensure dailyQ state is cleared/reset on auth changes to maintain user isolation.

**AI retry resilience increase (9ac45b3)**: AI request handling now retries up to 4 times before failing (increased from previous count). When implementing or debugging AI explanation features, expect automatic retries on rate limits or transient failures; do not double-wait on rate limit responses.

**What's New version consolidation (9ac45b3)**: Versions 2026-07-12-c and 2026-07-12-d have been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12, 2026-07-12-b, 2026-07-12-c, and 2026-07-12-e. Version 2026-07-12-c now announces AI retry resilience improvements. Always verify against active list when adding future versions to prevent duplicate messaging.

**AI retry resilience enhancement (9ac45b3)**: AI request handling now retries up to 4 times with improved rate-limit handling before failing. When implementing or modifying AI features (explanations, quiz generation), ensure retry logic respects this pattern to maximize reliability during peak usage.

**Daily Question user isolation fix (c312adf)**: Daily Question state is now initialized per-user in authUser effect rather than from localStorage during component mount. When modifying daily question functionality or user switching logic, ensure DAILY_Q_KEY state is cleared/reinitialized on auth changes to prevent cross-user data leakage.

**Push subscription save fix (c312adf)**: Web push subscription storage has been corrected to properly persist subscription state. When implementing push notification features, verify that subscription state persists across sessions without data corruption.

**Topic name normalization for weight warnings (c7eb31d)**: Equity and Alternatives topic names are now normalized in weight distribution validation. When adding or modifying topic weighting logic, ensure topic names match normalized values to prevent weight validation failures.

**What's New version consolidation (c60895f)**: Version 2026-07-12 has been removed from WHATS_NEW_SLIDES; currently active versions are 2026-07-12-b, 2026-07-12-c, 2026-07-12-d, 2026-07-12-e, and 2026-07-12-f. Version 2026-07-12-f announces AI retry resilience and consistent topic label normalization. Always verify against active list when adding future versions to prevent duplicate messaging.

**Leaderboard SQL UUID casting (c60895f)**: Leaderboard queries now cast UUID columns to text explicitly in JOIN conditions (e.g., `s.user_id::text`, `ou.user_id::text`) to fix type mismatches between uuid and text columns. When querying user_id across sessions and leaderboard tables, ensure consistent casting to prevent PostgreSQL join failures.

**Leaderboard SQL type casting (78e568c & c60895f)**: Leaderboard queries now explicitly cast `sessions.data` to `jsonb` and `user_id` to `text` in joins to fix type mismatches. When querying sessions or joining user IDs in SQL functions, ensure explicit type casting is applied to prevent deployment failures on strict type checking.

**Push subscriptions user_id type migration (7b7229f)**: push_subscriptions.user_id column has been converted from UUID to TEXT to support both Supabase auth UUIDs and password-based users (64-char SHA-256 hex strings). RLS policy must be dropped BEFORE altering the column it depends on. FK constraint is removed; access is now gated entirely by the save-push-sub edge function (service role).

**Leaderboard SQL type casting fixes (78e568c, c60895f)**: Leaderboard function now explicitly casts sessions.data to jsonb and joins opted_users.user_id as text to handle mixed UUID/text user_id types. When querying across auth and password-based user sessions, ensure proper type casting to prevent join failures.

**Supabase RLS policy idempotency (b423020, 7b7229f)**: All RLS policy creation statements must be preceded by `DROP POLICY IF EXISTS` to ensure migrations can be safely re-run without conflicts. When adding or modifying RLS policies, always drop them first before creating to maintain deployment pipeline stability.

**Push subscriptions user_id type conversion (7b7229f)**: push_subscriptions.user_id column is now TEXT to support both Supabase auth UUIDs and password-based users (SHA-256 hex strings). When modifying push subscription schema or access control, drop dependent RLS policies BEFORE altering the column type to prevent migration failures.

**Leaderboard sessions.data JSONB casting (78e568c, c60895f)**: Leaderboard SQL function now explicitly casts sessions.data to jsonb and user_id to text in joins. When querying leaderboard or aggregating session metrics, ensure type casting is applied to prevent PostgreSQL type mismatch errors.
