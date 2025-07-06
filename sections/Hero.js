'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import BackgroundEffects from '@/components/HeroComponents/BackgroundEffects';
import Character3D from '@/components/HeroComponents/Scene3D';
import HeroText from '@/components/HeroComponents/HeroText';

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function Hero() {
  return (
    <section 
      id="home"
      className={cn(
        'min-h-screen flex items-center justify-center relative overflow-hidden',
        'bg-gradient-to-br from-background via-background to-primary/5'
      )}
    >
      {/* Hero Text */}
      <HeroText />
      {/* Background Effects */}
      <BackgroundEffects />
      {/* 3D Character Model */}
      <Character3D />
      {/* (Optional) Hero content here */}
    </section>
  );
} 