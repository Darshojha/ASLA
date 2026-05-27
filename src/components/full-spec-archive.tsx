'use client';

import * as Accordion from '@radix-ui/react-accordion';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Database, Filter, Layers3, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Firearm, FirearmCategory } from '@/lib/data';
import { categoryDefinitions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getFirearmImage, neutralWeaponTone } from '@/lib/firearm-media';

interface FullSpecArchiveProps {
  firearms: Firearm[];
  onWeaponSelect: (weapon: Firearm, position: { x: number; y: number }) => void;
}

type CategoryGroup = {
  id: FirearmCategory;
  name: string;
  description: string;
  firearms: Firearm[];
};

export default function FullSpecArchive({ firearms, onWeaponSelect }: FullSpecArchiveProps) {
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FirearmCategory | 'all'>('all');
  const [openCategories, setOpenCategories] = useState<string[]>(groups.map((group) => group.id));

  const visibleGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return groups
      .filter((group) => selectedCategory === 'all' || group.id === selectedCategory)
      .map((group) => ({
        ...group,
        firearms: group.firearms.filter((weapon) => {
          if (!query) return true;

          return [
            weapon.name,
            weapon.description,
            weapon.caliber,
            weapon.origin,
            weapon.manufacturer,
            weapon.specs.type,
            weapon.specs.action,
            weapon.specs.safeties,
          ]
            .join(' ')
            .toLowerCase()
            .includes(query);
        }),
      }))
      .filter((group) => group.firearms.length > 0);
  }, [groups, searchQuery, selectedCategory]);

  useEffect(() => {
    setOpenCategories(visibleGroups.map((group) => group.id));
  }, [visibleGroups]);

  const totalResults = useMemo(
    () => visibleGroups.reduce((sum, group) => sum + group.firearms.length, 0),
    [visibleGroups]
  );

  const jumpTargets = visibleGroups.map((group) => ({
    id: `archive-${group.id}`,
    label: group.name,
  }));

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
            Browse the entire archive in category accordions with a sticky archive-only filter bar and click-through drill-down for each entry.
          </p>
        </motion.div>

        <div className="sticky top-20 z-30 mb-10 rounded-2xl border border-border/60 bg-card/75 backdrop-blur-xl shadow-lg shadow-black/10">
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search this archive..."
                  className="w-full rounded-xl border border-border/60 bg-background/70 pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-primary/10 text-muted-foreground transition-colors"
                    aria-label="Clear archive search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-primary/5 text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/30'
                  )}
                >
                  All
                </button>
                {categoryDefinitions.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-primary/5 text-muted-foreground border-border/60 hover:text-foreground hover:border-primary/30'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Filter className="w-4 h-4 text-accent" />
                {totalResults} matching entries
              </span>
              <span className="hidden sm:inline text-border/80">•</span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Clear all filters
              </button>
              <button
                type="button"
                onClick={() => setOpenCategories(visibleGroups.map((group) => group.id))}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Expand visible groups
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
              <span className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-border/60 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Jump to category
              </span>
              {jumpTargets.map((target) => (
                <a
                  key={target.id}
                  href={`#${target.id}`}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  {target.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Accordion.Root
          type="multiple"
          value={openCategories}
          onValueChange={setOpenCategories}
          className="space-y-8"
        >
          {visibleGroups.map((group) => (
            <Accordion.Item key={group.id} value={group.id} className="border-0 scroll-mt-40" id={`archive-${group.id}`}>
              <Accordion.Header className="sticky top-[11.5rem] z-20">
                <Accordion.Trigger className="w-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl px-5 sm:px-6 py-4 text-left shadow-lg shadow-black/5 data-[state=open]:border-primary/30 data-[state=open]:bg-card/90 transition-colors">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-accent mb-2">
                        <Layers3 className="w-3.5 h-3.5" />
                        Category Archive
                      </div>
                      <h3 className="font-display font-bold text-2xl text-foreground">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-muted-foreground">
                      {group.firearms.length} entries
                    </div>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pt-5">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {group.firearms.map((weapon) => (
                      <ArchiveCard key={weapon.id} weapon={weapon} onWeaponSelect={onWeaponSelect} />
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

function ArchiveCard({
  weapon,
  onWeaponSelect,
}: {
  weapon: Firearm;
  onWeaponSelect: (weapon: Firearm, position: { x: number; y: number }) => void;
}) {
  const imageUrl = getFirearmImage(weapon.id);

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={(e) => {
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        onWeaponSelect(weapon, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      className="group w-full text-left rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/10 will-change-transform"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '560px',
      }}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr]">
        <div className={cn('relative min-h-[220px] bg-gradient-to-br flex items-center justify-center overflow-hidden', neutralWeaponTone)}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={weapon.name}
              fill
              unoptimized
              loading="lazy"
              fetchPriority="low"
              sizes="(max-width: 1280px) 100vw, 240px"
              className="object-contain p-5 drop-shadow-[0_20px_34px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-[1.03] grayscale contrast-110 brightness-110"
            />
          ) : (
            <div className="text-6xl text-white/75">*</div>
          )}
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-300 mb-2">{weapon.category}</p>
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
    </motion.button>
  );
}

function SpecTile({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-white/5 p-4', full && 'md:col-span-2')}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</p>
      <p className="text-sm font-semibold text-zinc-100 leading-relaxed">{value}</p>
    </div>
  );
}
