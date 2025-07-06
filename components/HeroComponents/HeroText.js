import React from 'react';

export default function HeroText() {
  return (
    <div className="relative z-20 flex flex-col items-center text-center select-none">
      <span className="text-lg md:text-xl text-muted-foreground mb-2">Hi, I am</span>
      <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">Siddhanta Chandra</h1>
      <p className="max-w-xl text-base md:text-lg text-muted-foreground">
      I'm committed to developing websites that deliver memorable digital experiences through clean, reusable code.
      </p>
    </div>
  );
} 