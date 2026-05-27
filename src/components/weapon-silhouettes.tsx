'use client';

import type { Firearm } from '@/lib/data';

interface WeaponSilhouetteProps {
  weapon: Firearm;
  className?: string;
  animated?: boolean;
}

/**
 * Professional weapon silhouette SVGs for each category
 * Designed as black silhouettes with dynamic gradients
 */

// Pistol silhouette (Glock-like profile)
const PistolSilhouette = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 200 150"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Slide */}
      <path d="M 50 55 L 160 55 L 160 65 Q 155 75 150 85 Q 145 95 140 100 L 50 100 Q 55 85 55 65 Z" />
      {/* Frame */}
      <rect x="50" y="90" width="90" height="35" rx="4" />
      {/* Trigger guard */}
      <path d="M 75 90 Q 75 110 80 110 L 85 90 Z" />
      {/* Barrel */}
      <rect x="50" y="60" width="25" height="8" rx="2" />
      {/* Front sight */}
      <rect x="158" y="50" width="3" height="12" />
      {/* Rear sight */}
      <rect x="100" y="48" width="3" height="12" />
    </g>
  </svg>
);

// Revolver silhouette (6-cylinder chamber)
const RevolverSilhouette = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 200 150"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Cylinder */}
      <ellipse cx="95" cy="75" rx="30" ry="22" />
      {/* Chamber positions */}
      <circle cx="85" cy="55" r="4" opacity="0.6" />
      <circle cx="105" cy="55" r="4" opacity="0.6" />
      <circle cx="115" cy="65" r="4" opacity="0.6" />
      <circle cx="115" cy="85" r="4" opacity="0.6" />
      <circle cx="105" cy="95" r="4" opacity="0.6" />
      <circle cx="85" cy="95" r="4" opacity="0.6" />
      {/* Barrel */}
      <path d="M 55 70 L 35 70 L 35 80 L 55 80 Z" />
      {/* Frame/Grip */}
      <path d="M 70 90 L 60 140 L 75 140 L 85 95 Z" />
      {/* Hammer */}
      <path d="M 95 50 L 105 45 L 105 55 Z" />
      {/* Front sight */}
      <rect x="32" y="65" width="2" height="12" />
    </g>
  </svg>
);

// Rifle silhouette (AR-15 profile)
const RifleSilhouette = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 280 120"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Upper receiver */}
      <rect x="40" y="45" width="200" height="10" rx="2" />
      {/* Handguard */}
      <path d="M 60 55 L 180 55 L 180 70 L 60 65 Z" />
      {/* Lower receiver/grip */}
      <path d="M 100 55 L 95 95 L 105 95 L 110 55 Z" />
      {/* Stock/buffer tube */}
      <path d="M 240 48 Q 260 45 270 50 L 270 60 Q 260 65 240 60 Z" />
      {/* Charging handle */}
      <rect x="155" y="42" width="6" height="8" />
      {/* Front sight post */}
      <rect x="80" y="40" width="3" height="10" />
      {/* Rear sight */}
      <rect x="200" y="38" width="3" height="12" />
      {/* Muzzle brake */}
      <rect x="35" y="46" width="8" height="8" rx="1" />
    </g>
  </svg>
);

// Shotgun silhouette (pump/tactical profile)
const ShotgunSilhouette = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 280 120"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Barrel */}
      <rect x="30" y="48" width="140" height="12" rx="3" />
      {/* Magazine tube */}
      <rect x="32" y="62" width="120" height="6" rx="2" />
      {/* Receiver */}
      <path d="M 160 45 L 180 40 L 185 70 L 170 72 Z" />
      {/* Pump handle */}
      <rect x="80" y="62" width="60" height="8" rx="2" opacity="0.7" />
      {/* Stock */}
      <path d="M 180 50 Q 240 45 260 55 L 260 65 Q 240 75 180 68 Z" />
      {/* Grip area */}
      <path d="M 165 60 L 160 90 L 175 90 L 180 62 Z" />
      {/* Muzzle ports */}
      <circle cx="45" cy="54" r="2" opacity="0.6" />
      <circle cx="65" cy="54" r="2" opacity="0.6" />
      <circle cx="85" cy="54" r="2" opacity="0.6" />
    </g>
  </svg>
);

// Sniper rifle silhouette (bolt-action with scope)
const SniperRifleSilhouette = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 300 140"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Barrel */}
      <rect x="40" y="55" width="180" height="8" rx="2" />
      {/* Stock/furniture */}
      <path d="M 50 63 L 45 100 L 60 100 L 65 65 Z" />
      {/* Bolt handle */}
      <path d="M 85 50 L 90 45 L 90 70 Z" />
      {/* Magazine */}
      <rect x="95" y="68" width="8" height="30" rx="1" />
      {/* Scope rail */}
      <rect x="50" y="48" width="160" height="4" rx="1" opacity="0.7" />
      {/* Scope body */}
      <ellipse cx="110" cy="42" rx="28" ry="12" opacity="0.8" />
      {/* Scope objective lens */}
      <circle cx="75" cy="42" r="8" opacity="0.6" />
      {/* Scope eyepiece */}
      <circle cx="145" cy="42" r="8" opacity="0.6" />
      {/* Buttstock */}
      <path d="M 220 55 Q 280 50 290 65 L 290 72 Q 280 85 220 70 Z" />
      {/* Adjustable cheek rest */}
      <rect x="215" y="68" width="60" height="8" rx="2" opacity="0.6" />
      {/* Muzzle brake */}
      <rect x="35" y="53" width="8" height="12" rx="1" />
    </g>
  </svg>
);

// Machine gun silhouette (belt-fed, aggressive stance)
const MachineGunSilhouette = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 300 160"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Barrel assembly */}
      <rect x="30" y="60" width="160" height="14" rx="3" />
      {/* Barrel shroud vents */}
      <rect x="50" y="58" width="4" height="18" rx="1" opacity="0.6" />
      <rect x="80" y="58" width="4" height="18" rx="1" opacity="0.6" />
      <rect x="110" y="58" width="4" height="18" rx="1" opacity="0.6" />
      <rect x="140" y="58" width="4" height="18" rx="1" opacity="0.6" />
      {/* Receiver */}
      <path d="M 180 55 L 200 50 L 210 90 L 185 95 Z" />
      {/* Ammo belt feed */}
      <path d="M 185 45 Q 195 30 210 35 L 210 55 Q 195 50 185 60 Z" />
      {/* Grip/trigger group */}
      <path d="M 150 80 L 145 130 L 160 130 L 165 85 Z" />
      {/* Stock/support */}
      <path d="M 210 70 Q 260 65 280 90 L 280 105 Q 260 120 210 100 Z" />
      {/* Bipod left leg */}
      <path d="M 85 74 L 70 110" strokeWidth="3" stroke="currentColor" fill="none" />
      {/* Bipod right leg */}
      <path d="M 95 74 L 110 110" strokeWidth="3" stroke="currentColor" fill="none" />
      {/* Muzzle compensator */}
      <path d="M 25 58 L 20 62 L 20 72 L 25 76 Z" />
    </g>
  </svg>
);

/**
 * Extract gradient colors from weapon color string
 * Converts Tailwind gradient classes to actual color values
 */
function getGradientColors(colorClass: string): { from: string; to: string } {
  const gradientMap: Record<string, { from: string; to: string }> = {
    'from-blue-600 to-cyan-500': { from: '#2563eb', to: '#06b6d4' },
    'from-purple-600 to-pink-500': { from: '#9333ea', to: '#ec4899' },
    'from-red-600 to-orange-500': { from: '#dc2626', to: '#f97316' },
    'from-green-600 to-emerald-500': { from: '#16a34a', to: '#10b981' },
    'from-yellow-600 to-amber-500': { from: '#ca8a04', to: '#f59e0b' },
    'from-indigo-600 to-violet-500': { from: '#4f46e5', to: '#8b5cf6' },
  };
  
  return gradientMap[colorClass] || { from: '#8b5cf6', to: '#6366f1' };
}

export function WeaponSilhouette({ weapon, className = '', animated = false }: WeaponSilhouetteProps) {
  const silhouetteClass = `w-full h-full transition-all duration-300 ${
    animated ? 'hover:scale-110' : ''
  } ${className}`;

  const gradientColors = getGradientColors(weapon.color);
  const gradientId = `gradient-${weapon.id}`;

  // Create SVG with gradient defs
  const SVGWithGradient = ({ children }: { children: React.ReactNode }) => (
    <svg
      viewBox="0 0 280 160"
      className={silhouetteClass}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );

  // Wrap silhouettes with gradient support
  const PistolWithGradient = (
    <svg
      viewBox="0 0 200 150"
      className={silhouetteClass}
      fill={`url(#${gradientId})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        <path d="M 50 55 L 160 55 L 160 65 Q 155 75 150 85 Q 145 95 140 100 L 50 100 Q 55 85 55 65 Z" />
        <rect x="50" y="90" width="90" height="35" rx="4" />
        <path d="M 75 90 Q 75 110 80 110 L 85 90 Z" />
        <rect x="50" y="60" width="25" height="8" rx="2" />
        <rect x="158" y="50" width="3" height="12" />
        <rect x="100" y="48" width="3" height="12" />
      </g>
    </svg>
  );

  const RevolverWithGradient = (
    <svg
      viewBox="0 0 200 150"
      className={silhouetteClass}
      fill={`url(#${gradientId})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        <ellipse cx="95" cy="75" rx="30" ry="22" />
        <circle cx="85" cy="55" r="4" opacity="0.6" />
        <circle cx="105" cy="55" r="4" opacity="0.6" />
        <circle cx="115" cy="65" r="4" opacity="0.6" />
        <circle cx="115" cy="85" r="4" opacity="0.6" />
        <circle cx="105" cy="95" r="4" opacity="0.6" />
        <circle cx="85" cy="95" r="4" opacity="0.6" />
        <path d="M 55 70 L 35 70 L 35 80 L 55 80 Z" />
        <path d="M 70 90 L 60 140 L 75 140 L 85 95 Z" />
        <path d="M 95 50 L 105 45 L 105 55 Z" />
        <rect x="32" y="65" width="2" height="12" />
      </g>
    </svg>
  );

  const RifleWithGradient = (
    <svg
      viewBox="0 0 280 120"
      className={silhouetteClass}
      fill={`url(#${gradientId})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        <rect x="40" y="45" width="200" height="10" rx="2" />
        <path d="M 60 55 L 180 55 L 180 70 L 60 65 Z" />
        <path d="M 100 55 L 95 95 L 105 95 L 110 55 Z" />
        <path d="M 240 48 Q 260 45 270 50 L 270 60 Q 260 65 240 60 Z" />
        <rect x="155" y="42" width="6" height="8" />
        <rect x="80" y="40" width="3" height="10" />
        <rect x="200" y="38" width="3" height="12" />
        <rect x="35" y="46" width="8" height="8" rx="1" />
      </g>
    </svg>
  );

  const ShotgunWithGradient = (
    <svg
      viewBox="0 0 280 120"
      className={silhouetteClass}
      fill={`url(#${gradientId})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        <rect x="30" y="48" width="140" height="12" rx="3" />
        <rect x="32" y="62" width="120" height="6" rx="2" />
        <path d="M 160 45 L 180 40 L 185 70 L 170 72 Z" />
        <rect x="80" y="62" width="60" height="8" rx="2" opacity="0.7" />
        <path d="M 180 50 Q 240 45 260 55 L 260 65 Q 240 75 180 68 Z" />
        <path d="M 165 60 L 160 90 L 175 90 L 180 62 Z" />
        <circle cx="45" cy="54" r="2" opacity="0.6" />
        <circle cx="65" cy="54" r="2" opacity="0.6" />
        <circle cx="85" cy="54" r="2" opacity="0.6" />
      </g>
    </svg>
  );

  const SniperRifleWithGradient = (
    <svg
      viewBox="0 0 300 140"
      className={silhouetteClass}
      fill={`url(#${gradientId})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        <rect x="40" y="55" width="180" height="8" rx="2" />
        <path d="M 50 63 L 45 100 L 60 100 L 65 65 Z" />
        <path d="M 85 50 L 90 45 L 90 70 Z" />
        <rect x="95" y="68" width="8" height="30" rx="1" />
        <rect x="50" y="48" width="160" height="4" rx="1" opacity="0.7" />
        <ellipse cx="110" cy="42" rx="28" ry="12" opacity="0.8" />
        <circle cx="75" cy="42" r="8" opacity="0.6" />
        <circle cx="145" cy="42" r="8" opacity="0.6" />
        <path d="M 220 55 Q 280 50 290 65 L 290 72 Q 280 85 220 70 Z" />
        <rect x="215" y="68" width="60" height="8" rx="2" opacity="0.6" />
        <rect x="35" y="53" width="8" height="12" rx="1" />
      </g>
    </svg>
  );

  const MachineGunWithGradient = (
    <svg
      viewBox="0 0 300 160"
      className={silhouetteClass}
      fill={`url(#${gradientId})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradientColors.from} stopOpacity="0.9" />
          <stop offset="100%" stopColor={gradientColors.to} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g>
        <rect x="30" y="60" width="160" height="14" rx="3" />
        <rect x="50" y="58" width="4" height="18" rx="1" opacity="0.6" />
        <rect x="80" y="58" width="4" height="18" rx="1" opacity="0.6" />
        <rect x="110" y="58" width="4" height="18" rx="1" opacity="0.6" />
        <rect x="140" y="58" width="4" height="18" rx="1" opacity="0.6" />
        <path d="M 180 55 L 200 50 L 210 90 L 185 95 Z" />
        <path d="M 185 45 Q 195 30 210 35 L 210 55 Q 195 50 185 60 Z" />
        <path d="M 150 80 L 145 130 L 160 130 L 165 85 Z" />
        <path d="M 210 70 Q 260 65 280 90 L 280 105 Q 260 120 210 100 Z" />
        <path d="M 85 74 L 70 110" stroke={gradientColors.from} strokeWidth="3" fill="none" />
        <path d="M 95 74 L 110 110" stroke={gradientColors.from} strokeWidth="3" fill="none" />
        <path d="M 25 58 L 20 62 L 20 72 L 25 76 Z" />
      </g>
    </svg>
  );

  const silhouettes: Record<Firearm['category'], React.ReactNode> = {
    pistol: PistolWithGradient,
    revolver: RevolverWithGradient,
    rifle: RifleWithGradient,
    shotgun: ShotgunWithGradient,
    sniper: SniperRifleWithGradient,
    machine: MachineGunWithGradient,
  };

  return silhouettes[weapon.category] || PistolWithGradient;
}

export {
  PistolSilhouette,
  RevolverSilhouette,
  RifleSilhouette,
  ShotgunSilhouette,
  SniperRifleSilhouette,
  MachineGunSilhouette,
};
