import React from "react";
import MobileScene from "../components/Hero/MobileScene";
import TabletScene from "../components/Hero/TabletScene";
import DesktopScene from "../components/Hero/DesktopScene";
import HeroText from "../components/Hero/HeroText";

const Hero = () => {
  return (
    <section className="relative bg-black" id="home">
      <HeroText />
      <MobileScene />
      <TabletScene />
      <DesktopScene />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-linear-to-b from-transparent to-background" />
    </section>
  );
};

export default Hero;
