-- ai_quota: server-side daily usage counter per user
-- One row per user. Resets automatically when quota_date changes.
-- Used by the ai-proxy Edge Function to enforce free-tier limits.
-- Safe to re-run: all statements are idempotent.

CREATE TABLE IF NOT EXISTS ai_quota (
  user_id    TEXT PRIMARY KEY,
  quota_date TEXT NOT NULL DEFAULT '',
  quota_count INT  NOT NULL DEFAULT 0
);

ALTER TABLE ai_quota ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ai_quota' AND policyname = 'Users see own quota'
  ) THEN
    CREATE POLICY "Users see own quota" ON ai_quota
      FOR SELECT USING (auth.uid()::text = user_id);
  END IF;
END $$;
