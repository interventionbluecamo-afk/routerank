'use client';

import { Card } from '@/components/ui/card';
import { getRankForRoutes } from '@/lib/constants/ranks';
import { formatNumber } from '@/lib/utils/formatting';
import { CheckCircle2 } from 'lucide-react';

interface LeaderboardEntryProps {
  rank: number;
  name: string | null;
  company: string | null;
  avatarUrl: string | null;
  metricValue: number;
  totalRoutes: number;
  isCurrentUser?: boolean;
}

export function LeaderboardEntry({
  rank,
  name,
  company,
  avatarUrl,
  metricValue,
  totalRoutes,
  isCurrentUser = false,
}: LeaderboardEntryProps) {
  const rankTier = getRankForRoutes(totalRoutes);
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

  return (
    <Card
      className={`transition-all ${
        isCurrentUser
          ? 'border-2 border-purple-500 bg-purple-50'
          : rank <= 3
          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
          : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 text-center">
          {medal ? (
            <span className="text-3xl">{medal}</span>
          ) : (
            <span className="text-2xl font-bold text-gray-400">#{rank}</span>
          )}
        </div>

        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name || 'User'} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-gray-600">
                {name?.charAt(0).toUpperCase() || 'U'}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-black truncate">{name || 'Anonymous'}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${rankTier.gradient} text-white`}>
              {rankTier.icon} {rankTier.tier}
            </span>
            {isCurrentUser && (
              <span className="text-xs font-semibold text-purple-600">(You)</span>
            )}
          </div>
          {company && (
            <div className="text-sm text-gray-600">{company}</div>
          )}
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="text-2xl font-bold text-black mb-1">
            {formatNumber(metricValue)}
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

