'use client';

import React from 'react';

const ExperienceTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h2 className="text-fluid-4xl gradient-text font-display font-bold">{title}</h2>
      {/* <p className="mt-3 text-muted-foreground">{subtitle}</p> */}
    </div>
  );
};

export default ExperienceTitle;
