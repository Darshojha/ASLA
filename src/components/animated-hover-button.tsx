'use client';

import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHoverButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  floatingAnimation?: boolean;
}

export default function AnimatedHoverButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  floatingAnimation = true,
}: AnimatedHoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = cn(
    'relative overflow-hidden rounded-lg font-display font-bold transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3 text-base',
    size === 'lg' && 'px-8 py-4 text-lg',
    variant === 'primary' && 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/50',
    variant === 'secondary' && 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30',
    variant === 'accent' && 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/50',
    className
  );

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={floatingAnimation ? {
        y: [0, -8, 0],
      } : {}}
      transition={floatingAnimation ? {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      } : {}}
      className={baseStyles}
    >
      {/* Text color animation - white and black mix gradient on hover */}
      <motion.span
        animate={{
          color: isHovered
            ? '#ffffff'
            : 'currentColor',
          textShadow: isHovered
            ? '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)'
            : '0 0 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        {children}
      </motion.span>

      {/* Subtle glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-lg bg-white/20"
      />
    </motion.button>
  );
}
