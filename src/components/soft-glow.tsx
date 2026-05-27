'use client';

import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

interface SoftGlowProps {
  children: ReactNode;
  glowColor?: string;
  intensity?: 'soft' | 'medium' | 'strong';
}

export default function SoftGlow({
  children,
  glowColor = 'purple',
  intensity = 'soft',
}: SoftGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    purple: 'rgba(168, 85, 247, 0.4)',
    red: 'rgba(239, 68, 68, 0.3)',
    blue: 'rgba(59, 130, 246, 0.4)',
  };

  const intensityMap = {
    soft: 20,
    medium: 40,
    strong: 60,
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Soft glow background */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-lg blur-2xl"
        style={{
          backgroundColor: glowColors[glowColor as keyof typeof glowColors],
          filter: `blur(${intensityMap[intensity]}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
