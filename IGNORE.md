"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

const contactLinks = [
  {
    label: "Email",
    value: "iamsiddhanta.10@gmail.com",
    href: "mailto:iamsiddhanta.10@gmail.com",
    accentClass: "text-[#f17c52]",
    accentColor: "#f17c52",
    description: "Best for project discussions and direct outreach.",
    icon: EnvelopeSimple,
  },
  {
    label: "LinkedIn",
    value: "siddhantachandra",
    href: "https://www.linkedin.com/in/siddhantachandra/",
    accentClass: "text-[#78c9ba]",
    accentColor: "#78c9ba",
    description: "Professional profile, experience, and current work.",
    icon: LinkedinLogo,
  },
  {
    label: "GitHub",
    value: "SiddhantaChandra",
    href: "https://github.com/SiddhantaChandra",
    accentClass: "text-[#d8b16a]",
    accentColor: "#d8b16a",
    description: "Code, experiments, and shipped projects.",
    icon: GithubLogo,
  },
  {
    label: "Download Resume",
    value: "SiddhantaChandra_CV.pdf",
    href: "/SiddhantaChandra_CV.pdf",
    accentClass: "text-[#f08a5d]",
    accentColor: "#f08a5d",
    description: "Full CV with experience, projects, and education.",
    icon: DownloadSimple,
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true, amount: 0.16 },
};

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true, amount: 0.18 },
};

function ContactCard({ item, shouldReduceMotion }) {
  const isExternal = item.href.startsWith("http");
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      download={item.href.endsWith(".pdf") ? true : undefined}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/18 hover:bg-white/[0.05] md:p-6"
      initial={shouldReduceMotion ? false : cardMotion.initial}
      whileInView={shouldReduceMotion ? undefined : cardMotion.whileInView}
      viewport={shouldReduceMotion ? undefined : cardMotion.viewport}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={
        shouldReduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }
      }
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <Icon
            className={`shrink-0 ${item.accentClass}`}
            size={18}
            weight="duotone"
          />
          <p
            className={`text-sm font-semibold tracking-[0.16em] uppercase ${item.accentClass}`}
          >
            {item.label}
          </p>
        </div>

        <p className="text-base font-semibold text-primary md:text-sm">
          {item.value}
        </p>
      </div>

      <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary/82 transition-colors duration-300 group-hover:text-primary">
        Open link
        <ArrowUpRight
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={16}
          weight="bold"
        />
      </span>
    </motion.a>
  );
}

export default function ContactMe() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      className="relative mx-auto max-w-4xl scroll-mt-28 px-5 pt-10 pb-18 lg:max-w-6xl lg:scroll-mt-32 lg:px-6 lg:pt-18 lg:pb-24 2xl:max-w-7xl"
      initial={shouldReduceMotion ? false : sectionMotion.initial}
      whileInView={shouldReduceMotion ? undefined : sectionMotion.whileInView}
      viewport={shouldReduceMotion ? undefined : sectionMotion.viewport}
    >
      <div className="mb-7 lg:mb-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          Contact Me
        </p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-[2.15rem]">
            Let&apos;s build something sharp and usable
          </h2>
          <p className="max-w-lg text-sm font-semibold leading-relaxed text-primary/65">
            Reach out directly, browse my work, or grab the resume.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contactLinks.map((item) => (
          <ContactCard
            key={item.label}
            item={item}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </motion.section>
  );
}
