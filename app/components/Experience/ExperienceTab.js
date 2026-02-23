'use client';

import React from 'react';

const ExperienceTab = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex w-fit rounded-full border border-border bg-card/70 p-1 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setActiveTab('experience')}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
          activeTab === 'experience'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Experience
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('education')}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
          activeTab === 'education'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Education
      </button>
    </div>
  );
};

export default ExperienceTab;
