"use client";

import { useLayoutEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const COMPACT_QUERY = "(max-width: 1023.98px)";
const MOTION_QUERY = `${COMPACT_QUERY} and (prefers-reduced-motion: no-preference)`;
const spring = { stiffness: 220, damping: 32, mass: 0.45 };
const entryEnd = 0.65;
const exitStart = 0.2;
const presets = {
  heading: { y: 40, opacity: 0.45, scale: 1, exitY: -20, exitOpacity: 0.65, exitScale: 1 },
  card: { y: 64, opacity: 0.3, scale: 0.95, exitY: -32, exitOpacity: 0.6, exitScale: 0.98 },
  group: { y: 48, opacity: 0.4, scale: 1, exitY: -24, exitOpacity: 0.65, exitScale: 1 },
  form: { y: 40, opacity: 0.55, scale: 0.99, exitY: 0, exitOpacity: 1, exitScale: 1 },
  footer: { y: 32, opacity: 0.55, scale: 1, exitY: 0, exitOpacity: 1, exitScale: 1 },
};
const elements = { div: motion.div, article: motion.article, h2: motion.h2, h3: motion.h3 };

function createMediaStore(query) {
  let media;
  const getMedia = () => (media ??= window.matchMedia(query));
  return {
    subscribe: (notify) => {
      getMedia().addEventListener("change", notify);
      return () => getMedia().removeEventListener("change", notify);
    },
    getSnapshot: () => getMedia().matches,
    getServerSnapshot: () => false,
  };
}

const compactStore = createMediaStore(COMPACT_QUERY);
const motionStore = createMediaStore(MOTION_QUERY);

export function useCompactViewport() {
  return useSyncExternalStore(compactStore.subscribe, compactStore.getSnapshot, compactStore.getServerSnapshot);
}

const clamp = (value) => Math.min(1, Math.max(0, value));

// This child owns the scroll subscriptions. The parent DOM and its content stay
// mounted when resizing, so forms and carousels retain their state.
function CompactScrollTracker({ target, preset, values }) {
  const settings = presets[preset];
  const { scrollYProgress: entry } = useScroll({
    target,
    offset: preset === "footer" ? ["start end", "end end"] : ["start end", `start ${entryEnd}`],
    trackContentSize: true,
  });
  const { scrollYProgress: exit } = useScroll({
    target,
    offset: [`end ${exitStart}`, "end start"],
    trackContentSize: true,
  });
  const yTarget = useTransform([entry, exit], ([enterProgress, exitProgress]) => (
    settings.y * (1 - enterProgress) + settings.exitY * exitProgress
  ));
  const y = useSpring(yTarget, spring);
  const scaleTarget = useTransform([entry, exit], ([enterProgress, exitProgress]) => (
    1 + (settings.scale - 1) * (1 - enterProgress) + (settings.exitScale - 1) * exitProgress
  ));
  const scale = useSpring(scaleTarget, spring);
  const opacity = useTransform([entry, exit], ([enterProgress, exitProgress]) => (
    1 - (1 - settings.opacity) * (1 - enterProgress) - (1 - settings.exitOpacity) * exitProgress
  ));

  useLayoutEffect(() => {
    // Seed from layout coordinates, ignoring our own transform. This prevents a
    // replay from the entry pose after hydration or restored/anchor scrolling.
    let top = 0;
    for (let element = target.current; element; element = element.offsetParent) {
      top += element.offsetTop;
    }
    top -= window.scrollY;
    const height = target.current.offsetHeight;
    const viewport = window.innerHeight;
    const enterProgress = clamp((viewport - top) / Math.max(1, preset === "footer" ? height : viewport * (1 - entryEnd)));
    const exitProgress = clamp((viewport * exitStart - top - height) / Math.max(1, viewport * exitStart));
    const initialY = settings.y * (1 - enterProgress) + settings.exitY * exitProgress;
    const initialScale = 1 + (settings.scale - 1) * (1 - enterProgress) + (settings.exitScale - 1) * exitProgress;
    const initialOpacity = 1 - (1 - settings.opacity) * (1 - enterProgress) - (1 - settings.exitOpacity) * exitProgress;

    entry.jump(enterProgress);
    exit.jump(exitProgress);
    yTarget.jump(initialY);
    scaleTarget.jump(initialScale);
    y.jump(initialY);
    scale.jump(initialScale);
    opacity.jump(initialOpacity);
    values.y.jump(initialY);
    values.scale.jump(initialScale);
    values.opacity.jump(initialOpacity);

    const unsubscribe = [
      y.on("change", (value) => values.y.set(value)),
      scale.on("change", (value) => values.scale.set(value)),
      opacity.on("change", (value) => values.opacity.set(value)),
    ];
    return () => unsubscribe.forEach((stop) => stop());
  }, [target, preset, settings, values, entry, exit, yTarget, scaleTarget, y, scale, opacity]);

  return null;
}

export default function CompactScrollItem({
  as = "div",
  preset = "group",
  desktopMotion,
  className = "",
  children,
  ...props
}) {
  const target = useRef(null);
  const isCompact = useCompactViewport();
  const enabled = useSyncExternalStore(motionStore.subscribe, motionStore.getSnapshot, motionStore.getServerSnapshot);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const values = useMemo(() => ({ y, scale, opacity }), [y, scale, opacity]);
  const Element = elements[as];
  const motionProps = isCompact || !desktopMotion
    ? { initial: false, style: enabled ? values : { y: 0, scale: 1, opacity: 1 } }
    : desktopMotion;

  return (
    <Element
      {...props}
      {...motionProps}
      ref={target}
      data-compact-active={enabled}
      className={`compact-scroll-item ${className}`}
    >
      {children}
      {enabled && <CompactScrollTracker target={target} preset={preset} values={values} />}
    </Element>
  );
}
