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
import ScrollScene, { ScrollSceneItem } from "../components/ScrollScene";

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

function ContactCard({ item, shouldReduceMotion }) {
  const isExternal = item.href.startsWith("http");
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      download={item.href.endsWith(".pdf") ? true : undefined}
      className="contact-card-shell group relative flex h-full min-h-[4.5rem] items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 lg:min-h-[10rem] lg:flex-col lg:items-stretch lg:justify-between lg:gap-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-4"
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={
        shouldReduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }
      }
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 360 260"
        preserveAspectRatio="none"
      >
        <path
          d="M16 1H344C352.284 1 359 7.716 359 16V213C359 221.284 352.284 228 344 228H253C241 228 234 233 228 241L215 254C209 260 202 259 193 259H16C7.716 259 1 252.284 1 244V16C1 7.716 7.716 1 16 1Z"
          className="contact-card-shape"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3 lg:block lg:flex-none">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] lg:hidden">
          <Icon
            aria-hidden="true"
            className={item.accentClass}
            size={18}
            weight="duotone"
          />
        </span>
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-3 lg:mb-4">
            <Icon
              aria-hidden="true"
              className={`hidden shrink-0 ${item.accentClass} lg:block`}
              size={14}
              weight="duotone"
            />
            <p
              className={`text-[0.625rem] font-semibold tracking-[0.16em] uppercase ${item.accentClass} lg:text-xs`}
            >
              <span className="lg:hidden">{item.mobileLabel ?? item.label}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </p>
          </div>

          <p className="break-words text-xs leading-snug font-medium text-primary/85 lg:font-semibold lg:text-primary">
            {item.value}
          </p>
        </div>
      </div>

      <span className="relative z-10 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary/82 transition-colors duration-300 group-hover:text-primary lg:mt-8">
        <span className="hidden lg:inline">Open link</span>
        <ArrowUpRight
          aria-hidden="true"
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
    <ScrollScene id="contact" enableExit={false}>
      {({ progress, animated, enableExit }) => (
        <>
          <ScrollSceneItem
            progress={progress}
            animated={animated}
            enableExit={enableExit}
            enterY={48}
            className="mb-7 lg:mb-8"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              Contact Me
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-[2.15rem]">
              Let&apos;s build something together.
            </h2>
          </ScrollSceneItem>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch">
            <ScrollSceneItem
              progress={progress}
              animated={animated}
              enableExit={enableExit}
              index={1}
              enterX={-64}
              enterY={64}
              enterScale={0.98}
              className="min-w-0"
            >
              <ContactForm animateEntrance={false} />
            </ScrollSceneItem>

            <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
              {contactLinks.map((item, index) => (
                <ScrollSceneItem
                  key={item.label}
                  progress={progress}
                  animated={animated}
                  enableExit={enableExit}
                  index={index + 2}
                  enterX={64}
                  enterY={80 + index * 8}
                  className="min-w-0"
                >
                  <ContactCard
                    item={item}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </ScrollSceneItem>
              ))}
            </div>
          </div>
        </>
      )}
    </ScrollScene>
  );
}
