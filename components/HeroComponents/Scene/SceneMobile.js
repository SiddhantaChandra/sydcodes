import React from 'react';
import Image from 'next/image';
import streetMobileImage from '@/public/images/roadsMobile.webp';
import Character3D from '@/components/HeroComponents/Scene3D';

const SceneMobile = () => {
  return (
    <div className="absolute bottom-0 h-full w-full sm:hidden">
      <Character3D
        scale={0.6}
        speed={0.8}
        walkRange={3.2}
        y={-5}
        className="pointer-events-none absolute inset-0 z-30"
      />
      <Image
        src={streetMobileImage}
        alt="Street"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-auto w-full"
      />
    </div>
  );
};

export default SceneMobile;
