'use client';

import { cn } from '@/lib/utils';
import BackgroundEffects from '@/components/HeroComponents/BackgroundEffects';
import Character3D from '@/components/HeroComponents/Scene3D';
import HeroText from '@/components/HeroComponents/HeroText';

export default function Hero() {
  return (
    <section 
      id="home"
      className={cn(
        'min-h-screen flex items-center justify-center relative overflow-hidden',
        'bg-gradient-to-br from-background via-white/5 to-primary/10'
      )}
    >
      {/* Hero Text */}
      <HeroText  />
      {/* Background Effects */}
      <BackgroundEffects />
      {/* 3D Character Model */}
      <Character3D />
    </section>
  );
} 