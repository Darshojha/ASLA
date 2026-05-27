'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import CategoriesSection from '@/components/categories-section';
import FeaturedWeaponsUpgraded from '@/components/featured-weapons-upgraded';
import FullSpecArchive from '@/components/full-spec-archive';
import SearchFilter from '@/components/search-filter';
import ComparisonSection from '@/components/comparison-section';
import StatsSection from '@/components/stats-section';
import Footer from '@/components/footer';
import ParticleBackground from '@/components/particle-background';
import { buildCategories, buildStats, type Firearm } from '@/lib/data';
import dynamic from 'next/dynamic';

const WeaponModal = dynamic(() => import('@/components/weapon-modal'), {
  ssr: false,
  loading: () => null,
});

interface HomeClientProps {
  firearms: Firearm[];
  loadError?: string;
}

export default function HomeClient({ firearms, loadError }: HomeClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<Firearm | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = useMemo(() => buildCategories(firearms), [firearms]);
  const stats = useMemo(() => buildStats(firearms), [firearms]);

  const handleWeaponSelect = useCallback((weapon: Firearm, position: { x: number; y: number }) => {
    setSelectedWeapon(weapon);
    setClickPosition(position);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedWeapon(null), 300);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        {loadError ? (
          <section className="px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Database unavailable</p>
              <h2 className="font-display font-bold text-3xl mb-4 text-foreground">
                PostgreSQL is not reachable from this deployment.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {loadError}
              </p>
              <p className="text-sm text-muted-foreground">
                The local dataset is still the source of truth. Run the app on your own machine with your local PostgreSQL instance connected through `DATABASE_URL`.
              </p>
            </div>
          </section>
        ) : (
          <>
            <CategoriesSection categories={categories} />
            <StatsSection stats={stats} />
            <FeaturedWeaponsUpgraded firearms={firearms} onWeaponSelect={handleWeaponSelect} />
            <FullSpecArchive firearms={firearms} onWeaponSelect={handleWeaponSelect} />
            <SearchFilter firearms={firearms} categories={categories} />
            <ComparisonSection firearms={firearms} />
          </>
        )}
        <Footer />
      </div>

      {!loadError && (
        <WeaponModal
          weapon={selectedWeapon}
          firearms={firearms}
          isOpen={modalOpen}
          onClose={handleCloseModal}
          clickPosition={clickPosition}
        />
      )}
    </main>
  );
}
