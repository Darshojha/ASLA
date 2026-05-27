'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';

interface AnimatedGradientBackgroundProps {
  colors?: string[];
  speed?: number;
  className?: string;
}

export default function AnimatedGradientBackground({
  colors = ['from-purple-600/20', 'via-transparent', 'to-red-900/15'],
  speed = 8,
  className = '',
}: AnimatedGradientBackgroundProps) {
  const gradients = useMemo(() => {
    return colors.map((color, i) => ({
      id: i,
      color,
      duration: speed + i * 2,
    }));
  }, [colors, speed]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {gradients.map((gradient) => (
        <motion.div
          key={gradient.id}
          className={`absolute w-96 h-96 rounded-full bg-gradient-to-br ${gradient.color} blur-3xl`}
          style={{
            left: `${gradient.id * 30}%`,
            top: `${(gradient.id * 20) % 100}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: gradient.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
