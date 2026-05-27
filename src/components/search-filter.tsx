'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, Filter } from 'lucide-react';
import type { CategorySummary, Firearm } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getFirearmImage } from '@/lib/firearm-media';

interface SearchFilterProps {
  firearms: Firearm[];
  categories: CategorySummary[];
}

export default function SearchFilter({ firearms, categories }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [selectedCaliber, setSelectedCaliber] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const origins = useMemo(
    () => Array.from(new Set(firearms.map((firearm) => firearm.origin))).sort(),
    [firearms]
  );

  const calibers = useMemo(
    () => Array.from(new Set(firearms.map((firearm) => firearm.caliber))).sort(),
    [firearms]
  );

  const actionTags = useMemo(
    () => Array.from(new Set(firearms.map((firearm) => firearm.specs.type))).slice(0, 8),
    [firearms]
  );

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return firearms.filter((firearm) => {
      const matchesQuery =
        !query ||
        [firearm.name, firearm.description, firearm.caliber, firearm.origin, firearm.manufacturer]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesCategory = !selectedCategory || firearm.category === selectedCategory;
      const matchesOrigin = !selectedOrigin || firearm.origin === selectedOrigin;
      const matchesCaliber = !selectedCaliber || firearm.caliber === selectedCaliber;

      return matchesQuery && matchesCategory && matchesOrigin && matchesCaliber;
    });
  }, [firearms, searchQuery, selectedCategory, selectedOrigin, selectedCaliber]);

  return (
    <section id="search" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 via-background to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Search & <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Browse</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Search the archive by name, origin, caliber, manufacturer, or category.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative backdrop-blur-xl bg-card/70 border border-border/60 rounded-2xl p-1 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center px-6 py-4 gap-3">
              <Search className="w-5 h-5 text-primary" />
              <input
                type="text"
                placeholder="Search the collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground font-medium text-lg"
              />
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full md:w-auto px-6 py-3 flex items-center gap-2 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary font-semibold transition-colors"
          >
            <Filter className="w-5 h-5" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </motion.button>

          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60">
                <h3 className="font-display font-bold text-lg mb-4 text-foreground">Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/10'
                          : 'bg-primary/5 text-primary hover:bg-primary/10'
                      )}
                    >
                      {cat.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60">
                <h3 className="font-display font-bold text-lg mb-4 text-foreground">Origin Countries</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {origins.map((origin) => (
                    <motion.button
                      key={origin}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedOrigin(selectedOrigin === origin ? null : origin)}
                      className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm',
                        selectedOrigin === origin
                          ? 'bg-accent/15 text-accent border border-accent/20'
                          : 'bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                      )}
                    >
                      {origin}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60">
                <h3 className="font-display font-bold text-lg mb-4 text-foreground">Calibers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {calibers.map((caliber) => (
                    <motion.button
                      key={caliber}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCaliber(selectedCaliber === caliber ? null : caliber)}
                      className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm',
                        selectedCaliber === caliber
                          ? 'bg-accent/15 text-accent border border-accent/20'
                          : 'bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                      )}
                    >
                      {caliber}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl backdrop-blur-xl bg-card/70 border border-border/60">
                <h3 className="font-display font-bold text-lg mb-4 text-foreground">Action Types</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {actionTags.map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 rounded-lg bg-primary/5 text-muted-foreground text-sm border border-border/50"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedOrigin(null);
                    setSelectedCaliber(null);
                  }}
                  className="px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary font-semibold transition-colors"
                >
                  Clear Filters
                </motion.button>
                <div className="px-6 py-3 rounded-lg bg-card/70 border border-border/60 text-muted-foreground">
                  {results.length} matches
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-xl text-foreground">Matching entries</h3>
            <p className="text-sm text-muted-foreground">{results.length} of {firearms.length}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.slice(0, 12).map((firearm) => {
              const imageUrl = getFirearmImage(firearm.id);

              return (
                <motion.article
                  key={firearm.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur-xl will-change-transform"
                >
                  <div className={cn('relative h-32 rounded-xl mb-4 overflow-hidden bg-gradient-to-br', firearm.color)}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={firearm.name}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-contain p-3"
                      />
                    ) : null}
                  </div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-display font-semibold text-lg text-foreground">{firearm.name}</h4>
                      <p className="text-sm text-muted-foreground">{firearm.manufacturer}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-accent">{firearm.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{firearm.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <SpecMini label="Caliber" value={firearm.caliber} />
                    <SpecMini label="Type" value={firearm.specs.type} />
                    <SpecMini label="Action" value={firearm.specs.action} />
                    <SpecMini label="Capacity" value={`${firearm.magazineCapacity} rounds`} />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">
                      {firearm.category}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">
                      {firearm.origin}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-primary/5 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground mt-1 line-clamp-1">{value}</p>
    </div>
  );
}
