import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-2 md:gap-4 items-center w-full max-w-[620px]">
      <div className="relative w-full aspect-[756/534] rounded-[14px] overflow-hidden border border-[rgba(248,249,250,0.2)] bg-[#1a1a1a]">
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

      <div className="flex items-center justify-between w-full font-sans text-[10px] md:text-[13px] tracking-[0.8px] md:tracking-[1.04px] uppercase leading-none gap-y-2 flex-wrap">
        <div className="flex items-center gap-6 md:gap-12 text-text">
          <span className="whitespace-nowrap">{project.title}</span>
          <span>{project.year}</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-button-secondary-active whitespace-nowrap">
          {project.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
