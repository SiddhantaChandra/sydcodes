import React from "react";
import Scene3d from "../Scene3d";
import Image from "next/image";

import roadDesktop from "@/public/scene/roads.webp";
import roadOverlayDesktop from "@/public/scene/roads_overlay.webp";

const DesktopScene = () => {
  return (
    <div className="relative isolate h-screen w-full overflow-hidden hidden lg:block">
      <Image
        src={roadOverlayDesktop}
        alt="Road with a streetlight where my avatar is walking"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-auto w-full select-none"
      />
      <div className="absolute inset-0 z-0">
        <Scene3d distance={13} speed={1.2} yaxis={-3.7} zoom={-12} />
      </div>
      <Image
        src={roadDesktop}
        alt="Road with a streetlight where my avatar is walking"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-auto w-full select-none"
      />
    </div>
  );
};

export default DesktopScene;
