"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import slaysuki1 from "@/public/project-image/slaysuki/1-opt.webp";
import slaysuki2 from "@/public/project-image/slaysuki/2-opt.webp";
import urmi1 from "@/public/project-image/urmi-portfolio/1-opt.webp";
import urmi2 from "@/public/project-image/urmi-portfolio/2-opt.webp";
import urmi3 from "@/public/project-image/urmi-portfolio/3-opt.webp";
import urmi4 from "@/public/project-image/urmi-portfolio/4-opt.webp";
import zestquiz1 from "@/public/project-image/zestquiz/1-opt.webp";
import zestquiz2 from "@/public/project-image/zestquiz/2-opt.webp";
import zestquiz3 from "@/public/project-image/zestquiz/3-opt.webp";
import zestquiz4 from "@/public/project-image/zestquiz/4-opt.webp";

const projects = [
  {
    title: "Slaysuki TCG",
    type: "E-commerce",
    description: "Full-stack trading card marketplace, built end to end and still in progress.",
    highlights: [
      "Customer storefront and custom CMS for inventory and order management",
      "Inventory reservation and order locking to prevent overselling limited stock under concurrent demand",
      "Razorpay payments and Shiprocket shipping automation",
      "Jest and Playwright tests for checkout and order-locking flows, self-hosted on a Linux VPS",
    ],
    tech: ["TypeScript", "Next.js", "React", "NestJS", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "TanStack Query", "Redis", "BullMQ", "Cloudflare R2", "Razorpay", "Shiprocket"],
    live: "https://www.slaysuki.com/",
    images: [slaysuki1, slaysuki2],
  },
  {
    title: "Journalist Portfolio & CMS",
    type: "Client Work",
    description: "A full-stack portfolio and blogging platform for a journalist.",
    highlights: [
      "Public portfolio and blog for showcasing articles and published work",
      "Custom CMS with a rich-text editor for article management",
      "Media management and cloud-based file storage",
      "Secure authentication for managing and publishing content",
    ],
    tech: ["TypeScript", "JavaScript", "Next.js", "React", "NestJS", "Supabase", "Prisma ORM", "Tailwind CSS", "TanStack Query", "Cloudflare R2", "BlockNote"],
    github: "https://github.com/SiddhantaChandra/urmi-portfolio-website",
    live: "https://www.urmichakraborty.com/",
    images: [urmi1, urmi2, urmi3, urmi4],
  },
  {
    title: "ZestQuiz",
    type: "AI Platform",
    description: "A quiz platform with AI-powered generation and performance tracking.",
    highlights: [
      "Quiz creation and management with an admin dashboard and JWT-based role authentication",
      "Results and analytics for quiz attempts",
      "Automated quiz generation using the DeepSeek API",
      "Separate AI chat support feature with REST APIs and persistent conversation history",
    ],
    tech: ["TypeScript", "Next.js", "React", "NestJS", "PostgreSQL", "Prisma ORM", "JWT Authentication", "DeepSeek API", "Tailwind CSS", "Docker"],
    github: "https://github.com/SiddhantaChandra/ZestQuiz",
    live: "https://zest-quiz.vercel.app/",
    images: [zestquiz1, zestquiz2, zestquiz3, zestquiz4],
  }
];

const techIcons = {
  "Next.js": "nextjs.svg",
  React: "react.svg",
  NestJS: "nestjs.svg",
  TypeScript: "typescript.svg",
  JavaScript: "javascript.svg",
  PostgreSQL: "postgresql.svg",
  Supabase: "supabase.svg",
  "Prisma ORM": "prisma.svg",
  Prisma: "prisma.svg",
  Redis: "redis.svg",
  "TanStack Query": "reactquery.svg",
  "Tailwind CSS": "tailwind.svg",
  Tailwind: "tailwind.svg",
  BullMQ: "bullmq.png",
  "Cloudflare R2": "cloudflare-r2.svg",
  Razorpay: "razorpay.svg",
  Shiprocket: "shiprocket.png",
  BlockNote: "blocknote.svg",
  "JWT Authentication": "jsonwebtokens.svg",
  "DeepSeek API": "deepseek.svg",
  Docker: "docker.svg",
};

const TechLabel = ({ tech }) => (
  <>
    {techIcons[tech] ? (
      <Image
        src={`/icons-tech/${techIcons[tech]}`}
        alt=""
        aria-hidden="true"
        width={14}
        height={14}
        className="h-3.5 w-3.5 shrink-0"
      />
    ) : null}
    {tech}
  </>
);

const preloadedProjectImageUrls = new Set();

const preloadProjectImages = () => {
  if (typeof window === "undefined") return;

  projects.flatMap((project) => project.images).forEach((image) => {
    if (preloadedProjectImageUrls.has(image.src)) return;

    preloadedProjectImageUrls.add(image.src);
    const preloader = new window.Image();
    preloader.decoding = "async";
    preloader.fetchPriority = "low";
    preloader.src = image.src;
  });
};

const PROJECT_START_OFFSET = 0.16;
const PROJECT_END_OFFSET = 0.84;
const DESKTOP_STAGE_VH_PER_PROJECT = 88;
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

const ProjectImageCarousel = ({ images, title, projectIndex = 0, desktop = false }) => {
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
      className={`project-card-preview relative shrink-0 overflow-hidden bg-[#1a1a1a] ${desktop ? "" : "mb-6 rounded-xl xl:mx-20 2xl:mx-0"}`}
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
          unoptimized
          loading="eager"
          fetchPriority={projectIndex === 0 && currentIndex === 0 ? "high" : "low"}
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
              draggable={false}
              unoptimized
              loading="eager"
              fetchPriority={projectIndex === 0 && currentIndex === 0 ? "high" : "low"}
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

const ProjectCardContent = ({ project, projectIndex = 0, showTech = true }) => (
  <>
    {project.images?.length > 0 ? (
      <ProjectImageCarousel images={project.images} title={project.title} projectIndex={projectIndex} desktop={!showTech} />
    ) : null}

    <div className={`project-card-body ${showTech ? "" : "px-5 pt-5 pb-6 xl:px-6"}`}>
    <div className={`project-card-heading flex items-start justify-between gap-3 ${showTech ? "mb-4" : "mb-3"}`}>
      <div>
        <h3 className={`font-bold text-primary ${showTech ? "text-2xl" : "text-xl leading-tight xl:text-[1.375rem]"}`}>{project.title}</h3>
      </div>
      <span className="project-type-tag rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-[#f17c7c] uppercase">
        {project.type}
      </span>
    </div>

    <div className={`project-card-description shrink-0 text-primary/95 ${showTech ? "mb-4 max-w-xl text-base leading-relaxed xl:text-sm 2xl:text-base" : "text-[13px] leading-[1.5] xl:text-sm"}`}>
      <p>{project.description}</p>
      <ul className={`list-disc pl-5 marker:text-accent ${showTech ? "mt-4 space-y-2" : "mt-3 space-y-1.5"}`}>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </div>

    {showTech ? (
      <div className="mb-6 flex flex-wrap gap-2.5">
        {project.tech.map((tech) => (
          <span
            key={`${project.title}-${tech}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-[#111111] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/90"
          >
            <TechLabel tech={tech} />
          </span>
        ))}
      </div>
    ) : null}

    {project.github || project.live ? (
      <div className={`project-card-links flex shrink-0 flex-wrap gap-3 ${showTech ? "pt-2" : "pt-6"}`}>
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
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-accent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Live
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    ) : null}
    </div>
  </>
);

const Projects = () => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [displayProjectIndex, setDisplayProjectIndex] = useState(0);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const swapTimeoutRef = useRef(null);
  const enterTimeoutRef = useRef(null);

  useEffect(() => {
    preloadProjectImages();
  }, []);

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
        setActiveProjectIndex((current) => (current === 0 ? current : 0));
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
      <div className="section-content relative mx-auto max-w-4xl px-5 pt-16 pb-16 lg:max-w-6xl lg:pt-12 xl:pt-14 2xl:max-w-7xl lg:px-6 xl:pb-0">
        <div className={`projects-static mb-10 ${shouldReduceMotion ? "" : "lg:hidden"}`}>
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

        <div className={`projects-static space-y-6 ${shouldReduceMotion ? "" : "lg:hidden"}`}>
          {projects.map((project, index) => (
            <motion.article
              key={`mobile-${project.title}`}
              className="project-card flex min-h-[24rem] flex-col rounded-2xl px-3 py-3"
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
          <div className="projects-sticky sticky top-24 flex min-h-[calc(100vh-8rem)] items-start">
            <div className="mx-auto grid w-full gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.15fr)] xl:gap-10">
              <div tabIndex={0} aria-label="Project summary and technologies" className="projects-summary max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain">
                <p className="projects-eyebrow mb-4 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                  Selected Work
                </p>
                <h2 className="max-w-md text-4xl font-bold leading-tight text-primary md:text-5xl">
                  Projects
                </h2>
                <p className="projects-intro mt-4 max-w-md text-base text-primary/80">
                  Projects that reflect how I build software - scalable backends, polished interfaces, and attention to detail.
                </p>

                {shouldShowStack ? (
                  <div className="projects-tech-group mt-6">
                    <p className="projects-stack-label mb-4 text-xs font-semibold tracking-[0.18em] text-primary/80 uppercase">
                      Project Stack
                    </p>
                    <div className="projects-tech flex max-w-md flex-wrap gap-2.5">
                      <AnimatePresence initial={false}>
                        {visibleDesktopTech.map((tech) => (
                          <motion.span
                            key={`desktop-stack-${tech}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium tracking-wide text-primary/90"
                            initial={shouldReduceMotion ? false : techBadgeMotion.initial}
                            animate={shouldReduceMotion ? undefined : techBadgeMotion.animate}
                            exit={shouldReduceMotion ? undefined : techBadgeMotion.exit}
                            layout
                          >
                            <TechLabel tech={tech} />
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
                      tabIndex={0}
                      aria-label={`${activeProject.title} project details`}
                      className="project-card relative z-10 flex max-h-[calc(100dvh-8rem)] flex-col overflow-y-auto overscroll-contain rounded-3xl"
                      initial={shouldReduceMotion ? false : desktopCardMotion.initial}
                      animate={shouldReduceMotion ? undefined : desktopCardMotion.animate}
                      exit={shouldReduceMotion ? undefined : desktopCardMotion.exit}
                    >
                      <ProjectCardContent project={activeProject} projectIndex={effectiveDisplayProjectIndex} showTech={false} />
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
