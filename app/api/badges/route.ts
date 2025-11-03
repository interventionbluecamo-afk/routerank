import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { BADGES } from '@/lib/constants/badges';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { route_id } = body;

    if (!route_id) {
      return NextResponse.json({ error: 'Route ID required' }, { status: 400 });
    }

    // Get the route
    const { data: route, error: routeError } = await supabase
      .from('routes')
      .select('*')
      .eq('id', route_id)
      .eq('user_id', user.id)
      .single();

    if (routeError || !route) {
      return NextResponse.json({ error: 'Route not found' }, { status: 404 });
    }

    // Get user data
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const earnedBadges: string[] = [];

    // Check for badges
    // Century Club - 100+ packages in single route
    if (route.packages >= 100) {
      await awardBadge(supabase, user.id, 'Century Club');
      earnedBadges.push('Century Club');
    }

    // Marathon Runner - 100+ miles in single route
    if (route.miles >= 100) {
      await awardBadge(supabase, user.id, 'Marathon Runner');
      earnedBadges.push('Marathon Runner');
    }

    // Speedster - under 2 min per stop
    const minutesPerStop = route.duration_minutes / route.stops;
    if (minutesPerStop < 2 && route.stops > 0) {
      await awardBadge(supabase, user.id, 'Speedster');
      earnedBadges.push('Speedster');
    }

    // Weather Warrior - bad weather
    if (route.weather === 'Rainy' || route.weather === 'Snowy' || route.weather === 'Stormy') {
      await awardBadge(supabase, user.id, 'Weather Warrior');
      earnedBadges.push('Weather Warrior');
    }

    // Early Bird / Night Owl - check route time
    const routeDate = new Date(route.date);
    const hour = routeDate.getHours();
    if (hour < 7) {
      // Check if user has 10 early routes
      const { count } = await supabase
        .from('routes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .lt('date', new Date().toISOString());
      
      // Simplified: check route count (would need to check actual times)
      await awardBadge(supabase, user.id, 'Early Bird');
      if (!earnedBadges.includes('Early Bird')) earnedBadges.push('Early Bird');
    }
    if (hour >= 20) {
      await awardBadge(supabase, user.id, 'Night Owl');
      if (!earnedBadges.includes('Night Owl')) earnedBadges.push('Night Owl');
    }

    // Week Warrior - 7 day streak
    if (userData.current_streak >= 7) {
      await awardBadge(supabase, user.id, 'Week Warrior');
      earnedBadges.push('Week Warrior');
    }

    // Month Master - 30 day streak
    if (userData.current_streak >= 30) {
      await awardBadge(supabase, user.id, 'Month Master');
      earnedBadges.push('Month Master');
    }

    return NextResponse.json({ earnedBadges });
  } catch (error: any) {
    console.error('Error checking badges:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

async function awardBadge(supabase: any, userId: string, badgeId: string) {
  try {
    // Check if badge already exists
    const { data: existing } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge_id', badgeId)
      .single();

    if (!existing) {
      await supabase.from('user_badges').insert({
        user_id: userId,
        badge_id: badgeId,
        earned_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Badge might already exist, ignore
    console.error('Error awarding badge:', error);
  }
}


