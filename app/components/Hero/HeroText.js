"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

import textStroked from "@/public/text/siddhanta-stroked.webp";
import textFilled from "@/public/text/siddhanta-filled.webp";
import resumeIcon from "@/public/general-icons/download_resume_icon.svg";

const HeroText = ({ parallaxStyle }) => {
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
    <motion.div
      className="hero-parallax-layer absolute inset-0 z-20 flex flex-col -top-35 items-center justify-center text-center select-none"
      style={parallaxStyle}
    >
      <span className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-medium tracking-wide text-accent">
        Fullstack Developer
      </span>
      <h1 className="mb-2">
        <span className="inline-block text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary drop-shadow-lg lg:hidden">
          Siddhanta Chandra
        </span>
        <span
          className="relative hidden lg:block lg:w-2xl xl:w-3xl mb-4"
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
        </span>
      </h1>
      <p className="max-w-xl lg:max-w-2xl text-base md:text-lg lg:text-xl text-white px-4 mb-2 drop-shadow-lg">
        Fullstack Developer based in Kolkata, building robust architectures with
        creative designs and intuitive user interfaces.
      </p>
      <Link
        href="/SiddhantaChandra_CV.pdf"
        download
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-black hover:bg-primary/90 transition-colors duration-200"
      >
        <Image src={resumeIcon} alt="" className="h-4 w-4" />
        Download Resume
      </Link>
      <div className="mt-3 h-0.5 w-28 rounded-full bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_100%]" />
    </motion.div>
  );
};

export default HeroText;
