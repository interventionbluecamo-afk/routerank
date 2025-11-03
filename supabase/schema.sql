-- RouteRank Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT CHECK (company IN ('Amazon', 'FedEx', 'UPS', 'DHL', 'USPS', 'Other')),
  avatar_url TEXT,
  total_routes INTEGER DEFAULT 0,
  total_packages INTEGER DEFAULT 0,
  total_miles DECIMAL(10, 2) DEFAULT 0,
  total_stops INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routes table
CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  packages INTEGER NOT NULL,
  stops INTEGER NOT NULL,
  miles DECIMAL(10, 2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  weather TEXT CHECK (weather IN ('Sunny', 'Rainy', 'Snowy', 'Stormy')) NOT NULL,
  proof_image_url TEXT NOT NULL,
  verified BOOLEAN DEFAULT true,
  efficiency_score DECIMAL(10, 4) GENERATED ALWAYS AS (
    packages / NULLIF(miles + (duration_minutes / 60.0), 0)
  ) STORED,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_routes_user_date ON routes(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_routes_date ON routes(date DESC);
CREATE INDEX IF NOT EXISTS idx_users_total_routes ON users(total_routes DESC);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view all profiles" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can view all routes" ON routes;
DROP POLICY IF EXISTS "Users can insert own routes" ON routes;
DROP POLICY IF EXISTS "Users can view all badges" ON user_badges;
DROP POLICY IF EXISTS "Users can insert own badges" ON user_badges;

-- RLS Policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all routes"
  ON routes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own routes"
  ON routes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all badges"
  ON user_badges FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own badges"
  ON user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for route proofs (run this separately in Storage section)
-- The bucket should be named 'route-proofs' and set to public

-- Storage policies (if bucket exists)
-- Note: These will be created automatically when you set up the bucket in the dashboard
-- Or you can run:
-- CREATE POLICY "Public can view proof images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'route-proofs');
--
-- CREATE POLICY "Authenticated users can upload proofs"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'route-proofs' AND auth.role() = 'authenticated');

