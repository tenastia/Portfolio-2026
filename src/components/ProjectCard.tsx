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
      className="flex flex-col gap-2 items-center w-full max-w-[48.125rem]"
    >
      <div className="relative w-full aspect-[770/471] rounded-[14px] overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a]">
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

      <div className="flex items-start justify-between w-full font-sans text-project-title tracking-[0.06em] uppercase leading-[1.25rem] gap-x-4 gap-y-2 flex-wrap text-text-muted">
        <div className="flex items-center justify-between w-[13.5rem] shrink-0">
          <span className="whitespace-nowrap">{project.title}</span>
          <span className="text-right">{project.year}</span>
        </div>
        <div className="flex items-start gap-4 whitespace-nowrap">
          {project.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
