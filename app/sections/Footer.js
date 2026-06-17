"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";

import logoLarge from "@/public/logo-large.webp";
import logoShort from "@/public/logo-short.webp";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
];

const containerMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true, amount: 0.2 },
};

const itemMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true, amount: 0.2 },
};

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-primary/10 bg-[#121212]">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col gap-6 px-5 py-8 lg:max-w-6xl lg:gap-8 lg:px-6 lg:py-12 2xl:max-w-7xl"
        initial={shouldReduceMotion ? false : containerMotion.initial}
        whileInView={shouldReduceMotion ? undefined : containerMotion.whileInView}
        viewport={shouldReduceMotion ? undefined : containerMotion.viewport}
      >
        {/* Desktop: multi-row layout */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Top row: logo, nav, back-to-top */}
          <motion.div
            className="flex flex-col items-center gap-5 lg:flex-row lg:items-start lg:justify-between"
            initial={shouldReduceMotion ? false : itemMotion.initial}
            whileInView={shouldReduceMotion ? undefined : itemMotion.whileInView}
            viewport={shouldReduceMotion ? undefined : itemMotion.viewport}
          >
            {/* Logo */}
            <Link href="#home" aria-label="Back to home" className="shrink-0">
              <Image
                src={logoLarge}
                alt="Siddhanta"
                className="hidden h-8 w-auto lg:block"
              />
              <Image
                src={logoShort}
                alt="Siddhanta"
                className="h-8 w-auto lg:hidden"
              />
            </Link>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:gap-x-7">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={`#${link.id}`}
                      className="text-sm font-semibold text-primary/75 transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex items-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-sm font-semibold text-primary/75 transition-all duration-200 hover:border-accent/40 hover:text-accent"
            >
              Top
              <ArrowUp
                size={14}
                weight="bold"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.div>

          {/* Bottom row: copyright */}
          <motion.div
            className="flex flex-col items-center justify-between gap-3 border-t border-primary/10 pt-6 text-center lg:flex-row lg:text-left"
            initial={shouldReduceMotion ? false : itemMotion.initial}
            whileInView={shouldReduceMotion ? undefined : itemMotion.whileInView}
            viewport={shouldReduceMotion ? undefined : itemMotion.viewport}
          >
            <p className="text-xs font-medium text-primary/45">
              © {new Date().getFullYear()} Siddhanta Chandra. All rights reserved.
            </p>
            <p className="text-xs font-medium text-primary/45">
              Designed & built with care.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
