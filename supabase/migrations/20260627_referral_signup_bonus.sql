-- Grant 3 free Pro days to a referrer the moment their referred user signs up.
-- This shortens the reward loop: previously referrers only earned on paid conversion.
-- Trigger fires on every insert into the referrals table.

create or replace function grant_referral_signup_bonus()
returns trigger language plpgsql as $$
declare
  existing_until timestamptz;
begin
  -- Skip self-referrals (already guarded client-side but double-check here)
  if NEW.referrer_id = NEW.referee_id then return NEW; end if;

  select valid_until into existing_until
  from subscriptions
  where user_id = NEW.referrer_id and active = true
  order by valid_until desc
  limit 1;

  if existing_until is not null and existing_until > now() then
    -- Extend an active subscription by 3 days
    update subscriptions
    set valid_until = existing_until + interval '3 days'
    where user_id = NEW.referrer_id and active = true;
  else
    -- Grant a fresh 3-day Pro subscription
    insert into subscriptions (user_id, active, valid_until)
    values (NEW.referrer_id, true, now() + interval '3 days')
    on conflict (user_id) do update
      set valid_until = now() + interval '3 days',
          active = true;
  end if;

  return NEW;
end;
$$;

drop trigger if exists trg_referral_signup_bonus on referrals;
create trigger trg_referral_signup_bonus
  after insert on referrals
  for each row execute function grant_referral_signup_bonus();
