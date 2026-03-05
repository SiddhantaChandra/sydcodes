"use client";

import Image from "next/image";
import React, { useState } from "react";

import textStroked from "@/public/text/siddhanta-stroked.webp";
import textFilled from "@/public/text/siddhanta-filled.webp";

const HeroText = () => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  const handleRevealMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setCursorPosition({ x, y });
  };

  const revealMask = `radial-gradient(circle 90px at ${cursorPosition.x}% ${cursorPosition.y}%, black 0%, black 58%, transparent 72%)`;
  const concealMask = `radial-gradient(circle 90px at ${cursorPosition.x}% ${cursorPosition.y}%, transparent 0%, transparent 58%, black 72%)`;

  return (
    <div className="absolute inset-0 z-20 flex flex-col -top-35 items-center justify-center text-center select-none">
      <span className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-medium tracking-wide text-accent">
        Fullstack Developer
      </span>
      <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold text-primary mb-2 drop-shadow-lg lg:hidden">
        Siddhanta Chandra
      </h1>
      <div
        className="relative hidden lg:block lg:w-2xl mb-4"
        onMouseEnter={() => setIsRevealing(true)}
        onMouseMove={handleRevealMove}
        onMouseLeave={() => setIsRevealing(false)}
      >
        <Image
          src={textStroked}
          alt="Siddhanta Chandra"
          className="w-full h-auto pointer-events-none"
          style={{
            opacity: isRevealing ? 1 : 0,
            WebkitMaskImage: isRevealing ? revealMask : "none",
            maskImage: isRevealing ? revealMask : "none",
            transition: "opacity 200ms ease",
          }}
        />
        <Image
          src={textFilled}
          alt="Siddhanta Chandra"
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            WebkitMaskImage: isRevealing ? concealMask : "none",
            maskImage: isRevealing ? concealMask : "none",
          }}
        />
      </div>
      <p className="max-w-xl lg:max-w-2xl text-base md:text-lg lg:text-xl text-white px-4 mb-2 drop-shadow-lg">
        Fullstack Developer based in Kolkata, building robust architectures with
        creative designs and intuitive user interfaces.
      </p>
      <div className="mt-3 h-0.5 w-28 rounded-full bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_100%]" />
    </div>
  );
};

export default HeroText;
