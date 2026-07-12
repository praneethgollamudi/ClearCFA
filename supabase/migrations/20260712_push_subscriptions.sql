-- Push notification subscriptions for Web Push API (VAPID)
-- user_id is TEXT (not UUID) to support both Supabase auth UUIDs and
-- password-based users (64-char SHA-256 hex strings). No FK to auth.users.
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  endpoint text not null,
  p256dh text not null,
  auth_key text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, endpoint)
);

-- If table was previously created with user_id uuid, drop FK and convert to text
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu
      on tc.constraint_name = kcu.constraint_name
    where tc.table_name = 'push_subscriptions'
      and tc.constraint_type = 'FOREIGN KEY'
      and kcu.column_name = 'user_id'
  ) then
    alter table push_subscriptions drop constraint if exists push_subscriptions_user_id_fkey;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_name = 'push_subscriptions'
      and column_name = 'user_id'
      and data_type = 'uuid'
  ) then
    alter table push_subscriptions alter column user_id type text using user_id::text;
  end if;
end $$;

alter table push_subscriptions enable row level security;

drop policy if exists "users manage own push subs" on push_subscriptions;
create policy "users manage own push subs" on push_subscriptions
  for all using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);

-- Index for admin queries (send to all users)
create index if not exists push_subscriptions_user_id_idx on push_subscriptions(user_id);
