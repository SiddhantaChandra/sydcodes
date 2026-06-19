"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import slaysuki1 from "@/public/project-image/slaysuki/1.webp";
import slaysuki2 from "@/public/project-image/slaysuki/2.webp";
import urmi1 from "@/public/project-image/urmi-portfolio/1.webp";
import urmi2 from "@/public/project-image/urmi-portfolio/2.webp";
import urmi3 from "@/public/project-image/urmi-portfolio/3.webp";
import urmi4 from "@/public/project-image/urmi-portfolio/4.webp";
import zestquiz1 from "@/public/project-image/zestquiz/1.webp";
import zestquiz2 from "@/public/project-image/zestquiz/2.webp";
import zestquiz3 from "@/public/project-image/zestquiz/3.webp";
import zestquiz4 from "@/public/project-image/zestquiz/4.webp";

const projects = [
  {
    title: "Slaysuki TCG",
    type: "E-commerce",
    description:
      "A full-stack trading card marketplace with a microservices backend, custom inventory and order management CMS, customer storefront, payment processing, shipping automation, and cloud-based asset management.",
    tech: ["Next.js", "React", "NestJS", "Prisma ORM", "Redis", "Tanstack Query", "Tailwind CSS", "Cloudflare R2", "BullMQ", "Cashfree", "Shiprocket"],
    live: "https://www.slaysuki.com/",
    images: [slaysuki1, slaysuki2],
  },
  {
    title: "Journalist Portfolio & CMS",
    type: "Portfolio",
    description:
      "A full-stack portfolio and blogging platform for a journalist featuring a custom CMS, rich-text article editor, media management, secure authentication, and cloud-based file storage.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Cloudflare R2", "Tailwind CSS", "BlockNode"],
    github: "https://github.com/SiddhantaChandra/urmi-portfolio-website",
    live: "https://www.urmichakraborty.com/",
    images: [urmi1, urmi2, urmi3, urmi4],
  },
  {
    title: "ZestQuiz",
    type: "SaaS",
    description:
      "A quiz platform featuring AI-powered quiz generation, role-based authentication, quiz management, real-time chatbot support, performance tracking, and an admin dashboard for content management.",
    tech: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma ORM", "JWT Authentication", "DeepSeek API", "Tailwind CSS", "Docker"],
    github: "https://github.com/SiddhantaChandra/ZestQuiz",
    // live: "https://pulseboard.example.com",
    images: [zestquiz1, zestquiz2, zestquiz3, zestquiz4],
  }
];

const PROJECT_START_OFFSET = 0.12;
const PROJECT_END_OFFSET = 0.88;
const DESKTOP_STAGE_VH_PER_PROJECT = 98;
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

const getProjectCenter = (index, totalProjects) => {
  if (totalProjects <= 1) {
    return (PROJECT_START_OFFSET + PROJECT_END_OFFSET) / 2;
  }

  const t = index / (totalProjects - 1);
  return PROJECT_START_OFFSET + t * (PROJECT_END_OFFSET - PROJECT_START_OFFSET);
};

const SWIPE_THRESHOLD = 80;
const SWIPE_VELOCITY = 400;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  opacity: { duration: 0.35 },
};

const getProjectImagePriority = (projectIndex, imageIndex) => {
  if (projectIndex === 0 && imageIndex === 0) {
    return { loading: "lazy", fetchPriority: "auto" };
  }
  return { loading: "lazy", fetchPriority: "low" };
};

const ProjectImageCarousel = ({ images, title, projectIndex = 0 }) => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    if (images.length <= 1 || reduceMotion) return;
    stopAuto();
    intervalRef.current = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images.length, reduceMotion, stopAuto]);

  const restartAuto = useCallback(() => {
    if (!isHovered && isInView) {
      startAuto();
    } else {
      stopAuto();
    }
  }, [isHovered, isInView, startAuto, stopAuto]);

  useEffect(() => {
    restartAuto();
    return () => stopAuto();
  }, [restartAuto, stopAuto]);

  const goTo = (target) => {
    if (target === currentIndex) return;
    setDirection(target > currentIndex ? 1 : -1);
    setCurrentIndex(target);
    restartAuto();
  };

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleDragEnd = (_event, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY) {
      goNext();
      restartAuto();
    } else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY) {
      goPrev();
      restartAuto();
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="project-card-preview relative mb-6 shrink-0 overflow-hidden rounded-xl bg-[#1a1a1a] xl:mx-20 2xl:mx-0"
      style={{ aspectRatio: "1920 / 947" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {reduceMotion ? (
        <Image
          src={images[currentIndex]}
          alt={`${title} preview ${currentIndex + 1}`}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 36rem, 100vw"
          {...getProjectImagePriority(projectIndex, currentIndex)}
        />
      ) : (
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragDirectionLock
            dragElastic={0.05}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} preview ${currentIndex + 1}`}
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 36rem, 100vw"
              draggable={false}
              {...getProjectImagePriority(projectIndex, currentIndex)}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${title} image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                i === currentIndex
                  ? "w-5 bg-accent"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCardContent = ({ project, projectIndex = 0 }) => (
  <>
    {project.images?.length > 0 ? (
      <ProjectImageCarousel images={project.images} title={project.title} projectIndex={projectIndex} />
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
          className="rounded-full border border-primary/10 bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/72 xl:hidden 2xl:inline-block"
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] transition-colors duration-300 hover:bg-white/90"
          >
            <GithubLogo size={16} weight="fill" aria-hidden="true" />
            GitHub
          </a>
        ) : null}

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#4ade80] bg-[#4ade80] px-4 py-2 text-sm font-medium text-[#0a0a0a] transition-colors duration-300 hover:bg-[#34d399]"
          >
            Live
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
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
        const currentDistance = Math.abs(clamped - getProjectCenter(index, projects.length));
        const closestDistance = Math.abs(
          clamped - getProjectCenter(closestIndex, projects.length),
        );

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
      className="projects-section relative w-full scroll-mt-28 bg-[#0a0a0a] lg:scroll-mt-28 2xl:pt-20"
      style={{
        minHeight: shouldReduceMotion ? "auto" : undefined,
      }}
    >
      <div className="relative mx-auto max-w-4xl px-5 pt-16 pb-16 lg:max-w-6xl lg:pt-16 2xl:max-w-7xl lg:px-0 xl:pb-0">
        <div className={`mb-10 ${shouldReduceMotion ? "" : "lg:hidden"}`}>
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
            Selected Work
          </p>
          <h2 className="max-w-md text-4xl font-bold leading-tight text-primary md:text-5xl">
            Projects
          </h2>
          <p className="mt-4 max-w-xl text-base text-primary/80">
            Projects that reflect how I build software - scalable backends, polished interfaces, and attention to detail.
          </p>
        </div>

        <div className={`space-y-6 ${shouldReduceMotion ? "" : "lg:hidden"}`}>
          {projects.map((project, index) => (
            <motion.article
              key={`mobile-${project.title}`}
              className="flex min-h-[24rem] flex-col rounded-2xl bg-[#1a1a1a] px-3 py-3"
              initial={shouldReduceMotion ? false : mobileCardMotion.initial}
              whileInView={
                shouldReduceMotion ? undefined : mobileCardMotion.whileInView
              }
              viewport={shouldReduceMotion ? undefined : mobileCardMotion.viewport}
            >
              <ProjectCardContent project={project} projectIndex={index} />
            </motion.article>
          ))}
        </div>

        <div
          className={`projects-desktop-stage ${shouldReduceMotion ? "hidden" : "hidden lg:block"}`}
          style={{
            minHeight: shouldReduceMotion
              ? "auto"
              : `${projects.length * DESKTOP_STAGE_VH_PER_PROJECT}vh`,
          }}
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
                  Projects that reflect how I build software - scalable backends, polished interfaces, and attention to detail.
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
                            className="rounded-full border border-primary/10 bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/72"
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
                      <ProjectCardContent project={activeProject} projectIndex={effectiveDisplayProjectIndex} />
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
