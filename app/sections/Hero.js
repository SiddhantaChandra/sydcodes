import React from "react";
import MobileScene from "../components/Hero/MobileScene";
import TabletScene from "../components/Hero/TabletScene";
import DesktopScene from "../components/Hero/DesktopScene";
import HeroText from "../components/Hero/HeroText";

const Hero = () => {
  return (
    <section className="relative gradient" id="#home">
      <HeroText />
      <MobileScene />
      <TabletScene />
      <DesktopScene />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-linear-to-b from-transparent to-background" />

      <a
        href="#journey"
        className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full border border-primary/30 bg-background/60 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm transition hover:border-accent hover:text-accent"
      >
        Scroll to Journey ↓
      </a>
    </section>
  );
};

export default Hero;
