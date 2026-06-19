"use client";

import dynamic from "next/dynamic";

const Scene3dDynamic = dynamic(() => import("./Scene3d"), {
  ssr: false,
  loading: () => null,
});

export default Scene3dDynamic;
