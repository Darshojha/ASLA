'use client';

import { motion } from 'motion/react';
import { ReactNode, useRef, useState, useCallback } from 'react';

interface MouseFollowCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function MouseFollowCard({
  children,
  className = '',
  intensity = 0.1,
}: MouseFollowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isHovered) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * intensity;
    const y = (e.clientY - centerY) * intensity;

    setMousePosition({ x, y });
  }, [isHovered, intensity]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
