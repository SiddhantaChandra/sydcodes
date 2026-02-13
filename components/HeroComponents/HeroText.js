import React from 'react';

export default function HeroText() {
  return (
    <div className="relative z-20 flex flex-col items-center text-center select-none -mt-36 sm:-mt-24 md:-mt-28 lg:-mt-32 ">
      <span className="text-lg md:text-xl text-muted-foreground mb-2 drop-shadow-lg">Hi, I am</span>
      <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold text-primary mb-2 drop-shadow-lg ">Siddhanta Chandra</h1>
      <p className="max-w-xl lg:max-w-2xl text-base  md:text-lg lg:text-xl text-white px-4 mb-2 drop-shadow-lg">
      I'm committed to developing websites that deliver memorable digital experiences through clean, reusable code.
      </p>
    </div>
  );
} 