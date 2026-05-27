'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { Firearm } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useState, useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { WeaponSilhouette } from './weapon-silhouettes';
import { getFirearmImage, neutralWeaponTone } from '@/lib/firearm-media';

interface EnhancedWeaponCardProps {
  weapon: Firearm;
  onWeaponSelect: (weapon: Firearm, position: { x: number; y: number }) => void;
}

export default function EnhancedWeaponCard({ weapon, onWeaponSelect }: EnhancedWeaponCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = getFirearmImage(weapon.id);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      onWeaponSelect(weapon, {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [weapon, onWeaponSelect]);

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleClick}
      className="perspective"
      style={{
        perspective: '1200px',
      }}
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="h-full"
      >
        <div
          className={cn(
            'relative h-full p-6 rounded-2xl overflow-hidden cursor-pointer',
            'bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl',
            'border border-border/60 transition-all duration-200 will-change-transform',
            isHovered
              ? 'border-primary/50 shadow-2xl shadow-primary/15'
              : 'shadow-lg shadow-black/10'
          )}
        >
          {/* Animated glow border on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `linear-gradient(135deg, transparent, rgba(217, 164, 88, 0.18), transparent)`,
              }}
            />
          )}

          {/* Weapon silhouette with glow */}
          <motion.div
            className={cn(
              'relative h-48 rounded-xl mb-4 overflow-hidden bg-gradient-to-br',
              neutralWeaponTone,
              'transition-all duration-200 flex items-center justify-center',
              isHovered && 'shadow-2xl shadow-primary/20'
            )}
            animate={{
              scale: isHovered ? 1.03 : 1,
            }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={weapon.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] grayscale contrast-110 brightness-110"
              />
            ) : (
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="w-3/4 h-3/4 text-white/80 relative z-10 grayscale"
              >
                <WeaponSilhouette weapon={weapon} animated={true} />
              </motion.div>
            )}

            {/* Shine effect on hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            )}
          </motion.div>

          {/* Quick info on hover - slides in */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.2 }}
            className="space-y-2 mb-4 overflow-hidden"
          >
            <QuickInfoItem label="Name" value={weapon.name} />
            <QuickInfoItem label="Type" value={weapon.specs.type.split(' ')[0]} />
            <QuickInfoItem label="Country" value={weapon.origin} />
            <QuickInfoItem label="Manufacturer" value={weapon.manufacturer} />
            <QuickInfoItem label="Year" value={String(weapon.year)} />
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            {/* Name */}
            <motion.h3
              animate={{ scale: isHovered ? 1.05 : 1 }}
              className="font-display font-bold text-xl mb-2 text-foreground group-hover:text-zinc-200 transition-colors"
            >
              {weapon.name}
            </motion.h3>

            {/* Category badge */}
            <div className="mb-3">
              <motion.span
                animate={{
                  backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.08)',
                  color: isHovered ? '#f4f4f5' : '#d4d4d8',
                }}
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full border border-white/15 transition-all"
              >
                {weapon.category.charAt(0).toUpperCase() + weapon.category.slice(1)}
              </motion.span>
            </div>

            {/* Key specs - always visible */}
            <div className="space-y-2 mb-4 flex-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Caliber</span>
                <motion.span
                  animate={{ color: isHovered ? '#f5f5f5' : '#d4d4d8' }}
                  className="text-foreground font-semibold"
                >
                  {weapon.caliber}
                </motion.span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Barrel</span>
                <motion.span
                  animate={{ color: isHovered ? '#f5f5f5' : '#d4d4d8' }}
                  className="text-foreground font-semibold"
                >
                  {weapon.barrelLength}
                </motion.span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Weight</span>
                <motion.span
                  animate={{ color: isHovered ? '#f5f5f5' : '#d4d4d8' }}
                  className="text-foreground font-semibold"
                >
                  {weapon.weight}
                </motion.span>
              </div>
            </div>

            {/* Click to explore hint - appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              className="pt-4 border-t border-border/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-200 animate-pulse">Click to Explore</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            >
              <ChevronRight className="w-4 h-4 text-zinc-200" />
            </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function QuickInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex justify-between items-center text-xs p-2 rounded bg-white/5 border border-white/10"
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="text-zinc-100 font-semibold">{value}</span>
    </motion.div>
  );
}
