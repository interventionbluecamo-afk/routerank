'use client';

import { Card } from '@/components/ui/card';
import { Route } from '@/lib/types/database';
import { formatDate, formatDuration, formatNumber } from '@/lib/utils/formatting';
import { formatEfficiencyScore } from '@/lib/utils/calculations';
import { CheckCircle2 } from 'lucide-react';

interface RecentRoutesProps {
  routes: Route[];
}

const weatherEmoji: Record<string, string> = {
  Sunny: '☀️',
  Rainy: '🌧️',
  Snowy: '❄️',
  Stormy: '⛈️',
};

export function RecentRoutes({ routes }: RecentRoutesProps) {
  if (routes.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-black mb-6">Recent Routes</h2>
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No routes yet</p>
            <p className="text-sm text-gray-500">Start tracking your routes to see them here</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-6">Recent Routes</h2>
      <div className="space-y-4">
        {routes.map((route) => (
          <Card key={route.id} hover>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{weatherEmoji[route.weather] || '☀️'}</span>
                  <div>
                    <div className="font-bold text-lg text-black">
                      {formatNumber(route.packages)} packages
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(new Date(route.date))}
                    </div>
                  </div>
                  {route.verified && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                  <span>{formatNumber(route.stops)} stops</span>
                  <span>{formatNumber(route.miles)} miles</span>
                  <span>{formatDuration(route.duration_minutes)}</span>
                  <span className="font-semibold text-black">
                    Efficiency: {formatEfficiencyScore(route.efficiency_score)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

