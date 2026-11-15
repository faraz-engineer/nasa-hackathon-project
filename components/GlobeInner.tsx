"use client";

import React, { useRef, useEffect } from "react";
import Globe, { type GlobeProps, type GlobeMethods } from "react-globe.gl";

export interface GlobeInnerProps extends GlobeProps {
  onGlobeInstance?: (instance: GlobeMethods) => void;
}

export default function GlobeInner({
  onGlobeInstance,
  ...props
}: GlobeInnerProps) {
  const localRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    if (localRef.current && onGlobeInstance) {
      onGlobeInstance(localRef.current);
    }
  });

  return <Globe ref={localRef} {...props} />;
}
