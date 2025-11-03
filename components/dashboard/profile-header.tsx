'use client';

import { User } from '@/lib/types/database';
import { getRankForRoutes, getNextRank } from '@/lib/constants/ranks';
import { formatNumber } from '@/lib/utils/formatting';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const currentRank = getRankForRoutes(user.total_routes);
  const nextRank = getNextRank(currentRank);
  const progress = nextRank
    ? ((user.total_routes - currentRank.minRoutes) / (nextRank.minRoutes - currentRank.minRoutes)) * 100
    : 100;

  return (
    <div className={`rounded-2xl p-8 text-white ${currentRank.gradient} shadow-xl`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.name || 'User'} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{user.name || 'Driver'}</h1>
          {user.company && <p className="text-white/90 mb-4">{user.company}</p>}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentRank.icon}</span>
              <span className="text-xl font-bold">{currentRank.tier}</span>
            </div>
            {user.current_streak > 0 && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-xl">🔥</span>
                <span className="font-semibold">{user.current_streak} day streak</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {nextRank && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress to {nextRank.tier}</span>
            <span className="text-sm font-medium">
              {user.total_routes - currentRank.minRoutes} / {nextRank.minRoutes - currentRank.minRoutes} routes
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}


