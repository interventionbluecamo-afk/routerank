'use client';

import { motion } from 'framer-motion';
import { LeaderboardEntry } from './leaderboard-entry';
import { Card } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils/formatting';

interface LeaderboardUser {
  id: string;
  name: string | null;
  company: string | null;
  avatar_url: string | null;
  total_routes: number;
  total_packages: number;
  total_miles: number;
  total_stops: number;
}

interface LeaderboardListProps {
  leaderboard: LeaderboardUser[];
  metric: string;
  currentUserId?: string;
}

export function LeaderboardList({ leaderboard, metric, currentUserId }: LeaderboardListProps) {
  if (leaderboard.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">Be the first to compete this week!</p>
          <p className="text-sm text-gray-500">Log a route to get on the leaderboard</p>
        </div>
      </Card>
    );
  }

  const getUserPosition = () => {
    if (!currentUserId) return null;
    const position = leaderboard.findIndex((user) => user.id === currentUserId);
    return position >= 0 ? position + 1 : null;
  };

  const userPosition = getUserPosition();
  const currentUser = currentUserId
    ? leaderboard.find((user) => user.id === currentUserId)
    : null;

  const getMetricValue = (user: LeaderboardUser) => {
    switch (metric) {
      case 'total_packages':
        return user.total_packages;
      case 'total_miles':
        return user.total_miles;
      case 'total_stops':
        return user.total_stops;
      case 'total_routes':
        return user.total_routes;
      default:
        return user.total_routes;
    }
  };

  return (
    <div className="space-y-4">
      {/* User Position Card (if beyond top 3) */}
      {userPosition && userPosition > 3 && currentUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-32 z-30"
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <div className="text-center">
              <div className="text-sm font-medium mb-1">Your Rank</div>
              <div className="text-4xl font-bold">#{userPosition}</div>
              <div className="text-lg mt-2">
                {formatNumber(getMetricValue(currentUser))} {metric.replace('total_', '')}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Leaderboard */}
      {leaderboard.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <LeaderboardEntry
            rank={index + 1}
            name={user.name}
            company={user.company}
            avatarUrl={user.avatar_url}
            metricValue={getMetricValue(user)}
            totalRoutes={user.total_routes}
            isCurrentUser={user.id === currentUserId}
          />
        </motion.div>
      ))}
    </div>
  );
}

