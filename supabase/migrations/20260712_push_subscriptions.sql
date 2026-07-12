-- Push notification subscriptions for Web Push API (VAPID)
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  endpoint text not null,
  p256dh text not null,
  auth_key text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, endpoint)
);

alter table push_subscriptions enable row level security;

drop policy if exists "users manage own push subs" on push_subscriptions;
create policy "users manage own push subs" on push_subscriptions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Index for admin queries (send to all users)
create index if not exists push_subscriptions_user_id_idx on push_subscriptions(user_id);
