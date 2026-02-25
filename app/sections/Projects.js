"use client";

import React, { useEffect, useRef } from "react";

const projects = [
  {
    title: "Vertex Commerce",
    type: "Fullstack Platform",
    description:
      "Headless storefront with blazing-fast catalog discovery, custom checkout, and analytics-ready event tracking.",
    tech: "Next.js · Node.js · PostgreSQL",
  },
  {
    title: "Luma Studio",
    type: "Creative Portfolio",
    description:
      "Immersive agency website with smooth storytelling sections, modular CMS blocks, and responsive media pipelines.",
    tech: "Next.js · Sanity · Tailwind",
  },
  {
    title: "PulseBoard",
    type: "SaaS Dashboard",
    description:
      "Live operational dashboard with role-based views, real-time widgets, and contextual drill-down interactions.",
    tech: "React · Express · WebSockets",
  },
  {
    title: "Nomad Routes",
    type: "Travel Product",
    description:
      "Trip-planning platform combining route optimization, collaborative itinerary editing, and map-centric UI patterns.",
    tech: "Next.js · Prisma · Mapbox",
  },
  {
    title: "Signal Hiring",
    type: "Recruitment Suite",
    description:
      "Hiring workflow system with candidate pipelines, scorecards, and interview scheduling automation.",
    tech: "Next.js · Supabase · TypeScript",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);

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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative px-6 lg:max-w-4xl 2xl:max-w-7xl mx-auto "
      style={{ minHeight: "500vh" }}
    >
      <div className="projects-sticky sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
              Selected Work
            </p>
            <h2 className="max-w-md text-4xl font-bold leading-tight text-primary md:text-5xl">
              Bring the Heat
            </h2>
            <p className="mt-4 max-w-md text-base text-primary/80">
              Scroll through five crafted projects. They appear one by one and
              stack into a single centered stage.
            </p>
          </div>

          <div className="projects-stack relative h-[68vh] min-h-96">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="project-card rounded-3xl border border-primary/18 bg-primary/6 p-7 backdrop-blur-md md:p-8"
                style={{
                  "--project-start": `${0.06 + index * 0.16}`,
                  "--project-span": "0.16",
                  "--project-tilt": `${(2 - index) * 1.2}deg`,
                  zIndex: index + 1,
                }}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-primary">{project.title}</h3>
                  <span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase">
                    {project.type}
                  </span>
                </div>
                <p className="mb-4 text-base leading-relaxed text-primary/82">
                  {project.description}
                </p>
                <p className="text-sm font-medium text-primary/72">{project.tech}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;