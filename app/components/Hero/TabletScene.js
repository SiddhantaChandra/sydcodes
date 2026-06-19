import React from "react";
import { motion } from "framer-motion";
import Scene3dDynamic from "../Scene3dDynamic";
import Image from "next/image";

import tabletMobile from "@/public/scene/roadsTablets.webp";

const TabletScene = ({ parallaxStyle }) => {
  return (
    <motion.div
      className="hero-parallax-layer relative isolate hidden h-screen w-full overflow-hidden sm:block lg:hidden"
      style={parallaxStyle}
    >
      <div className="absolute inset-0 z-0">
        <Scene3dDynamic distance={5} speed={1.2} yaxis={-3.4} zoom={-12} />
      </div>
      <Image
        src={tabletMobile}
        alt="Road with a streetlight where my avatar is walking"
        priority
        sizes="100vw"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-auto w-full select-none"
      />
    </motion.div>
  );
};

export default TabletScene;
