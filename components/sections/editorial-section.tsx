"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const specs = [
  { label: "Expertise", value: "Immobilier haut standing" },
  { label: "Typologies", value: "S+1 à Villas" },
  { label: "Positionnement", value: "Premium contemporain" },
  { label: "Zone", value: "Sousse" },
];

export function EditorialSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    if (!videoRef.current) return;
    
    const rect = videoRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate when video enters and exits viewport
    const videoTop = rect.top;
    const videoBottom = rect.bottom;
    
    // Progress from 0 (entering viewport) to 1 (exiting viewport)
    if (videoBottom > 0 && videoTop < windowHeight) {
      const progress = 1 - (videoTop + rect.height / 2) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateParallax]);

  // Parallax effect: video moves up as you scroll down
  const parallaxY = (scrollProgress - 0.5) * 30; // -15px to +15px range

  return (
    <section className="bg-background">
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border mt-12 border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-5 text-center last:border-r-0 sm:p-6 md:border-b-0 md:p-8"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:mb-2 sm:text-xs">
              {spec.label}
            </p>
            <p className="text-xl font-medium text-foreground sm:text-2xl md:text-4xl lg:text-5xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
