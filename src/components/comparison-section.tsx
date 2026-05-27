'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, Zap } from 'lucide-react';
import type { Firearm } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getFirearmImage } from '@/lib/firearm-media';

function ComparisonCard({ weapon, side }: { weapon: Firearm; side: 'left' | 'right' }) {
  const imageUrl = getFirearmImage(weapon.id);
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className={cn(
        'relative h-64 rounded-2xl bg-gradient-to-br flex items-center justify-center overflow-hidden',
        weapon.color,
        'border border-border/60 shadow-lg shadow-black/10'
      )}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={weapon.name}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-4 drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]"
          />
        ) : (
          <div className="text-5xl text-white/80">*</div>
        )}
      </div>

      <div>
        <h3 className="font-display font-bold text-2xl text-foreground mb-2">{weapon.name}</h3>
        <p className="text-muted-foreground">{weapon.description}</p>
      </div>

      <div className="space-y-3 p-6 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60">
        <SpecRow label="Caliber" value={weapon.caliber} />
        <SpecRow label="Barrel Length" value={weapon.barrelLength} />
        <SpecRow label="Weight" value={weapon.weight} />
        <SpecRow label="Capacity" value={`${weapon.magazineCapacity} rounds`} />
        <SpecRow label="Velocity" value={weapon.muzzleVelocity} />
        <SpecRow label="Type" value={weapon.specs.type} />
        <SpecRow label="Action" value={weapon.specs.action} />
        <SpecRow label="Origin" value={weapon.origin} />
        <SpecRow label="Year" value={`${weapon.year}`} />
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground mb-2">DETAILS</p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Manufacturer: </span>
            <span className="text-foreground font-semibold">{weapon.manufacturer}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Safeties: </span>
            <span className="text-foreground font-semibold">{weapon.specs.safeties}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Sight: </span>
            <span className="text-foreground font-semibold">{weapon.specs.sight}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-border/60 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground text-right">{value}</span>
    </div>
  );
}

function DifferenceCard({ label, weapon1, weapon2 }: { label: string; weapon1: string; weapon2: string }) {
  return (
    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
      <h4 className="text-xs font-semibold text-primary mb-3 uppercase tracking-[0.2em]">{label}</h4>
      <div className="space-y-2 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Weapon 1</p>
          <p className="font-semibold text-foreground">{weapon1}</p>
        </div>
        <div className="h-px bg-border/60" />
        <div>
          <p className="text-xs text-muted-foreground mb-1">Weapon 2</p>
          <p className="font-semibold text-foreground">{weapon2}</p>
        </div>
      </div>
    </div>
  );
}

interface ComparisonSectionProps {
  firearms: Firearm[];
}

export default function ComparisonSection({ firearms }: ComparisonSectionProps) {
  const [weapon1, setWeapon1] = useState(firearms[0]);
  const [weapon2, setWeapon2] = useState(firearms[1] ?? firearms[0]);

  const pairSummary = useMemo(() => {
    return [
      { label: 'Caliber', left: weapon1.caliber, right: weapon2.caliber },
      { label: 'Velocity', left: weapon1.muzzleVelocity, right: weapon2.muzzleVelocity },
      { label: 'Capacity', left: `${weapon1.magazineCapacity} rounds`, right: `${weapon2.magazineCapacity} rounds` },
    ];
  }, [weapon1, weapon2]);

  const handleSwap = () => {
    setWeapon1(weapon2);
    setWeapon2(weapon1);
  };

  return (
    <section id="comparison" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Compare <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Weapons</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Side-by-side comparisons built around the same factual collection used everywhere else on the page.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.select
              value={weapon1.id}
              onChange={(e) => setWeapon1(firearms.find((w) => w.id === e.target.value) || firearms[0])}
              className="px-4 py-3 rounded-lg bg-card/80 border border-border/60 text-foreground font-semibold cursor-pointer hover:border-primary/30 transition-colors"
            >
              {firearms.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </motion.select>

            <motion.button
              whileHover={{ scale: 1.08, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSwap}
              className="p-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </motion.button>

            <motion.select
              value={weapon2.id}
              onChange={(e) => setWeapon2(firearms.find((w) => w.id === e.target.value) || firearms[1] || firearms[0])}
              className="px-4 py-3 rounded-lg bg-card/80 border border-border/60 text-foreground font-semibold cursor-pointer hover:border-primary/30 transition-colors"
            >
              {firearms.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </motion.select>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-full"
            >
              <div className="h-full rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60 p-6">
                <ComparisonCard weapon={weapon1} side="left" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full"
            >
              <div className="h-full rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60 p-6">
                <ComparisonCard weapon={weapon2} side="right" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60"
          >
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-accent" />
              Key Differences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pairSummary.map((item) => (
                <DifferenceCard
                  key={item.label}
                  label={item.label}
                  weapon1={item.left}
                  weapon2={item.right}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
