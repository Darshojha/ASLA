'use client';

import { motion } from 'motion/react';
import { ReactNode, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ButtonWithRippleProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function ButtonWithRipple({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
}: ButtonWithRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  }, [onClick]);

  const baseStyles = cn(
    'relative overflow-hidden rounded-lg font-display font-semibold transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-purple-500/50',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3 text-base',
    size === 'lg' && 'px-8 py-4 text-lg',
    variant === 'primary' && 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/50',
    variant === 'secondary' && 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30',
    variant === 'ghost' && 'text-purple-300 hover:text-purple-200',
    className
  );

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={baseStyles}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute pointer-events-none rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
          }}
        />
      ))}

      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
          inset: isHovered ? 0 : '50%',
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/10 rounded-lg"
      />

      {/* Content */}
      <motion.span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </motion.span>
    </motion.button>
  );
}
