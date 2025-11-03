export type BadgeType = 
  | 'Century Club'
  | 'Marathon Runner'
  | 'Speedster'
  | 'Early Bird'
  | 'Night Owl'
  | 'Weather Warrior'
  | 'Rising Star'
  | 'Week Warrior'
  | 'Month Master'
  | 'Safety First';

export interface BadgeDefinition {
  id: BadgeType;
  name: string;
  description: string;
  emoji: string;
  criteria: string;
}

export const BADGES: BadgeDefinition[] = [
  {
    id: 'Century Club',
    name: 'Century Club',
    description: 'Delivered 100+ packages in a single route',
    emoji: '💯',
    criteria: '100+ packages in one route',
  },
  {
    id: 'Marathon Runner',
    name: 'Marathon Runner',
    description: 'Drove 100+ miles in a single route',
    emoji: '🏃',
    criteria: '100+ miles in one route',
  },
  {
    id: 'Speedster',
    name: 'Speedster',
    description: 'Averaged under 2 minutes per stop',
    emoji: '⚡',
    criteria: '< 2 min/stop average',
  },
  {
    id: 'Early Bird',
    name: 'Early Bird',
    description: 'Completed 10 routes before 7am',
    emoji: '🌅',
    criteria: '10 routes before 7am',
  },
  {
    id: 'Night Owl',
    name: 'Night Owl',
    description: 'Completed 10 routes after 8pm',
    emoji: '🦉',
    criteria: '10 routes after 8pm',
  },
  {
    id: 'Weather Warrior',
    name: 'Weather Warrior',
    description: 'Completed a route in bad weather',
    emoji: '🌧️',
    criteria: 'Route in rain/snow/storm',
  },
  {
    id: 'Rising Star',
    name: 'Rising Star',
    description: 'Improved rank by 10+ positions in a week',
    emoji: '⭐',
    criteria: 'Top 10 rank improvement weekly',
  },
  {
    id: 'Week Warrior',
    name: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    emoji: '🔥',
    criteria: '7 consecutive days',
  },
  {
    id: 'Month Master',
    name: 'Month Master',
    description: 'Maintained a 30-day streak',
    emoji: '👑',
    criteria: '30 consecutive days',
  },
  {
    id: 'Safety First',
    name: 'Safety First',
    description: 'Prioritized safety over speed',
    emoji: '🛡️',
    criteria: 'Manual award or behavior-based',
  },
];

export function getBadgeById(id: BadgeType): BadgeDefinition | undefined {
  return BADGES.find(badge => badge.id === id);
}

