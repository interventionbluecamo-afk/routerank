'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TrendingUp, Shield, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>100% Verified Stats</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-tight"
          >
            Track your grind.
            <br />
            Climb the ranks.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-xl"
          >
            Compete with thousands of delivery drivers, upload verified route screenshots, and
            earn badges as you climb the leaderboards. Strava meets Duolingo for delivery
            drivers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="text-lg">
              <Link href="/signup">Start Tracking Free</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 pt-8"
          >
            <div>
              <div className="text-3xl font-bold text-black">1,234+</div>
              <div className="text-sm text-gray-600">Active Drivers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">45,678</div>
              <div className="text-sm text-gray-600">Routes Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">2.3M+</div>
              <div className="text-sm text-gray-600">Packages Delivered</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Visual Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative"
        >
          <div className="relative z-10 space-y-4">
            {/* Floating Rank Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-semibold">Pro Driver</span>
              </div>
              <div className="text-3xl font-bold">Rank #42</div>
              <div className="text-sm opacity-90">150 routes completed</div>
            </motion.div>

            {/* Floating Leaderboard Preview */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
            >
              <h3 className="font-bold text-lg mb-4">Weekly Leaderboard</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">#{i}</span>
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <span className="font-medium">Driver {i}</span>
                    </div>
                    <span className="font-bold">{1200 - i * 50} packages</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Badge Showcase */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
            >
              <h3 className="font-bold text-lg mb-4">Recent Badges</h3>
              <div className="flex gap-3">
                {['💯', '🏃', '⚡', '🔥'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


