"use client";

import { startTransition, useEffect, useRef, useState } from "react";

const SECTION_LOADERS = {
  experience: () => import("../sections/Experience"),
  projects: () => import("../sections/Projects"),
  expertise: () => import("../sections/TechnicalExpertise"),
  contact: () => import("../sections/ContactMe"),
  footer: () => import("../sections/Footer"),
};

const DEFAULT_PLACEHOLDER_CLASS =
  "w-full bg-[#0a0a0a] opacity-0 pointer-events-none";

export default function DeferredHomepageSection({
  section,
  minHeightClass = "min-h-[16rem]",
}) {
  const placeholderRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ResolvedSection, setResolvedSection] = useState(null);

  useEffect(() => {
    if (shouldLoad) {
      return undefined;
    }

    const placeholder = placeholderRef.current;
    if (!placeholder) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        rootMargin: "300px 0px",
      },
    );

    observer.observe(placeholder);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || ResolvedSection) {
      return undefined;
    }

    let cancelled = false;

    SECTION_LOADERS[section]().then((module) => {
      if (cancelled) {
        return;
      }

      startTransition(() => {
        setResolvedSection(() => module.default);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [ResolvedSection, section, shouldLoad]);

  if (ResolvedSection) {
    return <ResolvedSection />;
  }

  return (
    <div
      ref={placeholderRef}
      aria-hidden="true"
      className={`${DEFAULT_PLACEHOLDER_CLASS} ${minHeightClass}`}
    />
  );
}
