"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

interface WorkOverlayProps {
  isOpen: boolean;
}

export default function WorkOverlay({ isOpen }: WorkOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Centre the first project each time the carousel opens.
  useEffect(() => {
    if (!isOpen) return;
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return;
    scroller.scrollTop =
      first.offsetTop - (scroller.clientHeight - first.offsetHeight) / 2;
  }, [isOpen]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`hidden md:flex flex-col fixed inset-0 z-50 transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      {/* Spacer matching the header height so the band sits between header and footer */}
      <div className="shrink-0 h-[6.5rem]" aria-hidden />
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-scroll snap-y snap-mandatory scrollbar-hide overscroll-contain"
      >
        <div ref={trackRef} className="flex flex-col items-center gap-[48px] py-[50vh]">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="snap-center flex justify-center w-full px-page"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
      {/* Spacer matching the footer height */}
      <div className="shrink-0 h-[6.5rem]" aria-hidden />
    </div>
  );
}
