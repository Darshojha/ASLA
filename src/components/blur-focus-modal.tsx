'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface BlurFocusModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  blurAmount?: number;
}

export default function BlurFocusModal({
  isOpen,
  children,
  onClose,
  blurAmount = 8,
}: BlurFocusModalProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Blur-to-focus backdrop */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            animate={{ backdropFilter: `blur(${blurAmount}px)`, opacity: 1 }}
            exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Focus-in content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
