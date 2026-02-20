'use client';

import React from 'react';
import TechStackPhysics from './TechStackPhysics';
import Image from 'next/image';

const ExperienceCard = ({ item, isCurrent = false }) => {
  return (
    <div className="relative flex w-full flex-col gap-4 lg:flex-row lg:items-start">
      <div className="hidden lg:flex w-20 flex-col items-center">
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full border ${
            isCurrent
              ? 'border-green-500 ring-2 ring-green-500/20 pulse-ring'
              : 'border-border'
          } bg-card`}
        >
          <Image
            src={item.companyImg}
            alt={item.company}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
          <span className="pointer-events-none absolute -right-6 top-1/2 h-px w-6 bg-border" />
        </div>
      </div>

      <article className="relative w-full min-w-0 flex-1 overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:bg-card lg:pl-6">
        {item.techstack?.length > 0 && (
          <TechStackPhysics technologies={item.techstack} />
        )}

        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <Image
              src={item.companyImg}
              alt={item.company}
              width={50}
              height={50}
              className={`h-12 w-12 shrink-0 rounded-full object-cover lg:hidden ${
                isCurrent ? 'ring-2 ring-emerald-500/20 border-2 border-emerald-500 pulse-ring' : ''
              }`}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-foreground">{item.company}</h3>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>

              <p className="mt-1 text-sm font-medium text-primary">{item.role}</p>
            </div>
          </div>
          {item.details?.length > 0 && (
            <ul className="mb-16 mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground sm:mb-8">
              {item.details.map((detail, index) => (
                <li key={`${detail}-${index}`}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
};

export default ExperienceCard;
