"use client";

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const TechStackPhysics = ({ technologies }) => {
  const containerRef = useRef(null);
  const [chipStates, setChipStates] = useState([]);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !technologies?.length) {
      setChipStates([]);
      return;
    }

    const {
      Engine,
      Runner,
      Bodies,
      Body,
      Composite,
      Events,
    } = Matter;

    const container = containerRef.current;
    const bounds = container.getBoundingClientRect();
    const width = Math.max(bounds.width, 320);
    const height = Math.max(bounds.height, 180);

    // start with gravity disabled; enable when container enters view
    const engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });

    const runner = Runner.create();
    const wallThickness = 50;

    const floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width + wallThickness * 2,
      wallThickness,
      { isStatic: true }
    );

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      { isStatic: true }
    );

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      { isStatic: true }
    );

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    const chips = technologies.map((tech, index) => {
      const label = typeof tech === 'string' ? tech : tech.name;
      const icon = typeof tech === 'object' && tech?.icon ? tech.icon : null;
      // estimate text width and add space when an icon is present
      const textEstimate = Math.max(80, label.length * 8 + 30);
      const iconExtra = icon ? 22 : 0; // reserve space for icon + gap
      const chipWidth = textEstimate + iconExtra;
      // group chips horizontally on the right side
      const rightMargin = 60;
      const gap = 8;
      const initialX = Math.min(
        width - 50,
        Math.max(50, width - rightMargin - index * (chipWidth + gap))
      );

      const chip = Bodies.rectangle(
        Math.min(width - 50, Math.max(50, initialX)),
        -20 - index * 30,
        chipWidth,
        36,
        {
          restitution: 0.45,
          friction: 0.12,
          frictionAir: 0.02,
          density: 0.001,
          chamfer: { radius: 18 },
        }
      );

      chip.label = label;
      chip.plugin = Object.assign({}, chip.plugin, { chipWidth });

      return chip;
    });

    Composite.add(engine.world, chips);

    // do not create Matter mouse/mouseConstraint here to avoid intercepting
    // wheel/scroll events when cursor is over the container. This prevents
    // blocking page scroll while still allowing physics to run.

    let frameId;

    const syncChips = () => {
      setChipStates(
        chips.map((chip, i) => {
          const tech = technologies[i];
          const icon = typeof tech === 'object' && tech?.icon ? tech.icon : null;
          return {
            x: chip.position.x,
            y: chip.position.y,
            angle: chip.angle,
            label: chip.label,
            width: chip.plugin?.chipWidth || 90,
            icon,
          };
        })
      );
    };

    Events.on(engine, 'afterUpdate', syncChips);
    Runner.run(runner, engine);

    // Kick function to nudge chips when they are released
    const kickChips = (down = 0.6) => {
      chips.forEach((chip) => {
        Body.setVelocity(chip, {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() * 0.5) + down,
        });
      });
    };

    const animate = () => {
      syncChips();
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // observe when the container first scrolls into view and then enable gravity
    let observer;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            engine.gravity.y = 1;
            // small delay to let things settle then nudge
            setTimeout(() => kickChips(0.8), 80);
          }
        },
        { threshold: 0.12 }
      );

      if (container) observer.observe(container);
    } catch (e) {
      // IntersectionObserver may not be available in some envs — fallback to immediate start
      if (!startedRef.current) {
        startedRef.current = true;
        engine.gravity.y = 1;
        setTimeout(() => kickChips(0.8), 80);
      }
    }

    return () => {
      // clear any pending observers/kicks
      if (observer && observer.disconnect) observer.disconnect();
      cancelAnimationFrame(frameId);
      Events.off(engine, 'afterUpdate', syncChips);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [technologies]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {chipStates.map((chip, index) => (
        <div
          key={`${chip.label}-${index}`}
          className="pointer-events-none absolute flex h-8 select-none items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 text-xs font-medium text-primary/95 backdrop-blur-sm"
          style={{
            width: `${chip.width}px`,
            transform: `translate(${chip.x - chip.width / 2}px, ${chip.y - 16}px) rotate(${chip.angle}rad)`,
            willChange: 'transform',
          }}
        >
          {chip.icon ? (
            <img src={chip.icon} alt={chip.label} className="h-4 w-4 object-contain" />
          ) : null}
          <span className="truncate">{chip.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TechStackPhysics;
