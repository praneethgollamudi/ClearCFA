-- Social opt-in leaderboard: users who choose to show on the public weekly leaderboard
create table if not exists leaderboard_opts (
  user_id uuid primary key references auth.users,
  display_name text not null,
  opted_in boolean not null default true,
  updated_at timestamptz default now()
);

alter table leaderboard_opts enable row level security;

drop policy if exists "read own leaderboard opt" on leaderboard_opts;
drop policy if exists "upsert own leaderboard opt" on leaderboard_opts;

-- Anyone can read opted-in entries (public leaderboard)
create policy "read opted-in" on leaderboard_opts
  for select using (opted_in = true);

-- Users can manage their own opt-in row
create policy "upsert own leaderboard opt" on leaderboard_opts
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Weekly leaderboard view (calls via RPC): returns top 20 opted-in users by questions this week
-- Uses SECURITY DEFINER so it can join sessions without exposing other users' data
create or replace function get_weekly_leaderboard()
returns table(display_name text, questions_this_week bigint, accuracy_this_week numeric, rank bigint)
language sql security definer as $$
  with week_start as (
    select (date_trunc('week', now() at time zone 'utc'))::text as ws
  ),
  opted_users as (
    select user_id, display_name from leaderboard_opts where opted_in = true
  ),
  weekly_sessions as (
    select
      s.user_id,
      sum((s.data->>'total')::int) as total_questions,
      avg((s.data->>'pct')::numeric) as avg_pct
    from sessions s
    join opted_users ou on s.user_id = ou.user_id
    where s.updated_at >= (select ws from week_start)
    group by s.user_id
  )
  select
    ou.display_name,
    coalesce(ws.total_questions, 0) as questions_this_week,
    round(coalesce(ws.avg_pct, 0), 1) as accuracy_this_week,
    rank() over (order by coalesce(ws.total_questions, 0) desc) as rank
  from opted_users ou
  left join weekly_sessions ws on ws.user_id = ou.user_id
  order by questions_this_week desc
  limit 20;
$$;
