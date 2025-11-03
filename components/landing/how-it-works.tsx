'use client';

import { motion } from 'framer-motion';
import { Upload, CheckCircle2, Trophy } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload Route Screenshot',
    description: 'Take a screenshot of your route summary from your delivery app (Amazon Flex, FedEx, UPS, etc.) and upload it with your stats.',
  },
  {
    number: 2,
    icon: CheckCircle2,
    title: 'Get Verified',
    description: 'Your stats get verified and automatically added to the leaderboards. Proof keeps it real!',
  },
  {
    number: 3,
    icon: Trophy,
    title: 'Compete & Earn',
    description: 'Watch your rank climb, unlock badges for achievements, and compete with the best drivers.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to start tracking your grind and climbing the ranks.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Number Circle */}
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

