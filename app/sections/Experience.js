 'use client';

import React, { useState } from 'react';
import ExperienceTitle from '@/app/components/Experience/ExperienceTitle';
import ExperienceTab from '@/app/components/Experience/ExperienceTab';
import ExperienceCard from '@/app/components/Experience/ExperienceCard';
import EducationCard from '@/app/components/Experience/EducationCard';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const experienceItems = [
    {
      role: 'Onlybees Pvt. Ltd.',
      company: 'Frontend Developer Intern',
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
      role: 'CricketWinner LLC',
      company: 'Frontend Developer',
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
    <section id="experience" className="flex min-h-screen items-center justify-center bg-muted/10 px-6 py-20 ">
      <div className="mx-auto w-full max-w-7xl">
        <div className='flex items-center sm:justify-between mb-4 flex-col gap-4 sm:gap-0 sm:flex-row'>
        <ExperienceTitle title="My Journey" />

        <ExperienceTab activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="absolute bottom-8 left-10 top-8 hidden w-px bg-border/50 lg:block"
          />

          <div className={activeTab === 'experience' ? 'space-y-4' : 'hidden'}>
            {experienceItems.map((item, idx) => (
              <ExperienceCard key={`${item.period}-${item.company}`} item={item} isCurrent={idx === 0} />
            ))}
          </div>

          <div className={activeTab === 'education' ? 'space-y-4' : 'hidden'}>
            {educationItems.map((item) => (
              <EducationCard key={`${item.period}-${item.institution}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
