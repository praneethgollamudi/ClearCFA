-- Add plan_tier column to subscriptions to support Power Pro tier
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS plan_tier text DEFAULT 'pro';
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_tier ON subscriptions(plan_tier);

-- Backfill existing rows to 'pro' (already the DEFAULT but just to be explicit)
UPDATE subscriptions SET plan_tier = 'pro' WHERE plan_tier IS NULL;
