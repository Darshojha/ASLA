'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedSkeletonProps {
  isLoading: boolean;
  children: ReactNode;
  skeletonCount?: number;
}

export default function AnimatedSkeleton({
  isLoading,
  children,
  skeletonCount = 3,
}: AnimatedSkeletonProps) {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-3"
        >
          {/* Skeleton bar */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-12 rounded-lg bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          {/* Secondary skeleton bar */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.3,
            }}
            className="h-8 rounded-lg bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 w-3/4"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
