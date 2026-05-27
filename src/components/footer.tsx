'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Categories', href: '#categories' },
        { label: 'Comparison', href: '#comparison' },
        { label: 'Search', href: '#search' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Specifications', href: '#' },
        { label: 'Historical Data', href: '#' },
        { label: 'References', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Privacy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer id="about" className="relative bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-zinc-100 to-zinc-400 rounded-lg flex items-center justify-center">
                <span className="font-bold text-zinc-950 text-sm">A</span>
              </div>
              <span className="font-display font-bold text-xl text-zinc-100">ASLA</span>
            </div>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              A curated one-page firearms reference built around factual specifications, restrained presentation, and a focused browsing experience.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-200 transition-colors"
                    title={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="font-display font-bold text-zinc-100 mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <div className="text-sm text-zinc-400 text-center sm:text-left">
            <p className="flex items-center justify-center sm:justify-start gap-1">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-zinc-200 fill-zinc-200" />
              </motion.span>
              {' '}by ASLA Team © {currentYear}. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-zinc-400">
            <motion.a href="#" whileHover={{ color: '#f4f4f5' }} className="hover:text-zinc-100 transition-colors">
              Terms of Service
            </motion.a>
            <motion.a href="#" whileHover={{ color: '#f4f4f5' }} className="hover:text-zinc-100 transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a href="#" whileHover={{ color: '#f4f4f5' }} className="hover:text-zinc-100 transition-colors">
              Cookies
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
