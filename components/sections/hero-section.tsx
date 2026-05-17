"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useIsMobile } from "@/hooks/use-mobile";

const word = "AYADI";

const sideImages = [
  {
    src: "/images/hero-side-1.png",
    alt: "Intérieur luxueux — boiseries et éclairage doré",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero-side-2.png",
    alt: "Hall d'entrée contemporain — Résidence Ayadi",
    position: "left",
    span: 1,
  },
  {
    src: "/images/hero-side-3.png",
    alt: "Salon avec finitions marbre et lumière tamisée",
    position: "right",
    span: 1,
  },
  {
    src: "/images/hero-side-4.png",
    alt: "Architecture intérieure haut standing",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * (isMobile ? 1.2 : 2);
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

  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = isMobile ? 0 : Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = isMobile ? 100 : 100 - imageProgress * 80;
  const centerHeight = 100;
  const sideWidth = isMobile ? 0 : imageProgress * 40;
  const sideOpacity = isMobile ? 0 : imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const borderRadius = 0;
  const gap = imageProgress * 8;
  const sideTranslateY = -(imageProgress * 15);

  return (
    <section id="hero" ref={sectionRef} className="relative bg-background">
      <div className="sticky top-0 h-[100dvh] overflow-hidden pt-14 md:pt-0">
        <div className="flex h-full w-full items-center justify-center">
          <section
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px` }}
          >
            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <div
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: isMobile ? "translateY(-60px)" : "translateY(-200px)" }}
              >
                <h1 className="whitespace-nowrap font-display text-[28vw] font-bold leading-[0.8] tracking-tighter text-black drop-shadow-md sm:text-[35vw]">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: "all 1.5s",
                        transitionTimingFunction: "cubic-bezier(0.86, 0, 0.07, 1)",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>

              <Image
                src="/images/hero-mono.png"
                alt="Résidence Ayadi — intérieur de luxe"
                fill
                className="absolute inset-0 z-10 object-cover opacity-90"
                priority
              />
            </div>

            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>

      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <p className="mx-auto max-w-2xl px-2 text-center font-display text-lg leading-relaxed text-white drop-shadow-md sm:text-xl md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          {site.tagline}
        </p>
      </div>

      <div className={isMobile ? "h-[120vh]" : "h-[200vh]"} />
    </section>
  );
}