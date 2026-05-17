import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="fixed left-6 top-6 z-20 text-sm text-black/80 hover:text-black transition"
      >
        ← Accueil
      </Link>
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Projets
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Nos réalisations immobilières
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Découvrez des projets pensés pour l’exigence du luxe contemporain et la qualité du détail.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-3xl border border-border bg-secondary p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Projet
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {project.subtitle}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 text-sm font-medium text-primary">
                <span>Voir le projet</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
