-- ai_quota: server-side daily usage counter per user
-- One row per user. Resets automatically when quota_date changes.
-- Used by the ai-proxy Edge Function to enforce free-tier limits.

CREATE TABLE IF NOT EXISTS ai_quota (
  user_id    TEXT PRIMARY KEY,
  quota_date TEXT NOT NULL DEFAULT '',
  quota_count INT  NOT NULL DEFAULT 0
);

-- Row-level security: users can only see their own row.
-- The proxy uses the service-role key and bypasses RLS.
ALTER TABLE ai_quota ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own quota" ON ai_quota
  FOR SELECT USING (auth.uid()::text = user_id);
