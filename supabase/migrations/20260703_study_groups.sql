-- Study Groups: private cohorts with shared leaderboard
create table if not exists study_groups (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  created_by uuid references auth.users not null,
  created_at timestamptz default now()
);

create table if not exists group_members (
  group_id uuid references study_groups on delete cascade,
  user_id uuid references auth.users not null,
  display_name text,
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

alter table study_groups enable row level security;
alter table group_members enable row level security;

-- Members can read groups they belong to
create policy "member read group" on study_groups
  for select using (
    id in (select group_id from group_members where user_id = auth.uid())
  );

-- Anyone can create a group (as themselves)
create policy "create group" on study_groups
  for insert with check (created_by = auth.uid());

-- Members can read other members in groups they belong to
create policy "member read members" on group_members
  for select using (
    group_id in (select group_id from group_members where user_id = auth.uid())
  );

-- Users can insert themselves as members
create policy "join group" on group_members
  for insert with check (user_id = auth.uid());

-- Users can delete themselves from groups
create policy "leave group" on group_members
  for delete using (user_id = auth.uid());
