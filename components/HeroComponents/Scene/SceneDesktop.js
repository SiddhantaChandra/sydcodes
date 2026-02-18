import React from 'react';
import Image from 'next/image';
import streetImage from '@/public/images/roads.webp';
import streetImageOverlay from '@/public/images/roads_overlay.webp';
import Character3D from '@/components/HeroComponents/Scene3D';

const SceneDesktop = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src={streetImageOverlay}
        alt="Street"
        className="pointer-events-none absolute bottom-0 left-0 z-40 hidden h-auto w-full lg:block"
      />
      <Character3D
              scale={1.1}
              speed={1.2}
              walkRange={14}
              y={-4.6}
              className="pointer-events-none absolute inset-0 z-30"
            />
      <Image
        src={streetImage}
        alt="Street"
        className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-auto w-full lg:block"
      />
    </div>
  );
};

export default SceneDesktop;
