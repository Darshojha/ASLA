'use client';

import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface LayeredDepthCardProps {
  children: ReactNode;
  className?: string;
}

export default function LayeredDepthCard({ children, className = '' }: LayeredDepthCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -12 : 0,
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.3)'
          : '0 4px 15px rgba(0, 0, 0, 0.3)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
      className={cn('relative rounded-2xl', className)}
    >
      {/* Layered background with depth */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-red-900/10"
      />

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
