export type RankTier = 
  | 'Rookie'
  | 'Driver'
  | 'Pro'
  | 'Expert'
  | 'Elite'
  | 'Master'
  | 'Champion'
  | 'Hero'
  | 'Legend'
  | 'Mythic';

export interface RankDefinition {
  tier: RankTier;
  minRoutes: number;
  gradient: string;
  icon: string;
  color: string;
}

export const RANKS: RankDefinition[] = [
  { tier: 'Rookie', minRoutes: 0, gradient: 'gradient-rookie', icon: '🌱', color: '#64748b' },
  { tier: 'Driver', minRoutes: 50, gradient: 'gradient-driver', icon: '🚗', color: '#3b82f6' },
  { tier: 'Pro', minRoutes: 150, gradient: 'gradient-pro', icon: '⚡', color: '#06b6d4' },
  { tier: 'Expert', minRoutes: 300, gradient: 'gradient-expert', icon: '🎯', color: '#8b5cf6' },
  { tier: 'Elite', minRoutes: 500, gradient: 'gradient-elite', icon: '💎', color: '#ec4899' },
  { tier: 'Master', minRoutes: 750, gradient: 'gradient-master', icon: '👑', color: '#f97316' },
  { tier: 'Champion', minRoutes: 1000, gradient: 'gradient-champion', icon: '🏆', color: '#ef4444' },
  { tier: 'Hero', minRoutes: 1500, gradient: 'gradient-hero', icon: '🦸', color: '#f59e0b' },
  { tier: 'Legend', minRoutes: 2500, gradient: 'gradient-legend', icon: '🌟', color: '#eab308' },
  { tier: 'Mythic', minRoutes: 5000, gradient: 'gradient-mythic', icon: '✨', color: '#6366f1' },
];

export function getRankForRoutes(totalRoutes: number): RankDefinition {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (totalRoutes >= RANKS[i].minRoutes) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function getNextRank(currentRank: RankDefinition): RankDefinition | null {
  const currentIndex = RANKS.findIndex(r => r.tier === currentRank.tier);
  if (currentIndex < RANKS.length - 1) {
    return RANKS[currentIndex + 1];
  }
  return null;
}

