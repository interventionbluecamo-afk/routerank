# RouteRank Setup Guide

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Set up Supabase**:
   - Create a new Supabase project at https://supabase.com
   - Go to Project Settings → API
   - Copy your Project URL and anon/public key

3. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**:
   - In Supabase Dashboard, go to SQL Editor
   - Run the SQL from `supabase/schema.sql`
   - Create a storage bucket named `route-proofs` (public)

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Visit** http://localhost:3000

## Project Structure

- `/app` - Next.js app router pages
- `/components` - React components
- `/lib` - Utilities, constants, and Supabase clients
- `/supabase` - Database schema SQL

## Features Implemented

✅ Landing page with hero, features, testimonials  
✅ Authentication (login/signup)  
✅ Dashboard with profile, stats, badges, recent routes  
✅ Add Route flow (3-step form with image upload)  
✅ Leaderboard with filters (time period, metric)  
✅ API routes for routes, leaderboard, upload, badges  
✅ Rank system (10 tiers)  
✅ Badge system (10 badges)  
✅ Streak tracking  
✅ Efficiency score calculation  

## Next Steps

1. Add your Supabase credentials to `.env.local`
2. Run the database schema SQL
3. Create the storage bucket
4. Start developing!

## Notes

- The middleware uses the deprecated "middleware" convention (Next.js will show a warning, but it works)
- Image uploads go to Supabase Storage bucket `route-proofs`
- Badge checking happens automatically after route submission
- RLS policies allow public viewing but restrict inserts/updates to own data


