import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-paragraph items-center w-full max-w-[704px]">
      <div className="relative w-full aspect-[704/428] rounded-[14px] overflow-hidden border border-[rgba(248,249,250,0.2)] bg-[#1a1a1a]">
        {project.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>

      <div className="flex items-center justify-between w-full font-sans text-project-title tracking-[0.08em] uppercase leading-none gap-y-2 flex-wrap">
        <div className="flex items-center gap-[clamp(24px,15.086px+2.286vw,48px)] text-text">
          <span className="whitespace-nowrap">{project.title}</span>
          <span>{project.year}</span>
        </div>
        <div className="flex items-center gap-project-card text-button-secondary-active whitespace-nowrap">
          {project.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
