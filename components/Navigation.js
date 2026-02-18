'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import logo1 from '@/public/images/logoStyle1.webp'
import logo2 from '@/public/images/logoStyle2.webp'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const scrollDirection = useScrollDirection();

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={{
        y: scrollDirection === 'down' ? -120 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="relative w-full max-w-4xl sm:max-w-2xl xl:max-w-4xl 2xl:max-w-7xl">
        <div className="flex items-center gap-5 rounded-full px-6 py-3 bg-[rgba(22,17,14,0.88)] border border-white/10 shadow-[0_12px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className=""
            onClick={() => setActive('Home')}
          >
            <Image src={logo1} alt='Logo' className='h-7 w-auto lg:hidden' />
            <Image src={logo2} alt='Logo' className='h-7 w-auto hidden lg:block' />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:justify-end items-center gap-2 flex-1">
            {navItems.map((item) => {
              const isActive = active === item.name;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                    isActive
                      ? 'bg-primary text-[rgba(26,18,14,0.9)] shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
                      : 'text-primary/85 hover:text-primary hover:bg-white/5'
                  )}
                >
                  {item.name}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="md:hidden ml-auto p-2 rounded-full text-primary hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/60"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 z-40"
            >
              <div className="absolute inset-0 bg-accent">
                <div className="absolute -top-12 right-6 w-40 h-40 bg-white/6 rounded-full blur-3xl" />
                <div className="absolute bottom-0 -left-12 w-44 h-44 bg-white/5 rounded-full blur-3xl" />
              </div>

              <div className="relative h-full px-6 pt-6 pb-10 flex flex-col text-primary">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Image src={logo1} alt='Logo' className='h-16 w-16' />
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="p-2 rounded-full border border-primary/40 text-primary"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <nav className="flex-1 space-y-3">
                  {navItems.map((item, index) => {
                    const isActive = active === item.name;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setActive(item.name);
                          setIsOpen(false);
                        }}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-2xl border border-transparent transition-all duration-200',
                          isActive
                            ? 'bg-primary text-[rgba(26,18,14,0.9)] shadow-[0_10px_28px_rgba(0,0,0,0.25)]'
                            : 'text-primary/90 hover:text-primary/100'
                        )}
                      >
                        <span className="text-xs font-semibold tracking-wide text-primary/70">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="w-8 h-px bg-primary/40" />
                        <span className="text-sm font-semibold">{item.name}</span>
                        {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-[rgba(26,18,14,0.9)]" />}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
