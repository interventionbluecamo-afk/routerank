'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Ready to start climbing?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of delivery drivers competing to be the best. Track your routes, earn
            badges, and climb the leaderboards—all for free.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


