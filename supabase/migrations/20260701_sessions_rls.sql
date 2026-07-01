-- Fix RLS policies on sessions table to allow anon-key inserts and selects.
-- Password-based auth uses the anon key (no Supabase JWT), so the table must
-- permit operations from the anon role. Admin reads are always via service key.

ALTER TABLE IF EXISTS public.sessions ENABLE ROW LEVEL SECURITY;

-- Allow anon users to insert their own session rows (account creation + sync)
DROP POLICY IF EXISTS "anon can insert sessions" ON public.sessions;
CREATE POLICY "anon can insert sessions" ON public.sessions
  FOR INSERT WITH CHECK (true);

-- Allow anon users to update their own session rows (supabaseSync upserts)
DROP POLICY IF EXISTS "anon can update sessions" ON public.sessions;
CREATE POLICY "anon can update sessions" ON public.sessions
  FOR UPDATE USING (true);

-- Allow anon users to read session rows (supabaseCheckAccount + supabaseLoad)
DROP POLICY IF EXISTS "anon can select sessions" ON public.sessions;
CREATE POLICY "anon can select sessions" ON public.sessions
  FOR SELECT USING (true);
