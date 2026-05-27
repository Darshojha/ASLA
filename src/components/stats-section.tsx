'use client';

import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { StatSummary } from '@/lib/data';

interface StatsSectionProps {
  stats: StatSummary[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const numericTargets = useMemo(
    () =>
      stats.reduce<Record<string, number>>((acc, stat) => {
        acc[stat.label] = typeof stat.value === 'number' ? stat.value : Number.parseInt(String(stat.value), 10) || 0;
        return acc;
      }, {}),
    [stats]
  );

  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const timeouts: number[] = [];
    const intervals: number[] = [];

    Object.entries(numericTargets).forEach(([label, target], index) => {
      const timeout = window.setTimeout(() => {
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 50));
        const interval = window.setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            window.clearInterval(interval);
          }
          setCounts((prev) => ({ ...prev, [label]: current }));
        }, 24);

        intervals.push(interval);
      }, index * 100);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      intervals.forEach((interval) => window.clearInterval(interval));
    };
  }, [numericTargets]);

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Zap: Icons.Bolt,
      Grid: Icons.Grid3x3,
      Globe: Icons.Globe,
      Clock: Icons.Clock,
    };

    return iconMap[iconName] || Icons.Bolt;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            ASLA by the <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Numbers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A concise overview of the archive, its breadth, and its time span.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = getIcon(stat.icon);
            const value = counts[stat.label] ?? (typeof stat.value === 'number' ? 0 : stat.value);
            const displayValue =
              stat.label === 'Time Span'
                ? `${value}+ years`
                : value;

            return (
              <motion.div variants={itemVariants} key={stat.label} className="group relative h-full">
                <div className="relative h-full p-8 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <motion.div className="relative z-10 text-center">
                    <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto bg-gradient-to-br from-primary to-accent text-white shadow-lg">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-4xl font-display font-bold text-foreground mb-2">
                      {displayValue}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
