'use client';

import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CategorySummary } from '@/lib/data';

interface CategoriesSectionProps {
  categories: CategorySummary[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Pistol: Icons.Target,
      Rifle: Icons.Target,
      Shotgun: Icons.Crosshair,
      Scope: Icons.Search,
      Zap: Icons.Bolt,
      RotateCcw: Icons.RotateCcw,
    };

    return iconMap[iconName] || Icons.Bolt;
  };

  return (
    <section id="categories" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Explore by <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A restrained catalog layout that keeps the focus on the collection itself.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div className={cn(
                  'relative h-full p-8 rounded-2xl backdrop-blur-xl',
                  'bg-card/70 border border-border/60',
                  'transition-all duration-300 cursor-pointer overflow-hidden',
                  'shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]'
                )}>
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300',
                    category.color
                  )} />

                  <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.06 }}
                      className={cn(
                        'w-14 h-14 rounded-xl mb-4 flex items-center justify-center',
                        'bg-gradient-to-br',
                        category.color,
                        'text-white shadow-lg'
                      )}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>

                    <h3 className="font-display font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-accent">
                        {category.count} entries
                      </span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="text-primary group-hover:text-accent transition-colors"
                      >
                        <Icons.ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
