"use client";

import { useEffect, useState } from "react";

const Scene3dDynamic = (props) => {
  const [ResolvedScene, setResolvedScene] = useState(null);

  useEffect(() => {
    let cancelled = false;

    import("./Scene3d").then((module) => {
      if (cancelled) {
        return;
      }

      setResolvedScene(() => module.default);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ResolvedScene) {
    return null;
  }

  return <ResolvedScene {...props} />;
};

export default Scene3dDynamic;
