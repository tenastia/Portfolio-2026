"use client";

import { useState, useRef, useEffect } from "react";
import NavButton from "@/components/NavButton";
import Eyes from "@/components/Eyes";
import Headshot from "@/components/Headshot";
import SchemeButton from "@/components/SchemeButton";
import WorkOverlay from "@/components/WorkOverlay";
import ConnectOverlay from "@/components/ConnectOverlay";
import ProjectCard from "@/components/ProjectCard";
import TypewriterText from "@/components/TypewriterText";
import { useScheme } from "@/components/SchemeProvider";
import { projects } from "@/data/projects";

type Overlay = "work" | "lab" | "connect" | null;

export default function Home() {
  const { scheme } = useScheme();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const mobileWorkRef = useRef<HTMLDivElement>(null);

  const isActive = overlay !== null;

  const toggle = (name: Exclude<Overlay, null>) => () =>
    setOverlay((prev) => (prev === name ? null : name));

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    if (overlay === "work") {
      setTimeout(() => {
        mobileWorkRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [overlay]);

  return (
    <main
      data-scheme={scheme}
      className="flex flex-col bg-bg transition-colors duration-300"
    >
      {/* Homepage — full viewport height */}
      <div className="flex flex-col justify-between min-h-dvh">
        {/* Header */}
        <header className="p-page relative z-[60] pointer-events-none">
          <div className="flex flex-wrap gap-y-[2.25rem] items-start justify-between">
            {/* Mobile: navbar first, then bio */}
            <div className="flex items-center justify-between w-full md:hidden">
              <nav className="flex gap-nav items-center pointer-events-auto">
                <NavButton
                  label="work"
                  isActive={overlay === "work"}
                  onClick={toggle("work")}
                />
                <NavButton
                  label="lab"
                  isActive={overlay === "lab"}
                  onClick={toggle("lab")}
                />
                <NavButton
                  label="connect"
                  isActive={overlay === "connect"}
                  onClick={toggle("connect")}
                />
              </nav>
              <div className="pointer-events-auto">
                <Eyes />
              </div>
            </div>

            {/* Bio */}
            <div className="relative w-full md:w-[470px]">
              {/* Mobile bio — always visible */}
              <p className="text-body-md text-text leading-body-md tracking-[0.01em] md:hidden">
                Designing digital products and interfaces where brand meets
                system clarity. My work spans design systems, interactive
                experiences, and product design. An academic background in
                piano informs the rest — structure, systems thinking, and care
                for craft.
              </p>
              {/* Desktop bio — hides when overlay is active */}
              <p
                className={`text-body-md text-text leading-body-md tracking-[0.01em] transition-all duration-500 ease-out hidden md:block ${
                  isActive
                    ? "opacity-0 -translate-y-1 pointer-events-none"
                    : "opacity-100 translate-y-0"
                }`}
              >
                Designing digital products and interfaces where brand meets
                <br />
                system clarity. My work spans design systems, interactive
                <br />
                experiences, and product design. An academic background in
                <br />
                piano informs the rest — structure, systems thinking, and care
                <br />
                for craft.
              </p>
              {/* Headshot — desktop only */}
              <Headshot
                className={`hidden md:block md:absolute md:top-0 md:left-0 transition-all duration-500 ease-out ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"
                }`}
              />
            </div>

            {/* Desktop navbar */}
            <nav className="hidden md:flex gap-nav items-center pointer-events-auto">
              <NavButton
                label="work"
                isActive={overlay === "work"}
                onClick={toggle("work")}
              />
              <NavButton
                label="lab"
                isActive={overlay === "lab"}
                onClick={toggle("lab")}
              />
              <NavButton
                label="connect"
                isActive={overlay === "connect"}
                onClick={toggle("connect")}
              />
            </nav>
          </div>
        </header>

        {/* Middle Section */}
        <section className="flex items-center justify-between px-page relative z-[60] pointer-events-none">
          <div className="flex flex-col font-sans font-normal leading-body-md text-body-md tracking-[0.01em]">
            <span className="text-text">Nastia Ten</span>
            <span className="text-text-muted">Product Designer</span>
          </div>
          <div className="flex flex-col items-end pointer-events-auto">
            <SchemeButton color="#121212" scheme="dark" />
            <SchemeButton color="#f8f9fA" scheme="light" />
          </div>
        </section>

        {/* Footer */}
        <footer className="p-page relative z-[60] pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center text-text text-body-sm leading-body-sm tracking-[0.01em]">
              <span className="whitespace-nowrap">Status:</span>
              <TypewriterText />
            </div>
            <div className="hidden md:block pointer-events-auto">
              <Eyes />
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile work section — scrollable cards below homepage */}
      {overlay === "work" && (
        <div
          ref={mobileWorkRef}
          className="md:hidden flex flex-col gap-6 px-page pt-6 pb-page"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}

      {/* Overlays */}
      <WorkOverlay isOpen={overlay === "work"} />
      <ConnectOverlay isOpen={overlay === "connect"} />
    </main>
  );
}
