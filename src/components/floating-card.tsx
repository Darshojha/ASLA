'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  scrollOffset?: number;
  delay?: number;
  className?: string;
}

export default function FloatingCard({
  children,
  scrollOffset = 50,
  delay = 0,
  className = '',
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, scrollOffset]);
  const rotation = useTransform(scrollY, [0, 1000], [0, 2]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: rotation }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
