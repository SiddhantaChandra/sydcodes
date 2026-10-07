"use client";

import ScrollScene, { ScrollSceneItem } from "../components/ScrollScene";

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

function ExpertiseCard({ group }) {
  return (
    <article
      className="relative flex h-full flex-col bg-transparent p-0"
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
              className="flex min-h-6 items-center border-b border-white/10 py-2 text-[0.8rem] text-primary/82 md:min-h-8 md:py-1 md:text-[0.86rem]"
            >
              <span className="block max-w-full leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function TechnicalExpertise() {
  return (
    <ScrollScene id="expertise">
      {({ progress, animated }) => (
        <>
          <ScrollSceneItem
            compactPreset="heading"
            progress={progress}
            animated={animated}
            enterX={64}
            enterY={48}
            className="mb-8 lg:mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              Technical Expertise
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-[2.15rem]">
              What I&apos;m good at
            </h2>
          </ScrollSceneItem>

          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
            {expertiseGroups.map((group, index) => (
              <ScrollSceneItem
                key={group.title}
                progress={progress}
                animated={animated}
                index={index + 1}
                enterX={index % 2 === 0 ? 64 : -64}
                enterY={80 + index * 12}
                exitX={-64 - index * 12}
                exitY={-80}
              >
                <ExpertiseCard group={group} />
              </ScrollSceneItem>
            ))}
          </div>
        </>
      )}
    </ScrollScene>
  );
}
