import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateEfficiencyScore } from '@/lib/utils/calculations';

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
    const { packages, stops, miles, duration_minutes, weather, proof_image_url, date } = body;

    // Validate required fields
    if (!packages || !stops || !miles || !duration_minutes || !weather || !proof_image_url || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate efficiency score
    const efficiency_score = calculateEfficiencyScore(packages, miles, duration_minutes);

    // Create route
    const { data: route, error: routeError } = await supabase
      .from('routes')
      .insert({
        user_id: user.id,
        packages,
        stops,
        miles,
        duration_minutes,
        weather,
        proof_image_url,
        verified: true, // Start with verified, can be manually reviewed later
        efficiency_score,
        date,
      })
      .select()
      .single();

    if (routeError) {
      console.error('Route creation error:', routeError);
      return NextResponse.json({ error: routeError.message }, { status: 500 });
    }

    // Update user stats
    const { data: userData } = await supabase
      .from('users')
      .select('total_packages, total_miles, total_stops, total_routes')
      .eq('id', user.id)
      .single();

    if (userData) {
      await supabase
        .from('users')
        .update({
          total_packages: (userData.total_packages || 0) + packages,
          total_miles: (userData.total_miles || 0) + miles,
          total_stops: (userData.total_stops || 0) + stops,
          total_routes: (userData.total_routes || 0) + 1,
        })
        .eq('id', user.id);
    }

    // Update streak (simplified - check if last route was yesterday or today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const routeDate = new Date(date);
    routeDate.setHours(0, 0, 0, 0);
    
    const { data: lastRoute } = await supabase
      .from('routes')
      .select('date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(2)
      .single();

    if (lastRoute) {
      const lastRouteDate = new Date(lastRoute.date);
      lastRouteDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((routeDate.getTime() - lastRouteDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const { data: userProfile } = await supabase
        .from('users')
        .select('current_streak, longest_streak')
        .eq('id', user.id)
        .single();

      if (userProfile) {
        let newStreak = 1;
        if (daysDiff === 1 || daysDiff === 0) {
          // Consecutive day
          newStreak = (userProfile.current_streak || 0) + (daysDiff === 1 ? 1 : 0);
        }

        const newLongestStreak = Math.max(newStreak, userProfile.longest_streak || 0);

        await supabase
          .from('users')
          .update({
            current_streak: newStreak,
            longest_streak: newLongestStreak,
          })
          .eq('id', user.id);
      }
    }

    // Trigger badge checking (async)
    fetch(`${request.nextUrl.origin}/api/badges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('Cookie') || '',
      },
      body: JSON.stringify({ route_id: route.id }),
    }).catch(console.error);

    return NextResponse.json({ route }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating route:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const userId = searchParams.get('user_id') || user.id;

    const { data: routes, error } = await supabase
      .from('routes')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ routes });
  } catch (error: any) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}


