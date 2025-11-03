import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProfileHeader } from '@/components/dashboard/profile-header';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import { BadgeShowcase } from '@/components/dashboard/badge-showcase';
import { RecentRoutes } from '@/components/dashboard/recent-routes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default async function DashboardPage() {
  const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  // Demo mode: show sample data
  if (isDemoMode || !authUser) {
    const demoUser = {
      id: 'demo',
      email: 'demo@routerank.com',
      name: 'Demo Driver',
      company: 'Amazon' as const,
      avatar_url: null,
      total_routes: 42,
      total_packages: 1250,
      total_miles: 3200,
      total_stops: 850,
      current_streak: 7,
      longest_streak: 14,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return (
      <div className="space-y-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">⚠️ Demo Mode:</span> Supabase is not configured. Showing sample data. 
            Configure Supabase to enable full functionality.
          </p>
        </div>
        <ProfileHeader user={demoUser} />
        <StatsGrid
          totalPackages={demoUser.total_packages}
          totalMiles={demoUser.total_miles}
          totalStops={demoUser.total_stops}
          totalRoutes={demoUser.total_routes}
        />
        <BadgeShowcase earnedBadges={['Century Club', 'Week Warrior', 'Speedster']} />
        <RecentRoutes routes={[]} />
      </div>
    );
  }

  // Get user profile
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (!user) {
    redirect('/login');
  }

  // Get earned badges
  const { data: badges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', authUser.id);

  const earnedBadges = badges?.map((b: { badge_id: string }) => b.badge_id as any) || [];

  // Get recent routes
  const { data: routes } = await supabase
    .from('routes')
    .select('*')
    .eq('user_id', authUser.id)
    .order('date', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <ProfileHeader user={user} />
      <StatsGrid
        totalPackages={user.total_packages}
        totalMiles={user.total_miles}
        totalStops={user.total_stops}
        totalRoutes={user.total_routes}
      />
      <BadgeShowcase earnedBadges={earnedBadges} />
      <RecentRoutes routes={routes || []} />

      {/* Floating Action Button */}
      <Link href="/dashboard/add-route">
        <Button
          size="lg"
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-xl z-50"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}

