'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import type { Firearm } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getFirearmImage } from '@/lib/firearm-media';

interface WeaponModalProps {
  weapon: Firearm | null;
  firearms: Firearm[];
  isOpen: boolean;
  onClose: () => void;
  clickPosition?: { x: number; y: number };
}

export default function WeaponModal({ weapon, firearms, isOpen, onClose, clickPosition }: WeaponModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'history' | 'variants'>('overview');
  const [variantIndex, setVariantIndex] = useState(0);
  const imageUrl = getFirearmImage(weapon.id);

  const relatedWeapons = useMemo(() => {
    if (!weapon) return [];
    return firearms
      .filter((entry) => entry.category === weapon.category && entry.id !== weapon.id)
      .slice(0, 4);
  }, [firearms, weapon]);

  const variants = useMemo(
    () => [
      { name: 'Baseline Configuration', year: weapon?.year ?? 0, status: 'Original' },
      { name: 'Service Variant', year: (weapon?.year ?? 0) + 5, status: 'Adapted' },
      { name: 'Modernized Example', year: (weapon?.year ?? 0) + 10, status: 'Refined' },
    ],
    [weapon]
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!weapon) return null;

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'specs' as const, label: 'Specifications' },
    { id: 'history' as const, label: 'History' },
    { id: 'variants' as const, label: 'Variants' },
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-40"
            transition={{ duration: 0.3 }}
          />

          <motion.div
            layoutId="weapon-modal"
            initial={{
              opacity: 0,
              scale: 0.9,
              x: clickPosition?.x ? clickPosition.x - window.innerWidth / 2 : 0,
              y: clickPosition?.y ? clickPosition.y - window.innerHeight / 2 : 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              x: clickPosition?.x ? clickPosition.x - window.innerWidth / 2 : 0,
              y: clickPosition?.y ? clickPosition.y - window.innerHeight / 2 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-4 sm:inset-8 md:inset-12 z-50 max-h-screen overflow-y-auto"
          >
            <div className="w-full h-full bg-gradient-to-br from-background/95 via-card/95 to-background/95 backdrop-blur-xl rounded-2xl border border-border/60 shadow-2xl overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleClose}
                className="absolute top-6 right-6 z-50 p-2 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 flex flex-col justify-center"
                >
                  <div className={cn(
                    'relative h-80 rounded-2xl bg-gradient-to-br overflow-hidden mb-6 flex items-center justify-center',
                    weapon.color,
                    'shadow-2xl shadow-black/10 border border-border/50'
                  )}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={weapon.name}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain p-6 drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
                      />
                    ) : (
                      <div className="text-7xl text-white/85">*</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <StatCard label="Caliber" value={weapon.caliber} />
                    <StatCard label="Weight" value={weapon.weight} />
                    <StatCard label="Capacity" value={`${weapon.magazineCapacity} rds`} />
                    <StatCard label="Velocity" value={weapon.muzzleVelocity} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 flex flex-col overflow-y-auto"
                >
                  <div className="mb-6">
                    <h1 className="font-display font-bold text-4xl mb-2 text-foreground">{weapon.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{weapon.description}</p>
                    <div className="flex gap-3 flex-wrap">
                      <Badge label="Category" value={weapon.category} />
                      <Badge label="Origin" value={weapon.origin} />
                      <Badge label="Manufacturer" value={weapon.manufacturer} />
                      <Badge label="Year" value={String(weapon.year)} />
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          'px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap border',
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent'
                            : 'bg-primary/5 text-muted-foreground border-border/60 hover:bg-primary/10 hover:text-foreground'
                        )}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      {activeTab === 'overview' && <OverviewTab weapon={weapon} />}
                      {activeTab === 'specs' && <SpecsTab weapon={weapon} />}
                      {activeTab === 'history' && <HistoryTab weapon={weapon} />}
                      {activeTab === 'variants' && <VariantsTab variants={variants} current={variantIndex} setCurrent={setVariantIndex} />}
                    </motion.div>
                  </AnimatePresence>

                  {activeTab === 'overview' && relatedWeapons.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 pt-8 border-t border-border/60"
                    >
                      <h3 className="font-display font-bold text-lg mb-4 text-primary">Related Weapons</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {relatedWeapons.map((entry) => (
                          <div key={entry.id} className="p-3 rounded-lg bg-primary/5 border border-primary/10 transition-colors">
                            <p className="font-semibold text-sm text-foreground">{entry.name}</p>
                            <p className="text-xs text-muted-foreground">{entry.caliber}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-3 rounded-lg bg-primary/5 border border-primary/10 transition-all"
    >
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-display font-bold text-sm text-primary">{value}</p>
    </motion.div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs text-foreground">
      <span className="font-semibold text-primary">{label}:</span> {value}
    </div>
  );
}

function OverviewTab({ weapon }: { weapon: Firearm }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg mb-3 text-primary">Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          <SpecItem label="Type" value={weapon.specs.type} />
          <SpecItem label="Action" value={weapon.specs.action} />
          <SpecItem label="Safeties" value={weapon.specs.safeties} />
          <SpecItem label="Sight" value={weapon.specs.sight} />
          <SpecItem label="Barrel Length" value={weapon.barrelLength} />
          <SpecItem label="Origin" value={weapon.origin} />
        </div>
      </div>
    </div>
  );
}

function SpecsTab({ weapon }: { weapon: Firearm }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg mb-4 text-primary">Technical Specifications</h3>
      <SpecItem label="Caliber" value={weapon.caliber} full />
      <SpecItem label="Barrel Length" value={weapon.barrelLength} full />
      <SpecItem label="Weight" value={weapon.weight} full />
      <SpecItem label="Magazine Capacity" value={`${weapon.magazineCapacity} rounds`} full />
      <SpecItem label="Muzzle Velocity" value={weapon.muzzleVelocity} full />
      <SpecItem label="Manufacturer" value={weapon.manufacturer} full />
    </div>
  );
}

function HistoryTab({ weapon }: { weapon: Firearm }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg mb-4 text-primary">Historical Timeline</h3>
        <div className="space-y-4">
          <TimelineItem
            year={weapon.year}
            title="Original Design"
            description={`The ${weapon.name} entered production in ${weapon.origin}.`}
          />
          <TimelineItem
            year={weapon.year + 5}
            title="Platform Maturity"
            description="The design reached broader adoption and settled into its best-known form."
          />
          <TimelineItem
            year={weapon.year + 15}
            title="Legacy Use"
            description="The platform remained relevant in duty, sporting, or collector circles."
          />
        </div>
      </div>
    </div>
  );
}

interface Variant {
  name: string;
  year: number;
  status: string;
}

function VariantsTab({
  variants,
  current,
  setCurrent,
}: {
  variants: Variant[];
  current: number;
  setCurrent: (value: number) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg mb-4 text-primary">Available Variants</h3>
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-4 rounded-lg bg-primary/5 border border-primary/10"
      >
        <h4 className="font-bold text-lg mb-2 text-foreground">{variants[current].name}</h4>
        <p className="text-sm text-muted-foreground mb-3">Year: {variants[current].year}</p>
        <p className="text-sm">Status: <span className="text-primary font-semibold">{variants[current].status}</span></p>
      </motion.div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.06 }}
          onClick={() => setCurrent((current - 1 + variants.length) % variants.length)}
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <div className="flex-1 flex items-center justify-center gap-2">
          {variants.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrent(index)}
              className={cn(
                'transition-all rounded-full',
                current === index ? 'bg-primary w-8 h-2' : 'bg-border/80 w-2 h-2'
              )}
            />
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }}
          onClick={() => setCurrent((current + 1) % variants.length)}
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/15 text-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

function SpecItem({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={cn(full && 'col-span-full')}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  );
}

function TimelineItem({ year, title, description }: { year: number; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors pb-4"
    >
      <p className="font-display font-bold text-primary">{year}</p>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </motion.div>
  );
}
