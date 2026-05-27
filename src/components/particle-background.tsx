'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax motion on scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity1 = useTransform(scrollY, [0, 500], [0.3, 0.1]);
  const opacity2 = useTransform(scrollY, [0, 500], [0.2, 0.05]);

  // Memoized particle positions to avoid recalculation using deterministic values
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      // Use deterministic values based on index to avoid impure function calls
      const seed = i * 7.919; // Prime multiplier for distribution
      const x = (seed * 13.37) % 100;
      const y = (seed * 42.42) % 100;
      const size = ((seed * 3.14) % 1.5) + 0.5;
      const duration = ((seed * 2.71) % 20) + 15;
      const delay = (seed * 1.61) % 5;
      
      return {
        id: i,
        x: Math.abs(x),
        y: Math.abs(y),
        size,
        duration,
        delay,
      };
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0f0612] to-[#1a0a15]" />

      {/* Animated gradient overlays */}
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <motion.div
        style={{ y: y2, opacity: opacity2 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-900/15 to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, delay: 5 }}
      />

      {/* Smoke/Spark particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-b from-purple-500/40 to-transparent rounded-full blur-lg"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size * 20,
            height: particle.size * 20,
          }}
          animate={{
            y: [0, -300, -600],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Bullet trail effects */}
      {particles.slice(0, 10).map((particle) => {
        // Deterministic offset based on particle id
        const offsetX = ((particle.id * 7.3) % 40) - 20;
        return (
          <motion.div
            key={`bullet-${particle.id}`}
            className="absolute w-1 h-12 bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -400, -800],
              opacity: [0, 0.8, 0],
              x: [0, offsetX],
            }}
            transition={{
              duration: particle.duration + 5,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      })}

      {/* Glitch effect accent lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-2/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-red-700/15 to-transparent"
        animate={{
          opacity: [0.05, 0.2, 0.05],
          x: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
      />
    </div>
  );
}
