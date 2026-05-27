'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';

export default function ParticleBackground() {
  const smoke = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const seed = i * 9.137;
        return {
          id: i,
          left: `${(seed * 7.7) % 100}%`,
          bottom: `${(seed * 3.3) % 28}%`,
          width: 180 + ((seed * 11.1) % 240),
          height: 120 + ((seed * 5.5) % 180),
          duration: 18 + ((seed * 2.3) % 16),
          delay: (seed * 0.9) % 8,
          drift: ((seed * 13.2) % 90) - 45,
          opacity: 0.2 + ((seed * 2.7) % 0.35),
          blur: 18 + ((seed * 4.1) % 28),
        };
      }),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
      <div className="absolute inset-0 bg-black" />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_45%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.015),transparent_40%)]"
        animate={{ opacity: [0.85, 1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {smoke.map((plume) => (
        <motion.div
          key={plume.id}
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: plume.left,
            bottom: plume.bottom,
            width: plume.width,
            height: plume.height,
            opacity: plume.opacity,
            filter: `blur(${plume.blur}px)`,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45) 0%, rgba(235,235,235,0.24) 28%, rgba(50,50,50,0.08) 60%, transparent 100%)',
          }}
          animate={{
            y: [0, -120, -320, -620],
            x: [0, plume.drift * 0.35, plume.drift, plume.drift * 1.2],
            scale: [0.85, 1.05, 1.15, 1.3],
            opacity: [0, plume.opacity * 0.9, plume.opacity, 0],
          }}
          transition={{
            duration: plume.duration,
            delay: plume.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute left-0 right-0 top-[18%] h-24 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl"
        animate={{ opacity: [0.15, 0.35, 0.18], y: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/10 via-white/5 to-transparent blur-3xl"
        animate={{ opacity: [0.14, 0.28, 0.16], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
