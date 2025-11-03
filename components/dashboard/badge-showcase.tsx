'use client';

import { Card } from '@/components/ui/card';
import { BADGES, BadgeType } from '@/lib/constants/badges';
import { motion } from 'framer-motion';

interface BadgeShowcaseProps {
  earnedBadges: BadgeType[];
}

export function BadgeShowcase({ earnedBadges }: BadgeShowcaseProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-6">
        Achievements ({earnedBadges.length}/{BADGES.length})
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BADGES.map((badge) => {
          const isEarned = earnedBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`h-full cursor-pointer transition-all ${
                  isEarned
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-100 opacity-60'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="text-4xl">{badge.emoji}</div>
                  <div>
                    <div className={`font-bold text-sm ${isEarned ? 'text-white' : 'text-gray-600'}`}>
                      {badge.name}
                    </div>
                    {!isEarned && (
                      <div className="text-xs text-gray-500 mt-1">{badge.criteria}</div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

