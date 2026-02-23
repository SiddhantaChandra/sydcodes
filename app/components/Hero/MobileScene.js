import React from "react";
import Scene3d from "../Scene3d";
import Image from "next/image";

import roadMobile from "@/public/scene/roadsMobile.webp";

const MobileScene = () => {
  return (
    <div className="relative isolate h-screen w-full overflow-hidden sm:hidden">
      <div className="absolute inset-0 z-0">
        <Scene3d distance={5} speed={1.2} yaxis={-5.3} zoom={-16} />
      </div>
      <Image
        src={roadMobile}
        alt="Road with a streetlight where my avatar is walking"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-auto w-full select-none"
      />
    </div>
  );
};

export default MobileScene;
