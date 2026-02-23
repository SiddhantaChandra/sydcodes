import React from "react";

const HeroText = () => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col -top-35 items-center justify-center text-center select-none">
      <span className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-medium tracking-wide text-accent">
        Fullstack Developer
      </span>
      <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold text-primary mb-2 drop-shadow-lg">
        Siddhanta Chandra
      </h1>
      <p className="max-w-xl lg:max-w-2xl text-base md:text-lg lg:text-xl text-white px-4 mb-2 drop-shadow-lg">
        Fullstack Developer based in Kolkata, building robust architectures with
        creative designs and intuitive user interfaces.
      </p>
      <div className="mt-3 h-0.5 w-28 rounded-full bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_100%]" />
    </div>
  );
};

export default HeroText;
