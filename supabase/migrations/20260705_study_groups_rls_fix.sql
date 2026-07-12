-- Fix study_groups and group_members RLS to work with password-based auth.
-- Password users have no Supabase JWT so auth.uid() is always null for them.
-- Replace auth.uid()-based policies with open anon policies matching the
-- sessions table pattern — invite codes are the access-control mechanism.

-- study_groups
DROP POLICY IF EXISTS "member read group" ON study_groups;
DROP POLICY IF EXISTS "create group" ON study_groups;
DROP POLICY IF EXISTS "anon can insert study_groups" ON study_groups;
DROP POLICY IF EXISTS "anon can select study_groups" ON study_groups;

CREATE POLICY "anon can insert study_groups" ON study_groups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "anon can select study_groups" ON study_groups
  FOR SELECT USING (true);

-- group_members
DROP POLICY IF EXISTS "member read members" ON group_members;
DROP POLICY IF EXISTS "join group" ON group_members;
DROP POLICY IF EXISTS "leave group" ON group_members;
DROP POLICY IF EXISTS "anon can insert group_members" ON group_members;
DROP POLICY IF EXISTS "anon can select group_members" ON group_members;
DROP POLICY IF EXISTS "anon can delete group_members" ON group_members;

CREATE POLICY "anon can insert group_members" ON group_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "anon can select group_members" ON group_members
  FOR SELECT USING (true);

CREATE POLICY "anon can delete group_members" ON group_members
  FOR DELETE USING (true);
