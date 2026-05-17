"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SectionLink } from "@/components/section-link";
import { site } from "@/lib/site";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const projectItems = [
    { href: "/projects/the-hills", label: "The Hills" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        isScrolled
          ? "top-0 left-0 right-0 w-full bg-background/30 backdrop-blur-md md:top-4 md:left-1/2 md:right-auto md:w-[92%] md:max-w-3xl md:-translate-x-1/2 md:rounded-full"
          : "top-0 left-0 right-0 w-full bg-background/30 backdrop-blur-md md:top-4 md:left-1/2 md:w-[92%] md:max-w-3xl md:-translate-x-1/2 md:rounded-full md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-2 md:pl-5 md:py-2">
        <SectionLink
          href="#hero"
          className="flex min-h-[44px] min-w-0 flex-col justify-center leading-none text-foreground"
          onNavigate={() => setIsMenuOpen(false)}
        >
          <Image src="/logo.png" alt="Résidence Ayadi" width={64} height={64} />
        </SectionLink>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {/* <SectionLink
            href="#technology"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            Savoir-faire
          </SectionLink> */}
          {/* <SectionLink
            href="#realisations"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            Réalisations
          </SectionLink> */}
          <SectionLink
            href="#projects"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            Projets
          </SectionLink>
          <SectionLink
            href="#gallery"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            Galerie
          </SectionLink>
          {/* <SectionLink
            href="#accessories"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            Résidences
          </SectionLink> */}
          <SectionLink
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            À propos
          </SectionLink>
        </nav>

        <div className="hidden items-center md:flex">
          <Link
            href={site.phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 whitespace-nowrap"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="bg-background px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden">
          <nav className="flex flex-col gap-1">
            {[
              { href: "#technology", label: "Savoir-faire" },
              { href: "#realisations", label: "Réalisations" },
              { href: "#gallery", label: "Galerie" },
              { href: "#accessories", label: "Résidences" },
              { href: "#about", label: "À propos" },
            ].map((item) => (
              <SectionLink
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3.5 text-base text-foreground active:bg-muted"
                onNavigate={() => setIsMenuOpen(false)}
              >
                {item.label}
              </SectionLink>
            ))}
            <div className="mt-4 rounded-3xl border border-border bg-muted/80 p-4">
              <p className="mb-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Projets
              </p>
              {projectItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-foreground transition hover:bg-background"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={site.phoneHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-[48px] items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {site.phone}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
