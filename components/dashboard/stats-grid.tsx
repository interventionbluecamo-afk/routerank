'use client';

import { Card } from '@/components/ui/card';
import { Package, MapPin, Navigation, Route } from 'lucide-react';
import { formatNumber } from '@/lib/utils/formatting';

interface StatsGridProps {
  totalPackages: number;
  totalMiles: number;
  totalStops: number;
  totalRoutes: number;
}

const stats = [
  {
    label: 'Total Packages',
    value: (v: number) => formatNumber(v),
    icon: Package,
    color: 'bg-blue-500',
    key: 'packages' as const,
  },
  {
    label: 'Total Miles',
    value: (v: number) => formatNumber(v),
    icon: Navigation,
    color: 'bg-purple-500',
    key: 'miles' as const,
  },
  {
    label: 'Total Stops',
    value: (v: number) => formatNumber(v),
    icon: MapPin,
    color: 'bg-green-500',
    key: 'stops' as const,
  },
  {
    label: 'Total Routes',
    value: (v: number) => formatNumber(v),
    icon: Route,
    color: 'bg-orange-500',
    key: 'routes' as const,
  },
];

export function StatsGrid({ totalPackages, totalMiles, totalStops, totalRoutes }: StatsGridProps) {
  const values = {
    packages: totalPackages,
    miles: totalMiles,
    stops: totalStops,
    routes: totalRoutes,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const value = values[stat.key];
        return (
          <Card key={stat.label} hover>
            <div className="flex flex-col items-start space-y-3">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-1">{stat.value(value)}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

