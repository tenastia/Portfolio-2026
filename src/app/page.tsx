"use client";

import { useState, useRef, useEffect } from "react";
import NavButton from "@/components/NavButton";
import Eyes from "@/components/Eyes";
import Headshot from "@/components/Headshot";
import WorkOverlay from "@/components/WorkOverlay";
import ConnectOverlay from "@/components/ConnectOverlay";
import AboutOverlay from "@/components/AboutOverlay";
import LabOverlay from "@/components/LabOverlay";
import ProjectCard from "@/components/ProjectCard";
import TypewriterText from "@/components/TypewriterText";
import { useScheme } from "@/components/SchemeProvider";
import { useJellyfish } from "@/components/JellyfishProvider";
import { projects } from "@/data/projects";

type Overlay = "work" | "about" | "lab" | "connect" | null;

export default function Home() {
  const { scheme } = useScheme();
  const { setBlurred } = useJellyfish();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const mobileWorkRef = useRef<HTMLDivElement>(null);

  const toggle = (name: Exclude<Overlay, null>) => () =>
    setOverlay((prev) => (prev === name ? null : name));

  useEffect(() => {
    setBlurred(overlay !== null);
  }, [overlay, setBlurred]);

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
      <div className="flex flex-col min-h-dvh">

        {/* Header — headshot + name/title left, nav right */}
        <header className="p-page relative z-[60] pointer-events-none">
          <div className="flex items-start justify-between">
            {/* Left: headshot + name/title (always visible on all breakpoints) */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <Headshot className="size-12 shrink-0" />
              <div className="flex flex-col">
                <span className="font-sans text-body-md leading-body-md text-text">
                  nastia ten
                </span>
                <span className="font-sans text-body-md leading-body-md text-text-muted">
                  product designer
                </span>
              </div>
            </div>

            {/* Right: nav (desktop only) */}
            <nav className="hidden md:flex gap-nav items-center pointer-events-auto">
              <NavButton
                label="work"
                isActive={overlay === "work"}
                onClick={toggle("work")}
              />
              <NavButton
                label="about"
                isActive={overlay === "about"}
                onClick={toggle("about")}
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

        {/* Spacer — jellyfish animation shows through the transparent page */}
        <div className="flex-1" />

        {/* Mobile nav — sits below the jellyfish area, above the bio text */}
        <nav className="md:hidden flex gap-nav items-center flex-wrap px-page pb-4 relative z-[60] pointer-events-auto">
          <NavButton
            label="work"
            isActive={overlay === "work"}
            onClick={toggle("work")}
          />
          <NavButton
            label="about"
            isActive={overlay === "about"}
            onClick={toggle("about")}
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

        {/* Bio display text — large uppercase justified */}
        <section className="px-page pb-6 relative z-[10] pointer-events-none">
          <p className="font-sans text-h1 uppercase tracking-[0.08em] leading-[1.1] text-justify text-text">
            Designing digital products and interfaces where brand meets system
            clarity. My work spans{" "}
            <span className="text-text-muted">
              design systems, interactive experiences, and product design.
            </span>{" "}
            An academic background in piano informs the rest — structure,
            systems thinking, and care for craft.
          </p>
        </section>

        {/* Footer */}
        <footer className="p-page relative z-[60] pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center text-text text-body-sm leading-body-sm tracking-[0.01em]">
              <span className="whitespace-nowrap">Status:</span>
              <TypewriterText />
            </div>
            <div className="pointer-events-auto">
              <Eyes />
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile work section — scrollable cards below homepage */}
      {overlay === "work" && (
        <div
          ref={mobileWorkRef}
          className="md:hidden relative z-10 flex flex-col gap-[36px] px-page pt-6 pb-page"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}

      {/* Overlays */}
      <WorkOverlay isOpen={overlay === "work"} />
      <AboutOverlay isOpen={overlay === "about"} />
      <LabOverlay isOpen={overlay === "lab"} />
      <ConnectOverlay isOpen={overlay === "connect"} />
    </main>
  );
}
