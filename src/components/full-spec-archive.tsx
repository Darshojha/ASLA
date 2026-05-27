'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Database, Layers3 } from 'lucide-react';
import { useMemo } from 'react';
import type { Firearm, FirearmCategory } from '@/lib/data';
import { categoryDefinitions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getFirearmImage } from '@/lib/firearm-media';

interface FullSpecArchiveProps {
  firearms: Firearm[];
}

type CategoryGroup = {
  id: FirearmCategory;
  name: string;
  description: string;
  firearms: Firearm[];
};

export default function FullSpecArchive({ firearms }: FullSpecArchiveProps) {
  const groups = useMemo<CategoryGroup[]>(
    () =>
      categoryDefinitions
        .map((definition) => ({
          ...definition,
          firearms: firearms.filter((firearm) => firearm.category === definition.id),
        }))
        .filter((group) => group.firearms.length > 0),
    [firearms]
  );

  return (
    <section id="archive" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/60 text-xs uppercase tracking-[0.28em] text-muted-foreground mb-5">
            <Database className="w-3.5 h-3.5 text-accent" />
            Full Specification Archive
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Every Entry, <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Fully Specified</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Browse the entire archive in the same visual language as the featured cards, but with the complete specification set visible for every firearm.
          </p>
        </motion.div>

        <div className="space-y-10">
          {groups.map((group) => (
            <motion.section
              key={group.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-accent mb-2">
                    <Layers3 className="w-3.5 h-3.5" />
                    Category Archive
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-card/70 border border-border/60 text-sm text-muted-foreground">
                  {group.firearms.length} entries
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {group.firearms.map((weapon) => (
                  <ArchiveCard key={weapon.id} weapon={weapon} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveCard({ weapon }: { weapon: Firearm }) {
  const imageUrl = getFirearmImage(weapon.id);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/10 will-change-transform"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '560px',
      }}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr]">
        <div className={cn('relative min-h-[220px] bg-gradient-to-br flex items-center justify-center overflow-hidden', weapon.color)}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={weapon.name}
              fill
              unoptimized
              sizes="(max-width: 1280px) 100vw, 240px"
              className="object-contain p-5 drop-shadow-[0_20px_34px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="text-6xl text-white/75">*</div>
          )}
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-accent mb-2">{weapon.category}</p>
              <h4 className="font-display font-bold text-2xl text-foreground mb-2">{weapon.name}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{weapon.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">{weapon.year}</span>
              <span className="px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">{weapon.manufacturer}</span>
              <span className="px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">{weapon.origin}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpecTile label="Caliber" value={weapon.caliber} />
            <SpecTile label="Barrel Length" value={weapon.barrelLength} />
            <SpecTile label="Weight" value={weapon.weight} />
            <SpecTile label="Capacity" value={`${weapon.magazineCapacity} rounds`} />
            <SpecTile label="Muzzle Velocity" value={weapon.muzzleVelocity} />
            <SpecTile label="Type" value={weapon.specs.type} />
            <SpecTile label="Action" value={weapon.specs.action} />
            <SpecTile label="Safeties" value={weapon.specs.safeties} />
            <SpecTile label="Sight" value={weapon.specs.sight} full />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SpecTile({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={cn('rounded-2xl border border-border/60 bg-primary/5 p-4', full && 'md:col-span-2')}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</p>
      <p className="text-sm font-semibold text-foreground leading-relaxed">{value}</p>
    </div>
  );
}
