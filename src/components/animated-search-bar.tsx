'use client';

import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useState, useCallback } from 'react';

interface AnimatedSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function AnimatedSearchBar({
  placeholder = 'Search weapons...',
  onSearch,
}: AnimatedSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <motion.div
      animate={{
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="relative"
    >
      {/* Animated background blur effect */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-purple-500/10"
        style={{
          filter: isFocused ? 'blur(8px)' : 'blur(0px)',
        }}
      />

      {/* Search container */}
      <motion.div
        animate={{
          borderColor: isFocused ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0.2)',
          boxShadow: isFocused
            ? '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)'
            : '0 0 0px rgba(168, 85, 247, 0)',
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl backdrop-blur-xl bg-gradient-to-r from-gray-800/60 to-gray-900/40 border border-purple-500/20 p-1"
      >
        <div className="flex items-center px-4 py-3 gap-3">
          {/* Search icon */}
          <motion.div
            animate={{ scale: isFocused ? 1.1 : 1, color: isFocused ? '#a855f7' : '#9ca3af' }}
            transition={{ duration: 0.2 }}
          >
            <Search className="w-5 h-5" />
          </motion.div>

          {/* Input */}
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch?.(query);
              }
            }}
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground font-medium text-lg"
          />

          {/* Clear button */}
          {query && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="p-1 rounded-lg hover:bg-purple-500/20 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
