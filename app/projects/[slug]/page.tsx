import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="relative min-h-screen bg-black text-white overflow-hidden">
            <Link
                href="/projects"
                className="fixed left-6 top-6 z-30 text-sm text-white/80 hover:text-white transition"
            >
                ← Projets
            </Link>

            {/* Blurred background */}
            <video
                className="fixed inset-0 h-full w-full scale-125 object-cover blur-2xl opacity-50"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={project.videoSrc} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/55 z-0" />

            {/* Page layout */}
            <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr]">

                {/* Left content */}
                <div className="space-y-8">
                    <div className="space-y-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                            Projet immobilier
                        </p>

                        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="max-w-xl text-lg text-white/70 leading-8">
                            {project.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://wa.me/21627708029?text=${encodeURIComponent(project.whatsappMessage)}`}
                            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition"
                        >
                            Contact WhatsApp
                        </Link>

                        <Link
                            href={`https://wa.me/21627708029?text=${encodeURIComponent(
                                `Bonjour, je souhaite réserver une visite pour ${project.title}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
                        >
                            Book a visite
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                                Détails
                            </p>

                            <ul className="mt-5 space-y-3">
                                {project.details.map((detail) => (
                                    <li key={detail.label} className="flex justify-between gap-4 border-b border-white/10 pb-2 text-sm">
                                        <span className="text-white/60">{detail.label}</span>
                                        <span className="font-medium text-right">{detail.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                                Atouts
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.highlights.map((h) => (
                                    <span
                                        key={h}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs"
                                    >
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right video */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-white/15 bg-black/30 p-3 shadow-2xl backdrop-blur-xl">
                        <video
                            className="h-auto w-full rounded-[1.5rem] object-contain"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={project.videoSrc} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>
        </main>
    );
}
