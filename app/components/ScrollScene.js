"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import CompactScrollItem from "./CompactScrollItem";

export default function ScrollScene({ id, children, enableExit = true }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const contentRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [canPin, setCanPin] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );

    const updateLayout = () => {
      const styles = window.getComputedStyle(stage);
      const requiredHeight = content.offsetHeight
        + parseFloat(styles.paddingTop)
        + parseFloat(styles.paddingBottom);
      setCanPin(media.matches && requiredHeight <= window.innerHeight);
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(content);
    observer.observe(stage);
    window.addEventListener("resize", updateLayout);
    media.addEventListener("change", updateLayout);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
      media.removeEventListener("change", updateLayout);
    };
  }, []);

  const animated = canPin && !reduceMotion;

  return (
    <section
      ref={sectionRef}
      id={id}
      data-pinned={animated}
      data-exit-enabled={enableExit}
      className="scroll-scene relative w-full scroll-mt-28 bg-[#0f0f0f] lg:scroll-mt-32"
    >
      <div ref={stageRef} className="scroll-scene-stage">
        <div
          ref={contentRef}
          className="scroll-scene-content section-content mx-auto w-full max-w-4xl px-5 lg:max-w-6xl lg:px-6 2xl:max-w-7xl"
        >
          {children({ progress: scrollYProgress, animated, enableExit })}
        </div>
      </div>
    </section>
  );
}

export function ScrollSceneItem({
  children,
  progress,
  animated,
  enableExit = true,
  index = 0,
  enterX = 0,
  enterY = 64,
  exitX = -48,
  exitY = -64,
  enterScale = 1,
  exitScale = 1,
  className = "",
  compactPreset = "group",
}) {
  // Entry-only scenes use 200vh; exit scenes add another 100vh.
  // Small stagger offsets stay inside the entry phase so the hold is motionless.
  const entryStart = index * 0.02;
  const entryEnd = enableExit ? 1 / 3 : 1 / 2;
  const exitStart = 2 / 3 + index * 0.015;
  const phases = [entryStart, entryEnd, exitStart, 1];
  const x = useTransform(progress, phases, [enterX, 0, 0, enableExit ? exitX : 0]);
  const y = useTransform(progress, phases, [enterY, 0, 0, enableExit ? exitY : 0]);
  const scale = useTransform(progress, phases, [enterScale, 1, 1, enableExit ? exitScale : 1]);
  const opacity = useTransform(
    progress,
    [entryStart, (entryStart + entryEnd) / 2, (exitStart + 1) / 2, 1],
    [0, 1, 1, enableExit ? 0 : 1],
  );

  return (
    <CompactScrollItem
      preset={compactPreset}
      className={`scroll-scene-item ${className}`}
      desktopMotion={{
        style: {
          x: animated ? x : 0,
          y: animated ? y : 0,
          scale: animated ? scale : 1,
          opacity: animated ? opacity : 1,
        },
      }}
    >
      {children}
    </CompactScrollItem>
  );
}
