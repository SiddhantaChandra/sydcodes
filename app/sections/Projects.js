"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import slaysukiImage from "@/public/project-image/slaysuki-trading.webp";
import urmiImage from "@/public/project-image/urmi-portfolio.webp";

const projects = [
  {
    title: "Slaysuki TCG",
    type: "E-commerce",
    description:
      "A full-stack trading card marketplace with a microservices backend, custom inventory and order management CMS, customer storefront, payment processing, shipping automation, and cloud-based asset management.",
    tech: ["Next.js", "React", "NestJS", "Prisma ORM", "Redis", "Tanstack Query", "Tailwind CSS", "Cloudflare R2", "BullMQ", "Cashfree", "Shiprocket"],
    live: "https://www.slaysuki.com/",
    image: slaysukiImage,
  },
  {
    title: "Journalist Portfolio & CMS",
    type: "Portfolio",
    description:
      "A full-stack portfolio and blogging platform for a journalist featuring a custom CMS, rich-text article editor, media management, secure authentication, and cloud-based file storage.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Cloudflare R2", "Tailwind CSS", "BlockNode"],
    github: "https://github.com/SiddhantaChandra/urmi-portfolio-website",
    live: "https://www.urmichakraborty.com/",
    image: urmiImage,
  },
  {
    title: "ZestQuiz",
    type: "SaaS",
    description:
      "A quiz platform featuring AI-powered quiz generation, role-based authentication, quiz management, real-time chatbot support, performance tracking, and an admin dashboard for content management.",
    tech: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma ORM", "JWT Authentication", "DeepSeek API", "Tailwind CSS", "Docker"],
    github: "https://github.com/SiddhantaChandra/ZestQuiz",
    // live: "https://pulseboard.example.com",
    image: slaysukiImage,
  }
];

const PROJECT_START_OFFSET = 0.06;
const PROJECT_PROGRESS_SPAN = 0.18;
const CARD_EXIT_MS = 180;
const CARD_ENTER_DELAY_MS = 24;

const desktopCardMotion = {
  initial: { opacity: 0, y: "112%" },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const mobileCardMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  viewport: { once: true, amount: 0.2 },
};

const techBadgeMotion = {
  initial: { opacity: 0, y: 10, scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.94,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const getProjectCenter = (index) =>
  PROJECT_START_OFFSET + index * PROJECT_PROGRESS_SPAN + PROJECT_PROGRESS_SPAN / 2;

const ProjectCardContent = ({ project }) => (
  <>
    {project.image ? (
      <div
        className="project-card-preview relative mb-6 shrink-0 overflow-hidden rounded-xl  bg-[#26201b] xl:mx-20 2xl:mx-0"
        style={{ aspectRatio: "1920 / 947" }}
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 36rem, 100vw"
        />
      </div>
    ) : null}

    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-2xl font-semibold text-primary">{project.title}</h3>
      </div>
      <span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase">
        {project.type}
      </span>
    </div>

    <p className="mb-4 max-w-xl text-base leading-relaxed text-primary/82 xl:text-sm 2xl:text-base">
      {project.description}
    </p>

    <div className="mb-6 flex flex-wrap gap-2.5">
      {project.tech.map((tech) => (
        <span
          key={`${project.title}-${tech}`}
          className="rounded-full border border-primary/10 bg-[#2c2620] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/72 xl:hidden 2xl:inline-block"
        >
          {tech}
        </span>
      ))}
    </div>

    {project.github || project.live ? (
      <div className="flex flex-wrap gap-3">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-primary/18 bg-[#322b24] px-4 py-2 text-sm font-medium text-primary transition-colors duration-300 hover:border-primary/30 hover:bg-[#3a322b]"
          >
            GitHub
          </a>
        ) : null}

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-accent/25 bg-accent/12 px-4 py-2 text-sm font-medium text-accent transition-colors duration-300 hover:border-accent/45 hover:bg-accent/18"
          >
            Live Demo
          </a>
        ) : null}
      </div>
    ) : null}
  </>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeProjectIndex, setActiveProjectIndex] = useState(-1);
  const [displayProjectIndex, setDisplayProjectIndex] = useState(-1);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const swapTimeoutRef = useRef(null);
  const enterTimeoutRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section || window.innerWidth < 1024) return;

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
        current === nextActiveIndex ? current : nextActiveIndex,
      );
    };

    updateProgress();
    window.addEventListener("lenis:scroll", updateProgress);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("lenis:scroll", updateProgress);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    if (swapTimeoutRef.current) {
      window.clearTimeout(swapTimeoutRef.current);
      swapTimeoutRef.current = null;
    }

    if (enterTimeoutRef.current) {
      window.clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }

    if (activeProjectIndex === -1) {
      window.requestAnimationFrame(() => {
        setIsCardVisible(false);
      });

      if (displayProjectIndex !== -1) {
        swapTimeoutRef.current = window.setTimeout(() => {
          setDisplayProjectIndex(-1);
        }, CARD_EXIT_MS);
      }

      return undefined;
    }

    if (displayProjectIndex === -1) {
      window.requestAnimationFrame(() => {
        setDisplayProjectIndex(activeProjectIndex);
        enterTimeoutRef.current = window.setTimeout(() => {
          setIsCardVisible(true);
        }, CARD_ENTER_DELAY_MS);
      });

      return undefined;
    }

    if (activeProjectIndex === displayProjectIndex) {
      if (!isCardVisible) {
        window.requestAnimationFrame(() => {
          setIsCardVisible(true);
        });
      }

      return undefined;
    }

    window.requestAnimationFrame(() => {
      setIsCardVisible(false);
    });

    swapTimeoutRef.current = window.setTimeout(() => {
      setDisplayProjectIndex(activeProjectIndex);
      enterTimeoutRef.current = window.setTimeout(() => {
        setIsCardVisible(true);
      }, CARD_ENTER_DELAY_MS);
    }, CARD_EXIT_MS);

    return () => {
      if (swapTimeoutRef.current) {
        window.clearTimeout(swapTimeoutRef.current);
        swapTimeoutRef.current = null;
      }

      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }
    };
  }, [activeProjectIndex, displayProjectIndex, isCardVisible, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (swapTimeoutRef.current) {
        window.clearTimeout(swapTimeoutRef.current);
      }

      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
      }
    };
  }, []);

  const effectiveDisplayProjectIndex = shouldReduceMotion ? 0 : displayProjectIndex;
  const activeProject = projects[effectiveDisplayProjectIndex];
  const shouldShowStack = effectiveDisplayProjectIndex !== -1;
  const visibleDesktopTech = shouldShowStack
    ? [
      ...new Set(
        projects
          .slice(0, effectiveDisplayProjectIndex + 1)
          .flatMap((project) => project.tech),
      ),
    ]
    : [];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative w-full scroll-mt-28 bg-[#0a0a0a] lg:scroll-mt-28"
      style={{
        minHeight: shouldReduceMotion ? "auto" : undefined,
      }}
    >
      <div className="relative mx-auto max-w-4xl px-5 pt-16 pb-16 lg:max-w-6xl lg:pt-16 2xl:max-w-7xl lg:px-0 2xl:pt-20">
        <div className={`mb-10 ${shouldReduceMotion ? "" : "lg:hidden"}`}>
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
            Selected Work
          </p>
          <h2 className="max-w-md text-4xl font-bold leading-tight text-primary md:text-5xl">
            Projects
          </h2>
          <p className="mt-4 max-w-xl text-base text-primary/80">
            A curated selection of product, platform, and interface work with a
            focus on motion, usability, and scalable frontends.
          </p>
        </div>

        <div className={`space-y-6 ${shouldReduceMotion ? "" : "lg:hidden"}`}>
          {projects.map((project) => (
            <motion.article
              key={`mobile-${project.title}`}
              className="flex min-h-[24rem] flex-col rounded-3xl bg-[#2b2621] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              initial={shouldReduceMotion ? false : mobileCardMotion.initial}
              whileInView={
                shouldReduceMotion ? undefined : mobileCardMotion.whileInView
              }
              viewport={shouldReduceMotion ? undefined : mobileCardMotion.viewport}
            >
              <ProjectCardContent project={project} />
            </motion.article>
          ))}
        </div>

        <div
          className={`projects-desktop-stage ${shouldReduceMotion ? "hidden" : "hidden lg:block"}`}
          style={{ minHeight: shouldReduceMotion ? "auto" : `${projects.length * 125}vh` }}
        >
          <div className="projects-sticky sticky top-24 flex min-h-[calc(100vh-6rem)] items-start">
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

                {shouldShowStack ? (
                  <div className="mt-6">
                    <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-primary/55 uppercase">
                      Project Stack
                    </p>
                    <div className="flex max-w-md flex-wrap gap-2.5">
                      <AnimatePresence initial={false}>
                        {visibleDesktopTech.map((tech) => (
                          <motion.span
                            key={`desktop-stack-${tech}`}
                            className="rounded-full border border-primary/10 bg-[#2c2620] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/72"
                            initial={shouldReduceMotion ? false : techBadgeMotion.initial}
                            animate={shouldReduceMotion ? undefined : techBadgeMotion.animate}
                            exit={shouldReduceMotion ? undefined : techBadgeMotion.exit}
                            layout
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : null}
              </div>

              <div
                className="projects-stack relative min-h-[26rem] pb-10"
                data-empty={activeProject ? "false" : "true"}
              >
                <AnimatePresence initial={false} mode="wait">
                  {activeProject && isCardVisible ? (
                    <motion.article
                      key={activeProject.title}
                      className="project-card relative z-10 flex flex-col rounded-3xl p-7 md:p-8"
                      initial={shouldReduceMotion ? false : desktopCardMotion.initial}
                      animate={shouldReduceMotion ? undefined : desktopCardMotion.animate}
                      exit={shouldReduceMotion ? undefined : desktopCardMotion.exit}
                    >
                      <ProjectCardContent project={activeProject} />
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
