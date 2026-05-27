'use client';

import { useRef, useState, useCallback } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

interface MagneticOptions {
  strength?: number;
  damping?: number;
  mass?: number;
  stiffness?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const {
    strength = 0.5,
    damping = 0.5,
    mass = 1,
    stiffness = 100,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { damping, mass, stiffness });
  const springY = useSpring(y, { damping, mass, stiffness });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isHovered) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;

    x.set(distX);
    y.set(distY);
  }, [x, y, strength, isHovered]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return {
    ref,
    x: springX,
    y: springY,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}
