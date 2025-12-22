-- Shopify Bridge Partner Program - Database Schema
-- This schema should be created in Supabase

-- Partners table
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  telegram VARCHAR(100),
  
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, suspended, blocked
  tier VARCHAR(20) DEFAULT 'standard', -- standard, silver, gold, platinum, master
  
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  pending_balance DECIMAL(10, 2) DEFAULT 0,
  paid_out DECIMAL(10, 2) DEFAULT 0,
  
  total_referrals INTEGER DEFAULT 0,
  active_referrals INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5, 2) DEFAULT 0,
  
  payment_method VARCHAR(20), -- usdt_trc20, usdt_erc20, bank_card
  payment_details JSONB,
  
  notifications JSONB DEFAULT '{"newReferral": true, "referralPaid": true, "payoutProcessed": true, "weeklyReport": true}',
  
  referred_by UUID REFERENCES partners(id),
  
  registered_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Referrals table (LIFETIME BINDING!)
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partners(id) NOT NULL,
  
  name VARCHAR(200),
  email VARCHAR(255),
  phone VARCHAR(20),
  
  status VARCHAR(20) DEFAULT 'clicked', -- clicked, registered, contacted, paid, active, churned
  
  clicked_at TIMESTAMP,
  registered_at TIMESTAMP,
  contacted_at TIMESTAMP,
  paid_at TIMESTAMP,                    -- First payment
  last_payment_at TIMESTAMP,            -- Latest payment
  
  source VARCHAR(20),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  order_value DECIMAL(10, 2),           -- First order amount
  plan_selected VARCHAR(20),            -- testing, starter, growth, business
  commission_earned DECIMAL(10, 2) DEFAULT 0,  -- TOTAL commissions (lifetime!)
  total_payments INTEGER DEFAULT 0,      -- Number of payments
  lifetime_value DECIMAL(10, 2) DEFAULT 0, -- LTV
  
  lifetime_binding BOOLEAN DEFAULT TRUE, -- PERMANENT BINDING!
  
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Commission records (ONE RECORD PER CLIENT PAYMENT)
-- This is how we track EVERY payment from clients
CREATE TABLE commission_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partners(id) NOT NULL,
  referral_id UUID REFERENCES referrals(id) NOT NULL,
  
  payment_id VARCHAR(100),              -- Payment system ID
  payment_amount DECIMAL(10, 2) NOT NULL, -- Client's payment amount
  commission_amount DECIMAL(10, 2) NOT NULL, -- Partner's commission
  commission_rate DECIMAL(5, 2) NOT NULL, -- Rate at payment time
  
  payment_type VARCHAR(20) NOT NULL,    -- 'setup' or 'maintenance'
  
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, paid
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_commission_records_partner_id ON commission_records(partner_id);
CREATE INDEX idx_commission_records_referral_id ON commission_records(referral_id);

-- Payouts table
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partners(id) NOT NULL,
  
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USDT',
  
  status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed, cancelled
  
  payment_method VARCHAR(20) NOT NULL,
  payment_details VARCHAR(255) NOT NULL,
  
  transaction_id VARCHAR(255),
  
  partner_note TEXT,
  admin_note TEXT,
  
  requested_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Referral clicks (analytics)
CREATE TABLE referral_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partners(id) NOT NULL,
  
  ip_address INET,
  user_agent TEXT,
  
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  clicked_at TIMESTAMP DEFAULT NOW()
);

-- Admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(200),
  role VARCHAR(20) DEFAULT 'admin',
  
  last_login_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_partners_referral_code ON partners(referral_code);
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_referrals_partner_id ON referrals(partner_id);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_payouts_partner_id ON payouts(partner_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_referral_clicks_partner_id ON referral_clicks(partner_id);

-- Insert default commission settings
INSERT INTO settings (key, value) VALUES 
('commission_tiers', '{
  "standard": {"minReferrals": 0, "commission": 10},
  "silver": {"minReferrals": 5, "commission": 12},
  "gold": {"minReferrals": 15, "commission": 15},
  "platinum": {"minReferrals": 30, "commission": 18},
  "master": {"minReferrals": 50, "commission": 20}
}'),
('min_payout_amount', '50'),
('lifetime_commissions', 'true'),
('client_binding_permanent', 'true');

