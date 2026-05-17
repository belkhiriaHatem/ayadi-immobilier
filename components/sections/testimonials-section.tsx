"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* About Image with Text Overlay */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/hills.png"
          alt="Résidence Ayadi — architecture et intérieurs de luxe"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - dark at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-end justify-center px-4 pb-10 sm:px-6 sm:pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p className="mx-auto max-w-5xl text-center text-base leading-relaxed text-white drop-shadow-md sm:text-xl md:text-3xl lg:text-[2.5rem] lg:leading-snug">
            {`Immobilière Anouar Ayadi — promoteur immobilier en Tunisie. Nous créons des résidences où le design contemporain, les matériaux nobles et le confort absolu se rencontrent pour ceux qui exigent l'excellence.`}
          </p>
        </div>
      </div>
    </section>
  );
}
