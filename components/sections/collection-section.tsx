"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";
import { site } from "@/lib/site";

const residences = [
  {
    id: 1,
    name: "Appartement S+2",
    description: "Espace lumineux avec finitions haut standing et terrasse",
    price: "Sur demande",
    image: "/images/hero-side-1.png",
  },
  {
    id: 2,
    name: "Appartement S+3",
    description: "Volume généreux, cuisine équipée et suites parentales",
    price: "Sur demande",
    image: "/images/hero-side-2.png",
  },
  {
    id: 3,
    name: "Penthouse",
    description: "Sommet de la résidence — vue panoramique et prestations exclusives",
    price: "Sur demande",
    image: "/images/hero-side-4.png",
  },
];

function ResidenceCard({ residence }: { residence: (typeof residences)[0] }) {
  return (
    <article className="group">
      <figure className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
        <FadeImage
          src={residence.image || "/placeholder.svg"}
          alt={residence.name}
          fill
          className="object-cover group-hover:scale-105"
        />
      </figure>
      <header className="py-6">
        <div className="flex items-start justify-between gap-4">
          <span className="flex-1">
            <h3 className="text-lg font-medium leading-snug text-foreground">{residence.name}</h3>
            <span className="mt-2 block text-sm text-muted-foreground">{residence.description}</span>
          </span>
          <span className="font-medium text-primary text-lg md:text-2xl">{residence.price}</span>
        </div>
        <Link
          href={site.phoneHref}
          className="mt-4 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          Demander des informations
        </Link>
      </header>
    </article>
  );
}

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      <header className="px-4 py-12 sm:px-6 md:px-12 md:py-10 lg:px-20">
        <h2 className="font-display text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Résidence Ayadi
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Découvrez nos typologies d&apos;appartements et penthouse, conçus pour un art de vivre raffiné.
        </p>
      </header>

      <section
        data-lenis-prevent
        className="flex gap-4 overflow-x-auto px-4 pb-16 snap-x snap-mandatory scrollbar-hide [-webkit-overflow-scrolling:touch] md:hidden"
      >
        {residences.map((residence) => (
          <article key={residence.id} className="w-[82vw] max-w-[320px] shrink-0 snap-center">
            <ResidenceCard residence={residence} />
          </article>
        ))}
      </section>

      <section className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20 pb-24">
        {residences.map((residence) => (
          <ResidenceCard key={residence.id} residence={residence} />
        ))}
      </section>
    </section>
  );
}
