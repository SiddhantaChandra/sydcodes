import React from 'react';
import Image from 'next/image';
import streetTabletsImage from '@/public/images/roadsTablets.webp';
import Character3D from '@/components/HeroComponents/Scene3D';

const SceneTablet = () => {
  return (
    <div className="absolute inset-0 hidden sm:block lg:hidden">
      <Character3D
        scale={0.8}
        speed={0.8}
        walkRange={5}
        y={-4.6}
        className="pointer-events-none absolute inset-0 z-30"
      />
      <Image
        src={streetTabletsImage}
        alt="Street"
        className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-auto w-full sm:block lg:hidden"
      />
    </div>
  );
};

export default SceneTablet;
