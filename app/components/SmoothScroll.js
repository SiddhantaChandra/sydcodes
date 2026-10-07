"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const compact = window.matchMedia("(max-width: 1023.98px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let animationFrameId;
    let overlayObserver;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    const destroy = () => {
      cancelAnimationFrame(animationFrameId);
      overlayObserver?.disconnect();
      overlayObserver = undefined;
      if (window.__lenis === lenis) window.__lenis = undefined;
      lenis?.destroy();
      lenis = undefined;
    };

    const updateMotion = () => {
      if (reducedMotion.matches) {
        destroy();
        return;
      }
      if (lenis) return;

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: compact.matches,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.7,
        allowNestedScroll: true,
      });
      window.__lenis = lenis;
      if (document.body.style.overflow === "hidden") {
        lenis.stop();
        // An open menu may still hold the instance from before a preference
        // change. Resume its replacement when that menu releases body scrolling.
        overlayObserver = new MutationObserver(() => {
          if (document.body.style.overflow === "hidden") return;
          lenis.start();
          overlayObserver.disconnect();
          overlayObserver = undefined;
        });
        overlayObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
      }

      lenis.on("scroll", ({ scroll, progress, velocity, direction, limit }) => {
        window.dispatchEvent(
          new CustomEvent("lenis:scroll", {
            detail: { scroll, progress, velocity, direction, limit },
          }),
        );
      });
      animationFrameId = requestAnimationFrame(raf);
    };

    const updateTouch = () => {
      if (!lenis) return;
      lenis.options.syncTouch = compact.matches;
      // End any touch inertia at the current position when changing layouts.
      lenis.scrollTo(lenis.actualScroll, { immediate: true });
    };

    updateMotion();
    compact.addEventListener("change", updateTouch);
    reducedMotion.addEventListener("change", updateMotion);

    return () => {
      compact.removeEventListener("change", updateTouch);
      reducedMotion.removeEventListener("change", updateMotion);
      destroy();
    };
  }, []);

  return children;
};

export default SmoothScroll;
