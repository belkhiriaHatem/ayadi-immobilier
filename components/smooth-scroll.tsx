"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

const lenisOptions = {
  lerp: 0.08,
  duration: 1.4,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.5,
  infinite: false,
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setEnabled(!reduceMotion.matches && !coarsePointer.matches);
    };

    update();
    reduceMotion.addEventListener("change", update);
    coarsePointer.addEventListener("change", update);
    return () => {
      reduceMotion.removeEventListener("change", update);
      coarsePointer.removeEventListener("change", update);
    };
  }, []);

  // Mount Lenis only on the client to avoid hydration mismatches
  if (!enabled) {
    return children;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
