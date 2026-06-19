import React from "react";
import { motion } from "framer-motion";
import Scene3dDynamic from "../Scene3dDynamic";
import Image from "next/image";

import roadMobile from "@/public/scene/roadsMobile.webp";

const MobileScene = ({ parallaxStyle }) => {
  return (
    <motion.div
      className="hero-parallax-layer relative isolate h-screen w-full overflow-hidden sm:hidden"
      style={parallaxStyle}
    >
      <div className="absolute inset-0 z-0">
        <Scene3dDynamic distance={5} speed={1.2} yaxis={-5.3} zoom={-16} />
      </div>
      <Image
        src={roadMobile}
        alt="Road with a streetlight where my avatar is walking"
        priority
        sizes="100vw"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-auto w-full select-none"
      />
    </motion.div>
  );
};

export default MobileScene;
