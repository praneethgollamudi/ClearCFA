-- Fix push_subscriptions to support password-based users whose user_id is a
-- 64-char SHA-256 hex string, not a Supabase auth UUID.
-- Also removes the auth.users FK so edge function (service role) can manage it.
alter table push_subscriptions drop constraint if exists push_subscriptions_user_id_fkey;
alter table push_subscriptions alter column user_id type text using user_id::text;
drop policy if exists "users manage own push subs" on push_subscriptions;
-- Access is now gated entirely by the save-push-sub edge function (service role).
-- The function validates userId exists in sessions table before upserting.
