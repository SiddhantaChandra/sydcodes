"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import HeroText from "../components/Hero/HeroText";
import HeroScene from "../components/Hero/HeroScene";

const Hero = () => {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, {
    stiffness: 90,
    damping: 22,
    mass: 0.45,
  });
  const smoothPointerY = useSpring(pointerY, {
    stiffness: 90,
    damping: 22,
    mass: 0.45,
  });
  const smoothScroll = useSpring(scrollProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.55,
  });

  const textMouseX = useTransform(smoothPointerX, [-1, 1], [-6, 6]);
  const textMouseY = useTransform(smoothPointerY, [-1, 1], [-4, 4]);
  const textScrollY = useTransform(smoothScroll, [-1, 1], [-10, 10]);
  const textPointerRotate = useTransform(smoothPointerX, [-1, 1], [-0.25, 0.25]);
  const textScrollRotate = useTransform(smoothScroll, [-1, 1], [-0.15, 0.15]);

  const sceneMouseX = useTransform(smoothPointerX, [-1, 1], [-3, 3]);
  const sceneMouseY = useTransform(smoothPointerY, [-1, 1], [-2, 2]);
  const sceneScrollY = useTransform(smoothScroll, [-1, 1], [-4, 4]);

  const textOffsetY = useTransform(
    () => textMouseY.get() + textScrollY.get(),
  );
  const textRotate = useTransform(
    () => textPointerRotate.get() + textScrollRotate.get(),
  );
  const sceneOffsetY = useTransform(
    () => sceneMouseY.get() + sceneScrollY.get(),
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (prefersReducedMotion || !heroRef.current) {
        return;
      }

      const rect = heroRef.current.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      pointerX.set(Math.max(-1, Math.min(1, normalizedX)));
      pointerY.set(Math.max(-1, Math.min(1, normalizedY)));
    },
    [pointerX, pointerY, prefersReducedMotion],
  );

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  useEffect(() => {
    if (prefersReducedMotion) {
      scrollProgress.set(0);
      resetPointer();
      return;
    }

    const updateScrollProgress = () => {
      if (!heroRef.current) {
        return;
      }

      const rect = heroRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const heroCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = (viewportHeight + rect.height) / 2;
      const nextProgress = (viewportCenter - heroCenter) / distance;

      scrollProgress.set(Math.max(-1, Math.min(1, nextProgress)));
    };

    updateScrollProgress();
    window.addEventListener("lenis:scroll", updateScrollProgress);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("lenis:scroll", updateScrollProgress);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [prefersReducedMotion, resetPointer, scrollProgress]);

  const textParallax = prefersReducedMotion
    ? undefined
    : {
        x: textMouseX,
        y: textOffsetY,
        rotate: textRotate,
      };

  const sceneParallax = prefersReducedMotion
    ? undefined
    : {
        x: sceneMouseX,
        y: sceneOffsetY,
      };

  return (
    <section
      ref={heroRef}
      className="relative overflow-x-clip bg-black"
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <HeroText parallaxStyle={textParallax} />
      <HeroScene parallaxStyle={sceneParallax} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-linear-to-b from-transparent to-background" />
    </section>
  );
};

export default Hero;
