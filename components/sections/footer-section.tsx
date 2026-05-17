"use client";

import Link from "next/link";
import { SectionLink } from "@/components/section-link";
import { site } from "@/lib/site";
import Image from "next/image";

const footerLinks = {
  explore: [
    // { label: "Réalisations", href: "#realisations" },
    { label: "Savoir-faire", href: "#technology" },
    { label: "Galerie", href: "#gallery" },
    // { label: "Résidences", href: "#accessories" },
  ],
  about: [
    // { label: "À propos", href: "#about" },
    { label: "Notre histoire", href: "#about" },
    { label: "Contact", href: site.phoneHref },
    { label: "Instagram", href: site.instagram },
  ],
  service: [
    { label: "Visite", href: site.phoneHref },
    // { label: "Réservation", href: site.phoneHref },
    // { label: "Brochure", href: site.phoneHref },
    // { label: "FAQ", href: site.phoneHref },
  ],
};

export function FooterSection() {
  return (
    <footer id="reserve" className="bg-background border-t border-border">
      <section className="grid grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-4 md:px-12 md:py-20 lg:grid-cols-5 lg:px-20">
        <article className="sm:col-span-2 md:col-span-1 lg:col-span-2">
          <SectionLink href="#hero" className="font-display text-xl font-semibold text-foreground">
            <Image src="/logo.png" alt="Résidence Ayadi" width={64} height={64} />
          </SectionLink>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. Promoteur immobilier en {site.location}, spécialisé dans les résidences haut standing.
          </p>
          <Link
            href={site.phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-lg font-medium text-primary hover:opacity-90"
          >
            {site.phone}
          </Link>
        </article>

        <nav>
          <h4 className="mb-4 text-sm font-medium text-foreground">Découvrir</h4>
          <ul className="space-y-3">
            {footerLinks.explore.map((link) => (
              <li key={link.label}>
                <SectionLink
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <h4 className="mb-4 text-sm font-medium text-foreground">À propos</h4>
          <ul className="space-y-3">
            {footerLinks.about.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("#") ? (
                  <SectionLink
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </SectionLink>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <h4 className="mb-4 text-sm font-medium text-foreground">Services</h4>
          <ul className="space-y-3">
            {footerLinks.service.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("http") ? (
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="flex flex-col items-center justify-between gap-4 border-t border-border px-4 py-6 text-center sm:px-6 md:flex-row md:text-left md:px-12 lg:px-20">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Tous droits réservés.
        </p>
        <p className="flex items-center gap-4">
          <Link
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {site.instagramHandle}
          </Link>
          <Link
            href={site.phoneHref}
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Appeler
          </Link>
        </p>
      </section>
    </footer>
  );
}
