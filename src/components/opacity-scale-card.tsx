'use client';

import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

interface OpacityScaleCardProps {
  children: ReactNode;
  className?: string;
}

export default function OpacityScaleCard({ children, className = '' }: OpacityScaleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        opacity: isHovered ? 1 : 0.85,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
