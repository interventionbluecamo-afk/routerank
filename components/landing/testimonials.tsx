'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Johnson',
    company: 'Amazon Flex',
    quote: 'This app turned my daily grind into a game. I went from dreading routes to competing for the top spot every week. The leaderboard keeps me motivated!',
    avatar: '👨‍🦱',
  },
  {
    name: 'Sarah Chen',
    company: 'FedEx',
    quote: 'Finally, a way to prove I\'m one of the best. The verification system keeps it fair, and earning badges is addictive. My streak is at 23 days!',
    avatar: '👩',
  },
  {
    name: 'Jake Martinez',
    company: 'UPS',
    quote: 'Love seeing how I stack up against other drivers. The efficiency score helped me optimize my routes. Climbed from Rookie to Pro in 3 months!',
    avatar: '👨',
  },
  {
    name: 'Emily Rodriguez',
    company: 'Amazon Flex',
    quote: 'The community is awesome. Sharing achievements and competing together makes this job way more fun. RouteRank is the Strava for delivery drivers!',
    avatar: '👩‍🦰',
  },
];

export function Testimonials() {
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
            What Drivers Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of drivers who are already competing and climbing the ranks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex flex-col h-full">
                  <Quote className="w-8 h-8 text-gray-400 mb-4" />
                  <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


