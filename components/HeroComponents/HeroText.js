'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroText() {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element || typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let scrollOffsetTargetY = 0;
    let scrollOffsetY = 0;

    const springStrength = 0.08;
    const damping = 0.86;
    const scrollFollowFactor = 0.22;
    const maxScrollOffset = 300;

    const animate = () => {
      const springForceX = (targetX - currentX) * springStrength;
      const springForceY = (targetY - currentY) * springStrength;

      velocityX = (velocityX + springForceX) * damping;
      velocityY = (velocityY + springForceY) * damping;

      currentX += velocityX;
      currentY += velocityY;
      scrollOffsetY += (scrollOffsetTargetY - scrollOffsetY) * 0.24;

      element.style.transform = `translate3d(${currentX}px, ${currentY + scrollOffsetY}px, 0) rotateX(${currentY * -0.2}deg) rotateY(${currentX * 0.2}deg)`;
      element.style.opacity = '1';

      rafId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (event.clientX - centerX) / centerX;
      const deltaY = (event.clientY - centerY) / centerY;

      targetX = deltaX * 10;
      targetY = deltaY * 8;
    };

    const handleScroll = () => {
      const nextOffset = Math.max(window.scrollY, 0) * scrollFollowFactor;
      scrollOffsetTargetY = Math.min(nextOffset, maxScrollOffset);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(rafId);
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.opacity = '1';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex flex-col items-center text-center select-none -mt-36 sm:-mt-24 md:-mt-28 lg:-mt-32 will-change-transform [transform-style:preserve-3d]"
    >
      <span className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-medium tracking-wide text-accent">
        Fullstack Developer
      </span>
      <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold text-primary mb-2 drop-shadow-lg">
        Siddhanta Chandra
      </h1>
      <p className="max-w-xl lg:max-w-2xl text-base md:text-lg lg:text-xl text-white px-4 mb-2 drop-shadow-lg">
       Fullstack Developer based in Kolkata, building robust architectures with creative designs and intuitive user interfaces.
      </p>
      <div className="mt-3 h-0.5 w-28 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]" />
    </div>
  );
} 