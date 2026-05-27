'use client';

import { motion } from 'motion/react';
import { ArrowLeftRight, Scale } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Firearm } from '@/lib/data';

interface ComparisonSectionProps {
  firearms: Firearm[];
}

type ComparisonRow = {
  label: string;
  left: string;
  right: string;
};

export default function ComparisonSection({ firearms }: ComparisonSectionProps) {
  const [weapon1, setWeapon1] = useState(firearms[0]);
  const [weapon2, setWeapon2] = useState(firearms[1] ?? firearms[0]);

  const comparisonRows = useMemo<ComparisonRow[]>(
    () => [
      { label: 'Caliber', left: weapon1.caliber, right: weapon2.caliber },
      { label: 'Manufacturer', left: weapon1.manufacturer, right: weapon2.manufacturer },
      { label: 'Origin', left: weapon1.origin, right: weapon2.origin },
      { label: 'Year', left: String(weapon1.year), right: String(weapon2.year) },
      { label: 'Capacity', left: `${weapon1.magazineCapacity} rounds`, right: `${weapon2.magazineCapacity} rounds` },
      { label: 'Type', left: weapon1.specs.type, right: weapon2.specs.type },
      { label: 'Action', left: weapon1.specs.action, right: weapon2.specs.action },
      { label: 'Sight', left: weapon1.specs.sight, right: weapon2.specs.sight },
    ],
    [weapon1, weapon2]
  );

  const handleSwap = () => {
    setWeapon1(weapon2);
    setWeapon2(weapon1);
  };

  return (
    <section id="comparison" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background/80 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4 text-foreground">
            Compare <span className="text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text">Weapons</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A lighter comparison view that keeps the page responsive while preserving the most useful reference data.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-lg shadow-black/10 p-5 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4 mb-6">
            <CompactSelect
              value={weapon1.id}
              firearms={firearms}
              onChange={(nextId) => setWeapon1(firearms.find((w) => w.id === nextId) || firearms[0])}
            />

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSwap}
              className="self-start xl:self-center inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-zinc-100 font-semibold border border-white/10"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Swap
            </motion.button>

            <CompactSelect
              value={weapon2.id}
              firearms={firearms}
              onChange={(nextId) => setWeapon2(firearms.find((w) => w.id === nextId) || firearms[1] || firearms[0])}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <SummaryCard title="Weapon 1" weapon={weapon1} />
            <SummaryCard title="Weapon 2" weapon={weapon2} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-background/80 text-xs uppercase tracking-[0.22em] text-muted-foreground border-b border-border/60">
              <div className="px-4 py-3">Spec</div>
              <div className="px-4 py-3">Weapon 1</div>
              <div className="px-4 py-3">Weapon 2</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.1fr_1fr_1fr] text-sm ${index % 2 === 0 ? 'bg-card/50' : 'bg-background/30'}`}
              >
                <div className="px-4 py-3 font-medium text-foreground border-r border-border/60">{row.label}</div>
                <div className="px-4 py-3 text-muted-foreground border-r border-border/60">{row.left}</div>
                <div className="px-4 py-3 text-muted-foreground">{row.right}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 justify-center">
          <Scale className="w-4 h-4 text-zinc-200" />
          Fast, table-first comparison for quick browsing.
        </div>
      </div>
    </section>
  );
}

function CompactSelect({
  value,
  firearms,
  onChange,
}: {
  value: string;
  firearms: Firearm[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex-1 min-w-0">
      <span className="block text-xs uppercase tracking-[0.22em] text-zinc-500 mb-2">Select firearm</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-zinc-100 font-semibold outline-none focus:border-white/30"
      >
        {firearms.map((weapon) => (
          <option key={weapon.id} value={weapon.id}>
            {weapon.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryCard({ title, weapon }: { title: string; weapon: Firearm }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 mb-2">{title}</p>
      <h3 className="font-display font-bold text-2xl text-zinc-100 mb-2">{weapon.name}</h3>
      <p className="text-sm text-zinc-400 mb-4">{weapon.description}</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <InlineStat label="Caliber" value={weapon.caliber} />
        <InlineStat label="Year" value={String(weapon.year)} />
        <InlineStat label="Origin" value={weapon.origin} />
        <InlineStat label="Capacity" value={`${weapon.magazineCapacity} rounds`} />
      </div>
    </div>
  );
}

function InlineStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-1">{label}</p>
      <p className="font-semibold text-zinc-100">{value}</p>
    </div>
  );
}
