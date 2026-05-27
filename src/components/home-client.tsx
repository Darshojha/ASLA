'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import CategoriesSection from '@/components/categories-section';
import FeaturedWeaponsUpgraded from '@/components/featured-weapons-upgraded';
import SearchFilter from '@/components/search-filter';
import ComparisonSection from '@/components/comparison-section';
import StatsSection from '@/components/stats-section';
import Footer from '@/components/footer';
import ParticleBackground from '@/components/particle-background';
import WeaponModal from '@/components/weapon-modal';
import { buildCategories, buildStats, type Firearm } from '@/lib/data';

interface HomeClientProps {
  firearms: Firearm[];
}

export default function HomeClient({ firearms }: HomeClientProps) {
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
        <CategoriesSection categories={categories} />
        <StatsSection stats={stats} />
        <FeaturedWeaponsUpgraded firearms={firearms} onWeaponSelect={handleWeaponSelect} />
        <SearchFilter firearms={firearms} categories={categories} />
        <ComparisonSection firearms={firearms} />
        <Footer />
      </div>

      <WeaponModal
        weapon={selectedWeapon}
        firearms={firearms}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        clickPosition={clickPosition}
      />
    </main>
  );
}
