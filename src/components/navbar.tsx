'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import AnimatedHoverButton from './animated-hover-button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { label: 'Explore', href: '#categories' },
    { label: 'Featured', href: '#featured' },
    { label: 'Archive', href: '#archive' },
    { label: 'Compare', href: '#comparison' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-primary/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-sm">A</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:inline">
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-accent" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
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
            className="md:hidden pb-4 pt-4 border-t border-primary/10"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-colors"
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
