import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const href = project.externalUrl ?? `/project/${project.slug}`;
  const isExternal = !!project.externalUrl;

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="project-card group/card flex flex-col items-center pt-2 w-full rounded-[14px] bg-text/[0.02] hover:bg-text/[0.04] transition-colors duration-300"
    >
      {/* Image panel */}
      <div className="relative w-[calc(100%-1rem)] aspect-[668/440] rounded-[8px] overflow-hidden bg-[#f8f9fa]">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 w-full pt-5 pb-6 px-8">
        <div className="flex flex-col items-start">
          <span className="font-serif text-[1.375rem] leading-[1.5rem] tracking-[0.04em] uppercase text-text-muted">
            {project.title}
          </span>
          <span className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text-highlight">
            {project.chips.join(", ")}
          </span>
        </div>
        <span className="font-sans text-body-md leading-body-md tracking-[0.01em] text-right text-text-highlight">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
