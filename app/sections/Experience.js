 'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import lottie from 'lottie-web';

const LottieIcon = ({ animationDataPath }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animationDataPath,
    });
    return () => anim.destroy();
  }, [animationDataPath]);

  return <div ref={container} className="w-16 h-16 md:w-24 md:h-24 mix-blend-screen opacity-80" />;
};

const ExperienceCard = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] max-h-[600px] flex flex-col justify-between 
                 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 md:p-12 
                 hover:bg-white/[0.04] hover:border-white/20 transition-colors duration-500 overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#c23132]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex justify-between items-start gap-4 z-10">
        <div>
          <h3 className="text-3xl md:text-5xl font-bold text-[#e7d5c3] mb-2">{item.role}</h3>
          <p className="text-lg md:text-xl text-white/50">{item.company} • {item.period}</p>
        </div>
        {item.companyImg && (
          <div className="hidden sm:block w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <Image src={item.companyImg} alt={item.company} width={64} height={64} className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      <ul className="mt-8 space-y-4 flex-grow z-10 overflow-y-auto pr-4 custom-scrollbar">
        {item.details.map((detail, idx) => (
          <li key={idx} className="text-white/70 text-base md:text-lg flex items-start gap-3">
            <span className="text-[#c23132] mt-1 shrink-0">✦</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-8 z-10">
        {item.techstack.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-sm text-[#e7d5c3]">
             <Image src={tech.icon} alt={tech.name} width={16} height={16} className="w-4 h-4 opacity-80" />
             {tech.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] h-[50vh] max-h-[500px] flex flex-col justify-center items-center text-center
                 border border-[#c23132]/20 bg-linear-to-br from-white/[0.01] to-[#c23132]/[0.05] backdrop-blur-xl rounded-3xl p-8 md:p-12 
                 hover:border-[#c23132]/50 transition-colors duration-500 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#c23132] to-transparent opacity-30" />
      <div className="z-10 flex flex-col items-center">
        {item.lottie && (
          <div className="mb-6 -mt-8">
            <LottieIcon animationDataPath={item.lottie} />
          </div>
        )}
        <h3 className="text-2xl md:text-4xl font-bold text-[#e7d5c3] mb-4">{item.title}</h3>
        <p className="text-lg text-white/70 mb-2">{item.institution}</p>
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white/50 tracking-wider">
          {item.period}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const experienceItems = [
    {
      role: 'Frontend Developer Intern',
      company: 'Onlybees Pvt. Ltd.',
      companyImg: '/company-images/onlybees_logo.webp',
      period: 'Feb, 2026 — Present',
      details: [
        'Building responsive and reusable UI components using React.',
        'Styling modern, mobile-first interfaces with Tailwind CSS, ensuring consistent design systems and cross-device compatibility.',
        'Integrating REST APIs and managing application state using JavaScript.',
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
        'Designed and developed responsive, accessible, and visually appealing user interfaces.',
        'Implemented React.js and SASS for a seamless and responsive experience.',
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
      lottie: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/lottie.json',
    },
    {
      title: 'Bachelor Of Computer Application',
      institution: 'University of Engineering & Management, Kolkata',
      period: '2021 — 2024',
      lottie: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/lottie.json',
    },
    {
      title: 'Indian School Certificate (ISC)',
      institution: 'Julien Day School, Kolkata',
      period: '2019 — 2020',
      lottie: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f609/lottie.json'
    },
    {
      title: 'Indian Certificate of Secondary Education (ICSE)',
      institution: 'Julien Day School, Kolkata',
      period: '2017 — 2018',
      lottie: 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f3c1/lottie.json',
    },
  ];

  return (
    <section ref={targetRef} id="experience" className="relative h-[400vh] bg-[#000]">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="absolute top-12 md:top-24 left-6 md:left-24 z-50 flex flex-col md:flex-row items-start md:items-center gap-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white/10 tracking-tighter">
            Journey
          </h2>
        </div>

        {/* Scroll Content */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-16 px-6 md:px-24 w-max items-center mt-20"
        >
          {/* Section Label: Experience */}
          <div className="text-white/20 uppercase tracking-[0.3em] font-bold text-xl md:text-3xl writing-vertical-lr rotate-180 shrink-0 mx-4">
            Experience
          </div>

          {experienceItems.map((item, idx) => (
            <ExperienceCard key={`exp-${idx}`} item={item} />
          ))}

          {/* Divider & Next Section Label: Education */}
          <div className="flex items-center gap-8 md:gap-16 mx-4">
            <div className="w-[1px] h-32 bg-white/10 shrink-0" />
            <div className="text-white/20 uppercase tracking-[0.3em] font-bold text-xl md:text-3xl writing-vertical-lr rotate-180 shrink-0">
              Education
            </div>
          </div>

          {educationItems.map((item, idx) => (
            <EducationCard key={`edu-${idx}`} item={item} />
          ))}

        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4 text-white/30 text-sm font-medium uppercase tracking-widest z-50">
          <div className="w-12 h-[1px] bg-white/30 relative overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress, originX: 0 }}
              className="absolute inset-0 bg-[#c23132]"
            />
          </div>
          <span>Scroll to explore</span>
        </div>

      </div>
    </section>
  );
};

export default Experience;
