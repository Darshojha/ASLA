'use client';

import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBorderCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animated?: boolean;
}

export default function AnimatedBorderCard({
  children,
  className,
  glowColor = 'from-purple-500 to-red-500',
  animated = true,
}: AnimatedBorderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Animated gradient border background */}
      {animated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute inset-0 rounded-2xl p-px',
            `bg-gradient-to-r ${glowColor}`
          )}
          style={{
            background: isHovered
              ? `conic-gradient(from 0deg, rgb(168, 85, 247), rgb(139, 92, 246), rgb(168, 85, 247))`
              : 'transparent',
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95" />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1)'
            : '0 0 0px rgba(168, 85, 247, 0)',
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          'relative rounded-2xl backdrop-blur-xl',
          'bg-gradient-to-br from-gray-800/60 to-gray-900/40',
          'border border-purple-500/20',
          className
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
