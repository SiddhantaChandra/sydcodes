"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Scene3dDynamic from "../Scene3dDynamic";

import roadDesktop from "@/public/scene/roads.webp";
import roadTablet from "@/public/scene/roadsTablets.webp";
import roadMobile from "@/public/scene/roadsMobile.webp";

const SCENE_VARIANTS = {
  mobile: { distance: 5, speed: 1.2, yaxis: -5.3, zoom: -16 },
  tablet: { distance: 5, speed: 1.2, yaxis: -3.4, zoom: -12 },
  desktop: { distance: 13, speed: 1.2, yaxis: -3.7, zoom: -12 },
};

const getSceneVariant = (width) => {
  if (width >= 1024) {
    return "desktop";
  }

  if (width >= 640) {
    return "tablet";
  }

  return "mobile";
};

const HeroScene = ({ parallaxStyle }) => {
  const [sceneVariant, setSceneVariant] = useState("mobile");
  const [shouldRenderScene, setShouldRenderScene] = useState(false);

  useEffect(() => {
    const updateVariant = () => {
      setSceneVariant(getSceneVariant(window.innerWidth));
    };

    updateVariant();
    window.addEventListener("resize", updateVariant);

    let timeoutId;
    let idleId;
    let frameOne = requestAnimationFrame(() => {
      let frameTwo = requestAnimationFrame(() => {
        const activateScene = () => setShouldRenderScene(true);

        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(activateScene, { timeout: 1200 });
          return;
        }

        timeoutId = window.setTimeout(activateScene, 250);
      });

      frameOne = frameTwo;
    });

    return () => {
      window.removeEventListener("resize", updateVariant);
      cancelAnimationFrame(frameOne);

      if (idleId) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <motion.div
      className="hero-parallax-layer relative isolate h-screen w-full overflow-hidden"
      style={parallaxStyle}
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={roadDesktop.src} />
        <source media="(min-width: 640px)" srcSet={roadTablet.src} />
        <img
          src={roadMobile.src}
          alt="Road with a streetlight where my avatar is walking"
          width={roadMobile.width}
          height={roadMobile.height}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-auto w-full select-none"
        />
      </picture>

      <div className="absolute inset-0 z-10">
        {shouldRenderScene ? <Scene3dDynamic {...SCENE_VARIANTS[sceneVariant]} /> : null}
      </div>

      <div className="hero-desktop-road-overlay pointer-events-none absolute inset-0 z-[15] hidden lg:block" />
    </motion.div>
  );
};

export default HeroScene;
