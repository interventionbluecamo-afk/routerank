# RouteRank - Gamified Delivery Driver Tracking App

RouteRank is a competitive delivery driver tracking web app where drivers upload verified route screenshots, compete on leaderboards, and earn badges. Think Strava meets Duolingo for delivery drivers.

## Features

- 🏆 **Leaderboards** - Compete with other drivers by packages, miles, stops, or routes
- 🎖️ **Badge System** - Earn achievements for milestones and accomplishments
- 📊 **Detailed Stats** - Track your efficiency, streaks, and progress
- ✅ **Verification** - Upload proof images to keep leaderboards honest
- 🔥 **Streak Tracking** - Maintain daily streaks and climb the ranks
- 📈 **Rank Progression** - 10 tier system from Rookie to Mythic

## Tech Stack

- **Framework**: Next.js 14+ with App Router and TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Animations**: Framer Motion
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd routerank
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database schema in Supabase:

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
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
CREATE TABLE routes (
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
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Indexes for performance
CREATE INDEX idx_routes_user_date ON routes(user_id, date DESC);
CREATE INDEX idx_routes_date ON routes(date DESC);
CREATE INDEX idx_users_total_routes ON users(total_routes DESC);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

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

-- Create storage bucket for route proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('route-proofs', 'route-proofs', true);

-- Storage policies
CREATE POLICY "Public can view proof images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'route-proofs');

CREATE POLICY "Authenticated users can upload proofs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'route-proofs' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own proofs"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'route-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);
```

5. Create the storage bucket in Supabase Dashboard:
   - Go to Storage → Create Bucket
   - Name: `route-proofs`
   - Make it public

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  (auth)/          # Authentication pages
  dashboard/       # Dashboard and protected routes
  api/             # API routes
  page.tsx         # Landing page

components/
  ui/              # Reusable UI components
  auth/            # Authentication components
  dashboard/       # Dashboard components
  leaderboard/     # Leaderboard components
  route/           # Route form components
  landing/         # Landing page sections

lib/
  supabase/        # Supabase client utilities
  constants/       # App constants (ranks, badges)
  utils/           # Utility functions
  types/           # TypeScript types
```

## Key Features Implementation

### Verification System
Routes require a proof image upload to Supabase Storage. This keeps the leaderboards honest.

### Badge System
10 different badges can be earned through various achievements:
- Century Club (100+ packages)
- Marathon Runner (100+ miles)
- Speedster (< 2 min/stop)
- Early Bird / Night Owl (time-based)
- Weather Warrior (bad weather)
- Week Warrior / Month Master (streaks)
- Rising Star (rank improvement)
- Safety First (manual award)

### Rank Progression
10 tiers based on total routes:
- Rookie (0)
- Driver (50)
- Pro (150)
- Expert (300)
- Elite (500)
- Master (750)
- Champion (1000)
- Hero (1500)
- Legend (2500)
- Mythic (5000)

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Make sure to set up the same environment variables in Vercel.

## License

MIT
