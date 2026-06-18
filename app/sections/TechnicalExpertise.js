"use client";

import { motion, useReducedMotion } from "framer-motion";

const expertiseGroups = [
  {
    title: "Frontend",
    headingClass: "text-[#f17c52]",
    headingColor: "#f17c52",
    items: ["React", "TypeScript", "Tailwind", "TanStack Query"],
  },
  {
    title: "Backend",
    headingClass: "text-[#78c9ba]",
    headingColor: "#78c9ba",
    items: ["NestJS", "Express", "PostgreSQL", "Prisma"],
  },
  {
    title: "Tools",
    headingClass: "text-[#d8b16a]",
    headingColor: "#d8b16a",
    items: ["Git", "Docker", "Postman", "Figma"],
  },
  {
    title: "Working with AI",
    headingClass: "text-[#f08a5d]",
    headingColor: "#f08a5d",
    items: ["Codex", "Open Code", "Multi-agent coding & Workflow"],
    featured: {
      eyebrow: "Workflow",
      title: "Agentic development",
      description:
        "Building with autonomous coding agents to streamline development and boost productivity.",
    },
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
  initial: { opacity: 0, y: 26 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true, amount: 0.18 },
};

function ExpertiseCard({ group, shouldReduceMotion }) {
  return (
    <motion.article
      className="group relative flex h-full flex-col bg-transparent p-0 transition-transform duration-300"
      initial={shouldReduceMotion ? false : cardMotion.initial}
      whileInView={shouldReduceMotion ? undefined : cardMotion.whileInView}
      viewport={shouldReduceMotion ? undefined : cardMotion.viewport}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={
        shouldReduceMotion ? undefined : { duration: 0.25, ease: "easeOut" }
      }
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="h-px w-6 shrink-0"
            style={{ backgroundColor: group.headingColor }}
          />
          <h3
            className={`text-[1.08rem] font-semibold italic ${group.headingClass} md:text-[1.18rem]`}
          >
            {group.title}
          </h3>
        </div>

        {group.featured ? (
          <div className="mb-3 rounded-[1rem] bg-white/[0.04] px-3.5 py-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-primary md:text-[0.95rem]">
                {group.featured.title}
              </p>
            </div>
            <p className="mt-2 max-w-lg text-[0.76rem] leading-relaxed text-primary/68 md:text-[0.82rem]">
              {group.featured.description}
            </p>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col">
          {group.items.map((item) => (
            <div
              key={`${group.title}-${item}`}
              className="flex min-h-6 items-center border-b border-white/10 py-2 text-[0.8rem] text-primary/82 transition-colors duration-300 group-hover:text-primary md:min-h-8 md:py-1 md:text-[0.86rem]"
            >
              <span className="block max-w-full leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function TechnicalExpertise() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="expertise"
      className="relative w-full scroll-mt-28 bg-[#0f0f0f] lg:scroll-mt-32"
      initial={shouldReduceMotion ? false : sectionMotion.initial}
      whileInView={shouldReduceMotion ? undefined : sectionMotion.whileInView}
      viewport={shouldReduceMotion ? undefined : sectionMotion.viewport}
    >
      <div className="mx-auto max-w-4xl px-5 pt-10 pb-14 lg:max-w-6xl lg:px-6 lg:pt-24 lg:pb-8 2xl:max-w-7xl">
        <div className="mb-5 lg:mb-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          Technical Expertise
        </p>
        <div className="mt-2 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-[2.15rem]">
            What I&apos;m good at
          </h2>
          <p className="max-w-lg text-[0.8rem] leading-relaxed text-primary/65 md:text-[0.88rem]">
            Frontend, backend, tools, and AI workflow.
          </p>
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 md:gap-y-7 lg:content-start lg:gap-x-16 lg:gap-y-8">
        {expertiseGroups.map((group) => (
          <ExpertiseCard
            key={group.title}
            group={group}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
        </div>
      </div>
    </motion.section>
  );
}
