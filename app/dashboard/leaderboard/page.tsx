'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LeaderboardFilters, TimePeriod, Metric } from '@/components/leaderboard/leaderboard-filters';
import { LeaderboardList } from '@/components/leaderboard/leaderboard-list';

export default function LeaderboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('weekly');
  const [metric, setMetric] = useState<Metric>('total_packages');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (isDemoMode) {
        // Show demo leaderboard data
        setLeaderboard([
          { id: '1', name: 'Demo Driver 1', company: 'Amazon', avatar_url: null, total_routes: 150, total_packages: 5000, total_miles: 12000, total_stops: 3000 },
          { id: '2', name: 'Demo Driver 2', company: 'FedEx', avatar_url: null, total_routes: 125, total_packages: 4200, total_miles: 9800, total_stops: 2500 },
          { id: '3', name: 'Demo Driver 3', company: 'UPS', avatar_url: null, total_routes: 100, total_packages: 3800, total_miles: 8500, total_stops: 2200 },
        ]);
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
      await fetchLeaderboard();
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [timePeriod, metric]);

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/leaderboard?period=${timePeriod}&metric=${metric}`
      );
      const { leaderboard: data } = await response.json();
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">Leaderboard</h1>
        <p className="text-gray-600">Compete with drivers and climb the ranks</p>
      </div>

      <LeaderboardFilters
        timePeriod={timePeriod}
        metric={metric}
        onTimePeriodChange={setTimePeriod}
        onMetricChange={setMetric}
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      ) : (
        <LeaderboardList
          leaderboard={leaderboard}
          metric={metric}
          currentUserId={currentUserId || undefined}
        />
      )}
    </div>
  );
}

