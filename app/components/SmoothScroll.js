"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    window.__lenis = lenis;

    lenis.on("scroll", ({ scroll, progress, velocity, direction, limit }) => {
      window.dispatchEvent(
        new CustomEvent("lenis:scroll", {
          detail: { scroll, progress, velocity, direction, limit },
        }),
      );
    });

    let animationFrameId;
    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return children;
};

export default SmoothScroll;