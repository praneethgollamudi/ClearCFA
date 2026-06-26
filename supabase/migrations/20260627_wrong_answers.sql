-- wrong_answers: community data flywheel — track what concepts users get wrong
-- Used for future question quality improvements and community-level insights
create table if not exists wrong_answers (
  id          bigint generated always as identity primary key,
  user_id     text not null,
  topic       text not null,
  module      text not null,
  q_hash      text not null,
  correct_answer text not null,
  wrong_answer   text not null,
  created_at  timestamptz default now() not null
);

-- Index for topic-level analytics queries
create index if not exists wrong_answers_topic_idx on wrong_answers(topic, module);
create index if not exists wrong_answers_user_idx on wrong_answers(user_id);

-- ip_rate_limit: per-IP daily request counter (anti-abuse)
create table if not exists ip_rate_limit (
  ip_date    text primary key,  -- "ip:YYYY-MM-DD:<ip>"
  req_count  int not null default 0,
  updated_at timestamptz default now() not null
);

-- Auto-clean rows older than 2 days (keep table small)
-- Note: run manually or via pg_cron if needed; table self-limiting by ip_date key
