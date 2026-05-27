'use client';

import { motion } from 'motion/react';
import { firearmsFallback as firearms } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeaturedWeapons() {
  const featured = firearms.slice(0, 4);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="featured" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-background/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Featured <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Weapons</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium collection of iconic firearms with detailed specifications
          </p>
        </motion.div>

        {/* Featured Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((weapon) => (
            <motion.div
              key={weapon.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              {/* Premium Card */}
              <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 hover:border-primary/50 transition-all duration-300 p-6 flex flex-col">
                {/* Gradient overlay on hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
                  weapon.color
                )} />

                {/* Image Placeholder with gradient */}
                <div className={cn(
                  "relative h-48 rounded-xl mb-4 overflow-hidden bg-gradient-to-br",
                  weapon.color,
                  "group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center"
                )}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <span className="text-4xl">🔫</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Name */}
                  <h3 className="font-display font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {weapon.name}
                  </h3>

                  {/* Category badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {weapon.category.charAt(0).toUpperCase() + weapon.category.slice(1)}
                    </span>
                  </div>

                  {/* Key Specs */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Caliber</span>
                      <span className="text-foreground font-semibold">{weapon.caliber}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Barrel</span>
                      <span className="text-foreground font-semibold">{weapon.barrelLength}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="text-foreground font-semibold">{weapon.weight}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Velocity</span>
                      <span className="text-foreground font-semibold">{weapon.muzzleVelocity}</span>
                    </div>
                  </div>

                  {/* Origin & Year */}
                  <div className="pt-4 border-t border-primary/10 flex justify-between items-center text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Origin</p>
                      <p className="font-semibold text-foreground">{weapon.origin}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="font-semibold text-foreground">{weapon.year}</p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="mt-4 w-full py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-display font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            View All Weapons
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
