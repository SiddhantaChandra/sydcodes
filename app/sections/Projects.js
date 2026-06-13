"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import slaysukiImage from "@/public/project-image/slaysuki.png";

const projects = [
  {
    title: "Vertex Commerce",
    type: "Fullstack Platform",
    description:
      "Headless storefront with blazing-fast catalog discovery, custom checkout, and analytics-ready event tracking.",
    tech: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
    github: "https://github.com/username/vertex-commerce",
    live: "https://vertex-commerce.example.com",
    image: slaysukiImage,
  },
  {
    title: "Luma Studio",
    type: "Creative Portfolio",
    description:
      "Immersive agency website with smooth storytelling sections, modular CMS blocks, and responsive media pipelines.",
    tech: ["Next.js", "Sanity", "Tailwind"],
    github: "https://github.com/username/luma-studio",
    live: "https://luma-studio.example.com"
  },
  {
    title: "PulseBoard",
    type: "SaaS Dashboard",
    description:
      "Live operational dashboard with role-based views, real-time widgets, and contextual drill-down interactions.",
    tech: ["React", "Express", "WebSockets"],
    github: "https://github.com/username/pulseboard",
    live: "https://pulseboard.example.com",
    image: slaysukiImage,
  },
  {
    title: "Nomad Routes",
    type: "Travel Product",
    description:
      "Trip-planning platform combining route optimization, collaborative itinerary editing, and map-centric UI patterns.",
    tech: ["Next.js", "Prisma", "Mapbox"],
    github: "https://github.com/username/nomad-routes"
  },
  {
    title: "Signal Hiring",
    type: "Recruitment Suite",
    description:
      "Hiring workflow system with candidate pipelines, scorecards, and interview scheduling automation.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    github: "https://github.com/username/signal-hiring"
  },
];

const PROJECT_START_OFFSET = 0.06;
const PROJECT_PROGRESS_SPAN = 0.18;

const getProjectCenter = (index) =>
  PROJECT_START_OFFSET + index * PROJECT_PROGRESS_SPAN + PROJECT_PROGRESS_SPAN / 2;

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(-1);
  const [displayProjectIndex, setDisplayProjectIndex] = useState(-1);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const travel = rect.height - viewportHeight;
      const progress = travel <= 0 ? 0 : -rect.top / travel;
      const clamped = Math.min(1, Math.max(0, progress));
      const eased = 1 - (1 - clamped) ** 3;

      section.style.setProperty("--projects-progress", clamped.toFixed(4));
      section.style.setProperty("--projects-ease", eased.toFixed(4));

      if (clamped < PROJECT_START_OFFSET) {
        setActiveProjectIndex((current) => (current === -1 ? current : -1));
        return;
      }

      const nextActiveIndex = projects.reduce((closestIndex, _project, index) => {
        const currentDistance = Math.abs(clamped - getProjectCenter(index));
        const closestDistance = Math.abs(clamped - getProjectCenter(closestIndex));

        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);

      setActiveProjectIndex((current) =>
        current === nextActiveIndex ? current : nextActiveIndex
      );
    };

    updateProgress();
    window.addEventListener("lenis:scroll", updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      window.removeEventListener("lenis:scroll", updateProgress);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    if (activeProjectIndex === displayProjectIndex) {
      const nextVisible = activeProjectIndex !== -1;
      if (isCardVisible !== nextVisible) {
        window.requestAnimationFrame(() => {
          setIsCardVisible(nextVisible);
        });
      }
      return;
    }

    if (activeProjectIndex === -1) {
      window.requestAnimationFrame(() => {
        setIsCardVisible(false);
      });
      transitionTimeoutRef.current = window.setTimeout(() => {
        setDisplayProjectIndex(-1);
      }, 140);
      return;
    }

    if (displayProjectIndex === -1) {
      window.requestAnimationFrame(() => {
        setDisplayProjectIndex(activeProjectIndex);
        window.requestAnimationFrame(() => {
          setIsCardVisible(true);
        });
      });
      return;
    }

    window.requestAnimationFrame(() => {
      setIsCardVisible(false);
    });
    transitionTimeoutRef.current = window.setTimeout(() => {
      setDisplayProjectIndex(activeProjectIndex);
      window.requestAnimationFrame(() => {
        setIsCardVisible(true);
      });
    }, 160);
  }, [activeProjectIndex, displayProjectIndex, isCardVisible]);

  const activeProject = projects[displayProjectIndex];
  const visibleStackLayers = activeProject
    ? Math.min(3, projects.length - displayProjectIndex - 1)
    : 0;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative lg:max-w-4xl 2xl:max-w-7xl mx-auto "
      style={{ minHeight: `${projects.length * 125}vh` }}
    >
      <div className="projects-sticky sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
              Selected Work
            </p>
            <h2 className="max-w-md text-4xl font-bold leading-tight text-primary md:text-5xl">
              Projects
            </h2>
            <p className="mt-4 max-w-md text-base text-primary/80">
              Scroll through five crafted projects. They appear one by one and
              stack into a single centered stage.
            </p>

            {activeProject?.image ? (
              <div
                className="project-preview mt-8 hidden lg:block"
                data-visible={isCardVisible ? "true" : "false"}
              >
                <div className="project-preview-frame relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-primary/15 bg-[#26201b] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <Image
                    src={activeProject.image}
                    alt={`${activeProject.title} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1536px) 28rem, (min-width: 1024px) 22rem, 0px"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className="projects-stack relative h-[68vh] min-h-96"
            data-empty={activeProject ? "false" : "true"}
            data-visible={isCardVisible ? "true" : "false"}
          >
            {Array.from({ length: visibleStackLayers }).map((_, layerIndex) => (
              <div
                key={`stack-layer-${displayProjectIndex}-${layerIndex}`}
                className="project-stack-layer rounded-3xl"
                style={{ "--layer-index": `${layerIndex + 1}` }}
              />
            ))}

            {activeProject ? (
              <article
                className="project-card relative z-10 flex h-full flex-col rounded-3xl p-7 md:p-8"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    
                    <h3 className="text-2xl font-semibold text-primary">
                      {activeProject.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase">
                    {activeProject.type}
                  </span>
                </div>
                <p className="mb-4 max-w-xl text-base leading-relaxed text-primary/82">
                  {activeProject.description}
                </p>

                <div className="mt-auto space-y-6">
                  <div className="flex flex-wrap gap-2.5">
                    {activeProject.tech.map((tech) => (
                      <span
                        key={`${activeProject.title}-${tech}`}
                        className="rounded-full border border-primary/10 bg-[#2c2620] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/72"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {activeProject.github || activeProject.live ? (
                    <div className="flex flex-wrap gap-3">
                      {activeProject.github ? (
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-primary/18 bg-[#322b24] px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-[#3a322b]"
                        >
                          GitHub
                        </a>
                      ) : null}

                      {activeProject.live ? (
                        <a
                          href={activeProject.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-accent/25 bg-accent/12 px-4 py-2 text-sm font-medium text-accent transition-colors duration-300 hover:border-accent/45 hover:bg-accent/18"
                        >
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
