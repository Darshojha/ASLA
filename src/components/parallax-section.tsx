'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({
  children,
  offset = 100,
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
