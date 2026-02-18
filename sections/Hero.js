'use client';
import { cn } from '@/lib/utils';
import BackgroundEffects from '@/components/HeroComponents/BackgroundEffects';
import HeroText from '@/components/HeroComponents/HeroText';
import SceneMobile from '@/components/HeroComponents/Scene/SceneMobile';
import SceneTablet from '@/components/HeroComponents/Scene/SceneTablet';
import SceneDesktop from '@/components/HeroComponents/Scene/SceneDesktop';

export default function Hero() {
  return (
    <section
      id="home"
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-[rgb(14,10,8)] via-[rgba(255,196,122,0.05)] to-[rgb(32,16,16)]'
      )}
    >
      <div className="relative">
        <HeroText />
      </div>

      <SceneMobile />
      <SceneTablet />
      <SceneDesktop />

      <BackgroundEffects />
    </section>
  );
}
