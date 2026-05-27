'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Moon, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import AnimatedHoverButton from './animated-hover-button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  const navItems = [
    { label: 'Explore', href: '#categories' },
    { label: 'Featured', href: '#featured' },
    { label: 'Archive', href: '#archive' },
    { label: 'Compare', href: '#comparison' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-sm">
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-zinc-100 to-zinc-400 rounded-lg flex items-center justify-center shadow-sm shadow-black/40">
              <span className="font-bold text-zinc-950 text-sm">A</span>
            </div>
            <span className="font-display font-bold text-xl text-zinc-100 hidden sm:inline">
              ASLA
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle, Explore Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Animated Hovering Explore Button */}
            <AnimatedHoverButton
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              variant="accent"
              size="sm"
              floatingAnimation={true}
              className="hidden sm:block"
            >
              <Zap className="w-4 h-4" />
              Explore
            </AnimatedHoverButton>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme('dark')}
              title="Dark mode locked"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Moon className="w-5 h-5 text-zinc-200" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 pt-4 border-t border-white/10"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
