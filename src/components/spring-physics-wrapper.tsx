'use client';

import { motion, MotionConfig } from 'motion/react';
import { ReactNode } from 'react';

interface SpringPhysicsWrapperProps {
  children: ReactNode;
  preset?: 'soft' | 'medium' | 'responsive';
}

/**
 * Soft spring physics configuration for natural, organic motion
 * All interactions use this wrapper for consistent physics
 */
export default function SpringPhysicsWrapper({
  children,
  preset = 'soft',
}: SpringPhysicsWrapperProps) {
  const presets = {
    soft: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 40,
      mass: 1,
    },
    medium: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
    responsive: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    },
  };

  return (
    <MotionConfig transition={presets[preset]}>
      {children}
    </MotionConfig>
  );
}
