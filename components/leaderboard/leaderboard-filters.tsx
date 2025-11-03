'use client';

import { Button } from '@/components/ui/button';
import { Package, MapPin, Navigation, Route } from 'lucide-react';

export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all-time';
export type Metric = 'total_packages' | 'total_miles' | 'total_stops' | 'total_routes';

interface LeaderboardFiltersProps {
  timePeriod: TimePeriod;
  metric: Metric;
  onTimePeriodChange: (period: TimePeriod) => void;
  onMetricChange: (metric: Metric) => void;
}

const timePeriods: { value: TimePeriod; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'all-time', label: 'All-Time' },
];

const metrics: { value: Metric; label: string; icon: any }[] = [
  { value: 'total_packages', label: 'Packages', icon: Package },
  { value: 'total_miles', label: 'Miles', icon: Navigation },
  { value: 'total_stops', label: 'Stops', icon: MapPin },
  { value: 'total_routes', label: 'Routes', icon: Route },
];

export function LeaderboardFilters({
  timePeriod,
  metric,
  onTimePeriodChange,
  onMetricChange,
}: LeaderboardFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-16 z-40 shadow-sm">
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-600 mb-3">Time Period</div>
          <div className="flex flex-wrap gap-2">
            {timePeriods.map((period) => (
              <Button
                key={period.value}
                variant={timePeriod === period.value ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onTimePeriodChange(period.value)}
                className="rounded-full"
              >
                {period.label}
                {period.value === 'daily' && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                    Daily Champions Feed
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-600 mb-3">Rank By</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <Button
                  key={m.value}
                  variant={metric === m.value ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onMetricChange(m.value)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


