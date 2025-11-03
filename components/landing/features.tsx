'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Shield,
  TrendingUp,
  Award,
  BarChart3,
  Users,
  FileText,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Routes',
    description: 'Upload route screenshots to prove your stats. Keeps leaderboards honest and competitive.',
  },
  {
    icon: TrendingUp,
    title: 'Live Leaderboards',
    description: 'Compete in real-time rankings by packages, miles, stops, or routes. Filter by time period.',
  },
  {
    icon: Award,
    title: 'Unlock Badges',
    description: 'Earn achievements for milestones like 100+ packages, streaks, weather challenges, and more.',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Detailed stats dashboard showing your efficiency score, streak, rank progression, and history.',
  },
  {
    icon: Users,
    title: 'Join Community',
    description: 'Connect with thousands of delivery drivers competing to be the best. Share your achievements.',
  },
  {
    icon: FileText,
    title: 'Detailed Stats',
    description: 'Comprehensive analytics including efficiency scores, average pace, weather patterns, and trends.',
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Everything You Need to Compete
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed for delivery drivers who want to track their performance and
            climb the ranks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


