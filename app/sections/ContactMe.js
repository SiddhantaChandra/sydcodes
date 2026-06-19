"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import ContactForm from "../components/Contact/ContactForm";

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
    mobileLabel: "Resume",
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

function ContactCard({ item, shouldReduceMotion, index }) {
  const isExternal = item.href.startsWith("http");
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      download={item.href.endsWith(".pdf") ? true : undefined}
      className={`contact-card-shell group relative flex h-full min-h-[11.1rem] flex-col justify-between overflow-hidden p-4 md:min-h-[13rem] md:p-6 ${
        index % 2 === 1 ? "mt-6 md:mt-0" : ""
      }`}
      initial={shouldReduceMotion ? false : cardMotion.initial}
      whileInView={shouldReduceMotion ? undefined : cardMotion.whileInView}
      viewport={shouldReduceMotion ? undefined : cardMotion.viewport}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={
        shouldReduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }
      }
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 360 260"
        preserveAspectRatio="none"
      >
        <path
          d="M16 1H344C352.284 1 359 7.716 359 16V213C359 221.284 352.284 228 344 228H253C241 228 234 233 228 241L215 254C209 260 202 259 193 259H16C7.716 259 1 252.284 1 244V16C1 7.716 7.716 1 16 1Z"
          className="contact-card-shape"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10">
        <div className="mb-3 flex items-start gap-2.5 md:mb-4 md:items-center md:gap-3">
          <Icon
            className={`shrink-0 ${item.accentClass}`}
            size={14}
            weight="duotone"
          />
          <p
            className={`text-[0.68rem] font-semibold tracking-[0.16em] uppercase ${item.accentClass} md:text-sm`}
          >
            <span className="md:hidden">{item.mobileLabel ?? item.label}</span>
            <span className="hidden md:inline">{item.label}</span>
          </p>
        </div>

        <p className="break-words text-[0.65rem] leading-snug font-semibold text-primary md:text-sm">
          {item.value}
        </p>
      </div>

      <span className="relative z-10 mt-5 inline-flex items-center gap-1 text-[0.76rem] font-medium text-primary/82 transition-colors duration-300 group-hover:text-primary md:mt-8 md:gap-1.5 md:text-sm">
        Open link
        <ArrowUpRight
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={13}
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
      className="relative w-full scroll-mt-28 bg-[#0f0f0f] lg:scroll-mt-32"
      initial={shouldReduceMotion ? false : sectionMotion.initial}
      whileInView={shouldReduceMotion ? undefined : sectionMotion.whileInView}
      viewport={shouldReduceMotion ? undefined : sectionMotion.viewport}
    >
      <div className="mx-auto max-w-4xl px-5 pt-10 pb-18 lg:max-w-6xl lg:px-6 lg:pt-18 lg:pb-24 2xl:max-w-7xl">
        <div className="mb-7 lg:mb-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          Contact Me
        </p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-[2.15rem]">
            Let&apos;s build something together.
          </h2>
          {/* <p className="max-w-lg text-sm font-semibold leading-relaxed text-primary/65">
            Reach out directly, browse my work, or grab the resume.
          </p> */}
        </div>
      </div>

      <ContactForm />

      <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:gap-4 xl:grid-cols-4">
        {contactLinks.map((item, index) => (
          <ContactCard
            key={item.label}
            item={item}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
        </div>
      </div>
    </motion.section>
  );
}
