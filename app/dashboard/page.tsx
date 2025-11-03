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
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect('/login');
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

  const earnedBadges = badges?.map((b) => b.badge_id as any) || [];

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

