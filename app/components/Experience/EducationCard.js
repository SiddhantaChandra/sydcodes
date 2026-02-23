'use client';

import React, { useRef, useEffect } from 'react';

const EducationCard = ({ item }) => {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let lottie;
    let animation;

    const start = async () => {
      lottie = (await import('lottie-web')).default;
      if (!mounted) return;
      if (containerRef.current) {
        if (animRef.current) {
          try {
            animRef.current.destroy();
          } catch (e) {}
          animRef.current = null;
        }

        try {
          animation = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: item.lottie,
          });
          animRef.current = animation;
        } catch (e) {}
      }
    };

    start();

    return () => {
      mounted = false;
      if (animRef.current) {
        try {
          animRef.current.destroy();
        } catch (e) {}
        animRef.current = null;
      }
    };
  }, [item.lottie]);

  const handleMouseEnter = () => {
    if (animRef.current) {
      try {
        animRef.current.goToAndPlay(0, true);
      } catch (e) {
        try {
          animRef.current.play();
        } catch (e) {}
      }
    }
  };

  const handleMouseLeave = () => {
    if (animRef.current) {
      try {
        animRef.current.stop();
        animRef.current.goToAndStop(0, true);
      } catch (e) {
        try {
          animRef.current.stop();
        } catch (e) {}
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="hidden w-20 flex-col items-center lg:flex">
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={containerRef} className="h-12 w-12" />
          <span className="pointer-events-none absolute -right-6 top-1/2 h-px w-6 bg-border" />
        </div>
      </div>

      <article className="relative rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:bg-card lg:pl-6 w-full">
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <span
              className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-border lg:hidden"
              aria-hidden
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>

              <p className="mt-1 text-sm font-medium text-primary">{item.institution}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EducationCard;
