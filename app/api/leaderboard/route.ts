import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const searchParams = request.nextUrl.searchParams;
    const metric = searchParams.get('metric') || 'total_routes';
    const timePeriod = searchParams.get('period') || 'all-time';
    
    // Calculate date range based on period
    let startDate: Date | null = null;
    if (timePeriod === 'daily') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
    } else if (timePeriod === 'weekly') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (timePeriod === 'monthly') {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (timePeriod === 'yearly') {
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    let query = supabase
      .from('users')
      .select('id, name, company, avatar_url, total_routes, total_packages, total_miles, total_stops')
      .order(metric as any, { ascending: false })
      .limit(100);

    // For time-based periods, we need to aggregate from routes table
    if (startDate && metric !== 'total_routes') {
      // Get aggregated stats from routes
      const { data: routeStats } = await supabase
        .from('routes')
        .select('user_id, packages, miles, stops')
        .gte('date', startDate.toISOString().split('T')[0]);

      // Aggregate by user
      const userStats: Record<string, any> = {};
      routeStats?.forEach((route) => {
        if (!userStats[route.user_id]) {
          userStats[route.user_id] = { packages: 0, miles: 0, stops: 0 };
        }
        userStats[route.user_id].packages += route.packages;
        userStats[route.user_id].miles += route.miles;
        userStats[route.user_id].stops += route.stops;
      });

      // Get user details
      const userIds = Object.keys(userStats);
      if (userIds.length === 0) {
        return NextResponse.json({ leaderboard: [] });
      }

      const { data: users } = await supabase
        .from('users')
        .select('id, name, company, avatar_url')
        .in('id', userIds);

      // Combine and sort
      const leaderboard = users?.map((user) => ({
        ...user,
        ...userStats[user.id],
        [metric]: userStats[user.id][metric.replace('total_', '')] || 0,
      }))
        .sort((a, b) => (b[metric] || 0) - (a[metric] || 0))
        .slice(0, 100) || [];

      return NextResponse.json({ leaderboard });
    } else {
      const { data: leaderboard, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ leaderboard: leaderboard || [] });
    }
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

