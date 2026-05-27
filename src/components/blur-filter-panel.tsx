'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState } from 'react';

interface BlurFilterPanelProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
}

export default function BlurFilterPanel({ trigger, children, title }: BlurFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        {trigger}
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
              transition={{ duration: 0.3 }}
            />

            {/* Panel with blur-in transition */}
            <motion.div
              layoutId="filter-panel"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', y: -10 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', y: -10 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-96 max-w-[90vw] p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/60 border border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
              {title && (
                <h3 className="font-display font-bold text-lg mb-4 text-foreground">{title}</h3>
              )}
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
