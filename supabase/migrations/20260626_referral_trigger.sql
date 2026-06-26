-- Referral reward trigger: grant referrer 1 free Pro month for every
-- REFERRAL_THRESHOLD (2) friends who actually upgrade to Pro.
-- Fires on INSERT to subscriptions — works with both manual and future
-- automated payment grants.
-- Safe to re-run: uses CREATE OR REPLACE + DROP TRIGGER IF EXISTS.

CREATE OR REPLACE FUNCTION grant_referral_on_pro_upgrade()
RETURNS TRIGGER AS $$
DECLARE
  v_referrer_id TEXT;
  v_paid_count  INT;
  v_base        TIMESTAMPTZ;
BEGIN
  -- Only act on new active subscriptions
  IF NOT NEW.active THEN
    RETURN NEW;
  END IF;

  -- Find referrer for this subscriber (if they came via a referral link)
  SELECT referrer_id INTO v_referrer_id
  FROM referrals
  WHERE referee_id = NEW.user_id
  LIMIT 1;

  IF v_referrer_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Count how many of this referrer's referees have an active, valid subscription
  SELECT COUNT(*) INTO v_paid_count
  FROM referrals r
  JOIN subscriptions s
    ON s.user_id = r.referee_id
   AND s.active = true
   AND s.valid_until >= NOW()
  WHERE r.referrer_id = v_referrer_id;

  -- Grant 1 free month for every 2 paid referrals
  IF v_paid_count > 0 AND v_paid_count % 2 = 0 THEN
    -- Extend from current expiry, or from now if expired/absent
    SELECT valid_until INTO v_base
    FROM subscriptions
    WHERE user_id = v_referrer_id AND active = true
    ORDER BY valid_until DESC
    LIMIT 1;

    IF v_base IS NULL OR v_base < NOW() THEN
      v_base := NOW();
    END IF;

    INSERT INTO subscriptions (user_id, active, valid_until)
    VALUES (v_referrer_id, true, v_base + INTERVAL '30 days')
    ON CONFLICT (user_id)
    DO UPDATE SET
      active      = true,
      valid_until = EXCLUDED.valid_until
    WHERE subscriptions.valid_until < EXCLUDED.valid_until;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_referral_on_pro_upgrade ON subscriptions;
CREATE TRIGGER trg_referral_on_pro_upgrade
  AFTER INSERT ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION grant_referral_on_pro_upgrade();
