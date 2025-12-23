import { projects } from "@/lib/content/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found | Aelio" };
  return {
    title: `${project.title} | Aelio`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <article className="pt-40 pb-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#0A0A0A] mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Work
          </Link>

          <div className="mb-12">
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[1.05] mb-6 text-[#0A0A0A]">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-[#FAFAF8] rounded-full text-[#6B6B6B]"
                >
                  {tag}
                </span>
              ))}
              <span className="text-sm text-[#6B6B6B]">{project.year}</span>
            </div>
          </div>

          <div className="relative h-[60vh] rounded-xl overflow-hidden mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="text-sm uppercase tracking-wider text-[#6B6B6B] mb-4">
                Challenge
              </div>
              <p className="text-lg leading-relaxed text-[#0A0A0A]">
                {project.challenge}
              </p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-[#6B6B6B] mb-4">
                Solution
              </div>
              <p className="text-lg leading-relaxed text-[#0A0A0A]">
                {project.solution}
              </p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-[#6B6B6B] mb-4">
                Results
              </div>
              <div className="space-y-3">
                {project.results.map((result, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-[#FF5722]">
                      {result.value}
                    </div>
                    <div className="text-sm text-[#6B6B6B]">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {project.gallery.map((image, idx) => (
                <div key={idx} className="relative h-96 rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-[#0A0A0A]">
              Technology Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-4 py-2 bg-[#FAFAF8] rounded-lg text-[#6B6B6B]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#FF5722] text-white p-16 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Like What You See?</h2>
            <p className="text-xl opacity-90 mb-8">
              Let&apos;s build something amazing together.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-[#0A0A0A] rounded-lg font-medium hover:bg-[#FAFAF8] transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}


