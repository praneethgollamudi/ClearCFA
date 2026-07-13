-- Tracks drip email sends to prevent duplicates
create table if not exists drip_log (
  user_id text not null,
  email_type text not null,
  sent_at timestamptz default now(),
  primary key (user_id, email_type)
);
alter table drip_log enable row level security;
