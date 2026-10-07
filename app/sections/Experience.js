'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const ExperienceCard = ({ item, mobile = false }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        mobile
          ? 'w-full min-h-[460px] p-6'
          : 'flex-shrink-0 w-[85vw] md:w-[68vw] lg:w-[52vw] h-[min(72vh,calc(100dvh-11rem))] max-h-[760px] p-8 md:p-12'
      } flex flex-col justify-between border border-white/20 bg-[#171717] shadow-[0_12px_40px_rgba(0,0,0,0.25)] rounded-3xl overflow-hidden relative`}
    >
      <div className="flex justify-between items-start gap-4 z-10">
        <div className="min-w-0">
          <h4 className="text-2xl md:text-3xl font-bold text-[#e7d5c3] mb-2 leading-tight">
            {item.role}
          </h4>
          <p className="text-sm md:text-base text-white/75 leading-relaxed">
            {item.company} • {item.period}
          </p>
        </div>
        {item.companyImg && (
          <div className="hidden sm:block w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <Image
              src={item.companyImg}
              alt={item.company}
              width={64}
              height={64}
              sizes="64px"
              unoptimized
              loading={mobile ? 'lazy' : 'eager'}
              fetchPriority={mobile ? 'low' : 'high'}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>

      <ul tabIndex={mobile ? undefined : 0} aria-label={`${item.company} responsibilities`} className={`mt-6 md:mt-8 list-disc pl-5 marker:text-[#c23132] space-y-4 flex-grow min-h-0 z-10 ${mobile ? '' : 'overflow-y-auto overscroll-contain pr-4'} custom-scrollbar`}>
        {item.details.map((detail, idx) => (
          <li key={idx} className="text-white/90 text-sm 2xl:text-lg leading-relaxed">
            {detail}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-6 md:mt-8 z-10">
        {item.techstack.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs 2xl:text-sm text-[#e7d5c3]">
            <Image
              src={tech.icon}
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              sizes="16px"
              loading="lazy"
              fetchPriority="low"
              className="w-4 h-4 opacity-80"
            />
            {tech.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = ({ items, mobile = false }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        mobile
          ? 'w-full'
          : 'flex-shrink-0 w-[85vw] md:w-[58vw] lg:w-[46vw] h-[min(72vh,calc(100dvh-11rem))] max-h-[760px]'
      } flex flex-col border border-white/20 bg-[#171717] shadow-[0_12px_40px_rgba(0,0,0,0.25)] rounded-3xl p-5 md:p-6 overflow-hidden relative`}
    >
      <div tabIndex={mobile ? undefined : 0} aria-label="Education history" className={`z-10 flex-1 min-h-0 space-y-3 ${mobile ? '' : 'overflow-y-auto overscroll-contain'}`}>
        {items.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className={idx === items.length - 1 ? 'px-1 py-3 md:py-4' : 'px-1 py-3 md:py-4 border-b border-white/10'}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2">
              <h5 className="text-sm md:text-lg font-semibold text-[#e7d5c3] leading-snug">
                {item.title}
              </h5>
              <div className="shrink-0 inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/75 tracking-wider whitespace-nowrap">
                {item.period}
              </div>
              <p className="col-span-2 text-white/85 text-sm md:text-base leading-relaxed">
                {item.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const targetRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const [maxTranslateX, setMaxTranslateX] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return undefined;
    }

    const updateBounds = () => {
      const nextMaxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      setMaxTranslateX(nextMaxTranslate);
    };

    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener('resize', updateBounds);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslateX]);

  const experienceItems = [
    {
      role: 'Frontend Developer Intern',
      company: 'Onlybees Pvt. Ltd.',
      companyImg: '/company-images/onlybees_logo.webp',
      period: 'Feb, 2026 — Jun, 2026',
      details: [
        'Develop reusable React components used across multiple application modules, improving development consistency and reducing duplicate UI implementation.',
        'Optimized application performance using TanStack Query caching and data fetching strategies, minimizing redundant API requests and improving user experience.',
        'Develop and maintain REST APIs and business logic modules using NestJS, TypeScript and PostgreSQL.',
        'Owned backend implementation for multiple product features, designing endpoints, implementing business logic and supporting production deployments.'
      ],
      techstack: [
        { name: 'Next.js', icon: '/icons-tech/nextjs.svg' },
        { name: 'React.js', icon: '/icons-tech/react.svg' },
        { name: 'JavaScript', icon: '/icons-tech/javascript.svg' },
        { name: 'Tailwind CSS', icon: '/icons-tech/tailwind.svg' },
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'CricketWinner LLC',
      companyImg: '/company-images/cricketwinner.webp',
      period: 'June, 2021 — Nov, 2022',
      details: [
        'Designed responsive, accessible, and visually appealing user interfaces using React.js and SCSS',
        'Implemented React Query caching and query management, reducing redundant API requests and improving application responsiveness.',
        'Optimized website performance by reducing render-blocking resources and improving asset loading times by 1.89 seconds.',
        'Collaborated with back-end developers to create and integrate APIs efficiently.',
      ],
      techstack: [
        { name: 'React', icon: '/icons-tech/react.svg' },
        { name: 'SASS', icon: '/icons-tech/scss.svg' },
        { name: 'JavaScript', icon: '/icons-tech/javascript.svg' },
        { name: 'Figma', icon: '/icons-tech/figma.svg' },
      ],
    },
  ];

  const educationItems = [
    {
      title: 'Master In Computer Application',
      institution: 'Sister Nivedita University, Kolkata',
      period: '2024 — 2026',
    },
    {
      title: 'Bachelor Of Computer Application',
      institution: 'University of Engineering & Management, Kolkata',
      period: '2021 — 2024',
    },
    {
      title: 'Indian School Certificate (ISC)',
      institution: 'Julien Day School, Kolkata',
      period: '2019 — 2020',
    },
     {
      title: 'Council for the Indian School Certificate Examinations (CISCE)',
      institution: 'Julien Day School, Kolkata',
      period: '2017 — 2018',
    },
  ];

  return (
    <section
      ref={targetRef}
      id="experience"
      className="experience-section relative scroll-mt-24 overflow-x-clip bg-[#000] pt-8 md:h-[400vh]"
    >
      <div className="experience-static mx-auto max-w-4xl px-5 pt-20 pb-12 md:hidden">
        <h2 className="text-4xl font-black uppercase text-white/60 tracking-tighter leading-none mb-8">
          Journey
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-white/65 uppercase tracking-[0.3em] font-bold text-sm mb-4">
              Experience
            </h3>
            <div className="space-y-6">
              {experienceItems.map((item, idx) => (
                <ExperienceCard key={`mobile-exp-${idx}`} item={item} mobile />
              ))}
            </div>
          </div>

          <div>
            <div className="w-full h-px bg-white/10 mb-6" />
            <h3 className="text-white/65 uppercase tracking-[0.3em] font-bold text-sm mb-4">
              Education
            </h3>
            <EducationCard items={educationItems} mobile />
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="experience-desktop hidden md:block sticky top-0 h-dvh w-full overflow-hidden overflow-x-clip bg-[#000] md:pt-36 lg:pt-36"
      >
        <div className="absolute top-8 md:top-12 left-6 md:left-24 z-50 flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-none pt-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white/30 tracking-tighter leading-none">
            Journey
          </h2>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-8 pl-6 pr-4 md:pl-24 md:pr-10 w-max items-center"
        >
          <h3 className="text-white/60 uppercase tracking-[0.3em] font-bold text-xl md:text-3xl shrink-0 mx-4 w-fit [writing-mode:vertical-rl] rotate-180">
            Experience
          </h3>

          {experienceItems.map((item, idx) => (
            <ExperienceCard key={`exp-${idx}`} item={item} />
          ))}

          <div className="flex items-center gap-8 md:gap-16 mx-4">
            <div className="w-[1px] h-32 bg-white/10 shrink-0" />
            <h3 className="text-white/60 uppercase tracking-[0.3em] font-bold text-xl md:text-3xl shrink-0 w-fit [writing-mode:vertical-rl] rotate-180">
              Education
            </h3>
          </div>

          <EducationCard items={educationItems} />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
