'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import EnhancedWeaponCard from './enhanced-weapon-card';
import type { Firearm } from '@/lib/data';

interface FeaturedWeaponsUpgradedProps {
  firearms: Firearm[];
  onWeaponSelect: (weapon: Firearm, position: { x: number; y: number }) => void;
}

export default function FeaturedWeaponsUpgraded({
  firearms,
  onWeaponSelect,
}: FeaturedWeaponsUpgradedProps) {
  const featured = useMemo(() => firearms.slice(0, 4), [firearms]);

  return (
    <section id="featured" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Featured <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated first look at the archive. Click any card for the full specification view.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((weapon, index) => (
            <motion.div
              key={weapon.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
            >
              <EnhancedWeaponCard weapon={weapon} onWeaponSelect={onWeaponSelect} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="#search"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex px-8 py-3 rounded-lg border border-border/60 bg-card/70 text-foreground font-display font-semibold transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
          >
            Browse the Archive
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
