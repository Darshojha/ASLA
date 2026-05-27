'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface CinematicModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  clickPosition?: { x: number; y: number };
}

export default function CinematicModal({
  isOpen,
  onClose,
  children,
  clickPosition,
}: CinematicModalProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            transition={{ duration: 0.3 }}
          />

          {/* Modal with cinematic easing */}
          <motion.div
            layoutId="cinematic-modal"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom cinematic easing
            }}
            className="fixed inset-4 sm:inset-8 z-50 flex items-center justify-center pointer-events-auto"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
