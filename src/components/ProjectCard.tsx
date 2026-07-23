import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const FLOAT = [
  { dur: "3.2s", delay: "0s" },
  { dur: "2.8s", delay: "0.3s" },
  { dur: "3.6s", delay: "0.15s" },
  { dur: "3.0s", delay: "0.5s" },
  { dur: "2.6s", delay: "0.2s" },
];

const floatStyle = (i: number) =>
  ({
    "--float-dur": FLOAT[i % FLOAT.length].dur,
    "--float-delay": FLOAT[i % FLOAT.length].delay,
  }) as React.CSSProperties;

export default function ProjectCard({ project }: ProjectCardProps) {
  const href = project.externalUrl ?? `/project/${project.slug}`;
  const isExternal = !!project.externalUrl;

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="project-card group/card flex flex-col gap-2 items-center w-full max-w-[42.75rem] snap-start scroll-mt-[7rem]"
    >
      <div className="relative w-full aspect-[684/418] rounded-[14px] p-px overflow-hidden">
        {/* Rotating glow border — revealed on hover */}
        <span
          className="card-glow-ring opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          aria-hidden
        />
        {/* Default static border — fades out on hover */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[14px] border border-[rgba(248,249,250,0.05)] group-hover/card:opacity-0 transition-opacity duration-500"
          aria-hidden
        />
        <div className="relative z-10 w-full h-full rounded-[13px] overflow-hidden bg-[#1a1a1a]">
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
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full font-sans text-[0.75rem] tracking-[0.06em] uppercase leading-[1.25rem] gap-x-4 gap-y-2 text-text-muted">
        <div className="flex items-center justify-between w-full sm:w-[13.5rem] shrink-0">
          <span className="card-float whitespace-nowrap" style={floatStyle(0)}>
            {project.title}
          </span>
          <span className="card-float text-right" style={floatStyle(1)}>
            {project.year}
          </span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-start gap-x-4 gap-y-1 sm:justify-end">
          {project.chips.map((chip, i) => (
            <span key={chip} className="card-float whitespace-nowrap" style={floatStyle(i + 2)}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
