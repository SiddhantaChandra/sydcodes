'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const ExperienceCard = ({ item, mobile = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        mobile
          ? 'w-full min-h-[460px] p-6'
          : 'flex-shrink-0 w-[85vw] md:w-[68vw] lg:w-[52vw] h-[60vh] md:h-[68vh] lg:h-[72vh] max-h-[760px] p-8 md:p-12'
      } flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl hover:bg-white/[0.04] hover:border-white/20 transition-colors duration-500 overflow-hidden relative group`}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#c23132]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex justify-between items-start gap-4 z-10">
        <div className="min-w-0">
          <h4 className="text-2xl md:text-3xl font-bold text-[#e7d5c3] mb-2 leading-tight">
            {item.role}
          </h4>
          <p className="text-sm md:text-base text-white/50 leading-relaxed">
            {item.company} • {item.period}
          </p>
        </div>
        {item.companyImg && (
          <div className="hidden sm:block w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <Image src={item.companyImg} alt={item.company} width={64} height={64} className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      <ul className={`mt-6 md:mt-8 space-y-4 flex-grow z-10 ${mobile ? '' : 'md:overflow-y-auto md:pr-4'} custom-scrollbar`}>
        {item.details.map((detail, idx) => (
          <li key={idx} className="text-white/70 text-sm 2xl:text-lg flex items-start gap-3 leading-relaxed">
            <span className="text-[#c23132] mt-1 shrink-0">✦</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-6 md:mt-8 z-10">
        {item.techstack.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-white/10 bg-black/40 text-xs 2xl:text-sm text-[#e7d5c3]">
            <Image src={tech.icon} alt="" aria-hidden="true" width={16} height={16} className="w-4 h-4 opacity-80" />
            {tech.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = ({ items, mobile = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${
        mobile
          ? 'w-full'
          : 'flex-shrink-0 w-[85vw] md:w-[58vw] lg:w-[46vw] min-h-[320px] md:min-h-[68vh] lg:min-h-[72vh] max-h-[760px]'
      } flex flex-col border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 md:p-6 hover:bg-white/[0.04] hover:border-white/20 transition-colors duration-500 overflow-hidden relative group`}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#c23132]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="z-10 flex-1 space-y-3">
        {items.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className={idx === items.length - 1 ? 'px-1 py-3 md:py-4' : 'px-1 py-3 md:py-4 border-b border-white/10'}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2">
              <h5 className="text-sm md:text-lg font-semibold text-[#e7d5c3] leading-snug">
                {item.title}
              </h5>
              <div className="shrink-0 inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white/50 tracking-wider whitespace-nowrap">
                {item.period}
              </div>
              <p className="col-span-2 text-white/65 text-sm md:text-base leading-relaxed">
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
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  const experienceItems = [
    {
      role: 'Frontend Developer Intern',
      company: 'Onlybees Pvt. Ltd.',
      companyImg: '/company-images/onlybees_logo.webp',
      period: 'Feb, 2026 — Present',
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
  ];

  return (
    <section ref={targetRef} id="experience" className="relative bg-[#000] pt-8 md:h-[400vh]">
      <div className="px-5 pt-20 pb-12 md:hidden">
        <h2 className="text-4xl font-black uppercase text-white/10 tracking-tighter leading-none mb-8">
          Journey
        </h2>

        <div className="space-y-10">
          <div>
            <h3 className="text-white/20 uppercase tracking-[0.3em] font-bold text-sm mb-4">
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
            <h3 className="text-white/20 uppercase tracking-[0.3em] font-bold text-sm mb-4">
              Education
            </h3>
            <EducationCard items={educationItems} mobile />
          </div>
        </div>
      </div>

      <div className="hidden md:block sticky top-0 h-screen overflow-hidden md:pt-36 lg:pt-36">
        <div className="absolute top-8 md:top-12 left-6 md:left-24 z-50 flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-none pt-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white/10 tracking-tighter leading-none">
            Journey
          </h2>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-8 pl-6 pr-4 md:pl-24 md:pr-10 w-max items-center"
        >
          <h3 className="text-white/20 uppercase tracking-[0.3em] font-bold text-xl md:text-3xl shrink-0 mx-4 w-fit [writing-mode:vertical-rl] rotate-180">
            Experience
          </h3>

          {experienceItems.map((item, idx) => (
            <ExperienceCard key={`exp-${idx}`} item={item} />
          ))}

          <div className="flex items-center gap-8 md:gap-16 mx-4">
            <div className="w-[1px] h-32 bg-white/10 shrink-0" />
            <h3 className="text-white/20 uppercase tracking-[0.3em] font-bold text-xl md:text-3xl shrink-0 w-fit [writing-mode:vertical-rl] rotate-180">
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
