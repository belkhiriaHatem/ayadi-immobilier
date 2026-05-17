"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Slower animation - more viewport range
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      
      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="text-xl font-semibold leading-snug text-foreground sm:text-2xl md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => {
        // Calculate blur and opacity based on scroll progress
        const appearProgress = progress * (words.length + 1);
        const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - index));
        const wordOpacity = wordAppearProgress;
        const wordBlur = (1 - wordAppearProgress) * 40;
        
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: wordOpacity,
              filter: `blur(${wordBlur}px)`,
              transition: 'opacity 0.1s linear, filter 0.1s linear',
              marginRight: '0.3em',
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "/images/interior-view.png",
    alt: "Salon contemporain — finitions premium",
    position: "left",
  },
  {
    src: "/images/rusted-metal.png",
    alt: "Détails architecturaux — bois et laiton",
    position: "right",
  },
];

const textCycles = [
  "Design & Finitions.",
  "Matériaux Nobles.",
  "Lumière & Confort.",
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);
  const descriptionText = "Chaque projet Ayadi allie architecture contemporaine et savoir-faire artisanal. Marbre, boiseries sur mesure, éclairage intégré et espaces généreux composent des intérieurs où le luxe devient quotidien. Immobilière Anouar Ayadi vous accompagne de la conception à la livraison de votre résidence.";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * (isMobile ? 2.5 : 4);
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);

    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  // Title fades out first (0 to 0.2)
  const titleOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after title fades (0.2 to 1)
  const imageProgress = isMobile
    ? 0
    : Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  const centerWidth = isMobile ? 100 : 100 - imageProgress * 58;
  const centerHeight = isMobile ? 100 : 100 - imageProgress * 30;
  const sideWidth = isMobile ? 0 : imageProgress * 22;
  const sideOpacity = isMobile ? 0 : imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const gap = imageProgress * 16; // 0px to 16px

  return (
    <section id="technology" ref={sectionRef} className="relative bg-secondary">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: "100%",
                transform: `translateX(${sideTranslateLeft}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <Image
                  key={idx}
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              ))}
            </div>

            {/* Main Center Image */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
              }}
            >
              {/* Layered Images - Progressive Fade In */}
              {/* Image 1 - Base layer - Sunrise/Sunset with sun rays */}
              <Image
                src="/images/mono-1.png"
                alt="Hall d'entrée — Résidence Ayadi"
                fill
                className="object-cover"
                style={{
                  opacity: scrollProgress < 0.25 ? 1 : 1,
                }}
              />
              
              {/* Image 2 - Daytime scene - Fades in during first text cycle */}
              <Image
                src="/images/mono-2.png"
                alt="Salon contemporain — finitions marbre"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.2)),
                  transition: 'opacity 0.3s ease',
                }}
              />
              
              {/* Image 3 - Dusk/Evening - Fades in during second text cycle */}
              <Image
                src="/images/mono-3.png"
                alt="Détails architecturaux — bois et laiton"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.2)),
                  transition: 'opacity 0.3s ease',
                }}
              />
              
              {/* Image 4 - Night with stars - Fades in during third text cycle */}
              <Image
                src="/images/mono-4.png"
                alt="Espace de vie — éclairage d'ambiance"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.2)),
                  transition: 'opacity 0.3s ease',
                }}
              />
              
              <div className="absolute inset-0 bg-black/25" />
              
              {/* Title Text - Cycles through 3 texts with blur effect */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                {textCycles.map((text, cycleIndex) => {
                  // Each text cycle takes 1/3 of the scroll progress
                  const cycleStart = cycleIndex / textCycles.length;
                  const cycleEnd = (cycleIndex + 1) / textCycles.length;
                  const cycleMid = (cycleStart + cycleEnd) / 2;
                  
                  const words = text.split(" ");
                  
                  return (
                    <h2 
                      key={cycleIndex}
                      className="absolute max-w-3xl px-4 text-3xl font-medium leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-7xl"
                    >
                      {words.map((word, wordIndex) => {
                        let wordOpacity = 0;
                        let wordBlur = 40;
                        
                        if (scrollProgress >= cycleStart && scrollProgress < cycleEnd) {
                          const localProgress = (scrollProgress - cycleStart) / (cycleEnd - cycleStart);
                          
                          // First half: appear (blur 40→0, opacity 0→1)
                          if (localProgress < 0.5) {
                            const appearProgress = (localProgress / 0.5) * (words.length + 1);
                            const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - wordIndex));
                            wordOpacity = wordAppearProgress;
                            wordBlur = (1 - wordAppearProgress) * 40;
                          } 
                          // Second half: disappear (blur 0→40, opacity 1→0)
                          else {
                            const disappearProgress = ((localProgress - 0.5) / 0.5) * (words.length + 1);
                            const wordDisappearProgress = Math.max(0, Math.min(1, disappearProgress - wordIndex));
                            wordOpacity = 1 - wordDisappearProgress;
                            wordBlur = wordDisappearProgress * 40;
                          }
                        }
                        
                        return (
                          <span
                            key={wordIndex}
                            className="inline-block"
                            style={{
                              opacity: wordOpacity,
                              filter: `blur(${wordBlur}px)`,
                              transition: 'opacity 0.1s linear, filter 0.1s linear',
                              marginRight: '0.3em',
                            }}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </h2>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: "100%",
                transform: `translateX(${sideTranslateRight}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <Image
                  key={idx}
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation - increased for 3 text cycles */}
      <div className={isMobile ? "h-[250vh]" : "h-[400vh]"} />

      {/* Description Section with Background Image and Scroll Reveal */}
      <div 
        ref={textSectionRef}
        className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
      >
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-0"
          style={{
            height: "120px",
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
          }}
        />

        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
