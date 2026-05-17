"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";
import { projects } from "@/lib/projects";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <article className="group">
      <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-secondary">
        <FadeImage
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </figure>

      <header className="py-6">
        <div className="flex items-start justify-between gap-4">
          <span className="flex-1">
            <h3 className="text-lg font-medium leading-snug text-foreground">
              {project.title}
            </h3>
            <span className="mt-2 block text-sm text-muted-foreground">
              {project.subtitle}
            </span>
          </span>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          Voir le projet
        </Link>
      </header>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-background">
      {/* Header */}
      <header className="px-4 py-12 sm:px-6 md:px-12 md:py-10 lg:px-20">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
          Nos projets
        </p>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl">
          Une sélection d’espaces d’exception
        </h2>
      </header>

      {/* Mobile scroll */}
      <section
        data-lenis-prevent
        className="flex gap-4 overflow-x-auto px-4 pb-16 snap-x snap-mandatory scrollbar-hide md:hidden"
      >
        {projects.map((project) => (
          <article
            key={project.slug}
            className="w-[82vw] max-w-[320px] shrink-0 snap-center"
          >
            <ProjectCard project={project} />
          </article>
        ))}
      </section>

      {/* Desktop grid */}
      <section className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20 pb-24">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </section>
  );
}