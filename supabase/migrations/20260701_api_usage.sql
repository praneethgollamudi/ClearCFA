-- Track actual token usage per API call for accurate cost reporting.
-- Replaces estimate-based cost math in admin-stats with real token counts.

CREATE TABLE IF NOT EXISTS api_usage (
  id           BIGSERIAL    PRIMARY KEY,
  user_id      TEXT         NOT NULL,
  request_type TEXT         NOT NULL, -- 'generate' | 'chat'
  token_in     INT          NOT NULL DEFAULT 0,
  token_out    INT          NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS api_usage_created_at_idx ON api_usage (created_at DESC);
CREATE INDEX IF NOT EXISTS api_usage_user_id_idx    ON api_usage (user_id);

-- Service-role-only access (admin-stats and ai-proxy use service key)
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
