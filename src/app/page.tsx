"use client";

import { useState, useRef, useEffect } from "react";
import NavButton from "@/components/NavButton";
import Eyes from "@/components/Eyes";
import Headshot from "@/components/Headshot";
import ProjectCard from "@/components/ProjectCard";
import ScrollProgress from "@/components/ScrollProgress";
import ContactButtons from "@/components/ContactButtons";
import TypewriterText from "@/components/TypewriterText";
import { useScheme } from "@/components/SchemeProvider";
import { projects } from "@/data/projects";

const NAV: { label: string; target: string }[] = [
  { label: "work", target: "projects" },
  { label: "about", target: "about" },
  { label: "connect", target: "contact" },
];

const BIO_PARAGRAPHS = [
  "I grew up in Moscow, where I became an artist and a musician. I earned a master's degree in academic piano and music theory, won and placed in international competitions, toured Europe with concerts, and spent more than twelve years teaching, drawn especially to how music education can serve children with ADHD. Twenty two years in music taught me to think in systems and to watch people closely, noticing how they learn and where they get stuck.",
  "When I was ready for something new, I studied illustration and published a children's book, then asked myself what I wanted to make next. Design became the place my artistic side and my interest in human behaviour finally met. I made that move alongside my move to Vancouver, where I took my first real steps in interactive design, building digital experiences for real estate developers.",
  "Away from the screen, my best ideas still arrive when I improvise at the piano. I have a cat named Mia who crossed the Atlantic with me and taught me how to lie on the bed, belly up, and enjoy doing nothing at all. On hard days I brew coffee and do yoga, because small slow things bring me back fastest. On good days I make things, from music to interactive experiences, and reach for something I have never tried before.",
];

export default function Home() {
  const { scheme } = useScheme();
  const projectsRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inProjects, setInProjects] = useState(true);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track scroll to drive the fixed side progress indicator.
  useEffect(() => {
    const onScroll = () => {
      const el = projectsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      setInProjects(rect.top < mid && rect.bottom > mid);
      const progress = (mid - rect.top) / rect.height;
      const total = projects.length;
      const idx = Math.min(total - 1, Math.max(0, Math.round(progress * (total - 1))));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main data-scheme={scheme} className="relative z-10 text-text">
      {/* Fixed header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-bg p-page">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5 shrink-0">
            <Headshot className="size-16" />
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-medium text-body-md leading-[1.25rem] lowercase text-text-muted">
                nastia ten
              </span>
              <span className="font-sans text-body-md leading-[1.25rem] text-text-highlight">
                product designer
              </span>
            </div>
          </div>
          <nav className="flex gap-nav items-center flex-wrap justify-end">
            {NAV.map(({ label, target }) => (
              <NavButton key={label} label={label} onClick={() => scrollToSection(target)} />
            ))}
          </nav>
        </div>
      </header>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 inset-x-0 z-50 bg-bg p-page">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1 items-center text-text-highlight text-body-sm leading-body-sm tracking-[0.01em]">
            <span className="whitespace-nowrap">status:</span>
            <TypewriterText />
          </div>
          <Eyes />
        </div>
      </footer>

      {/* Fixed side progress — visible while scrolling through projects */}
      <ScrollProgress active={active} total={projects.length} visible={inProjects} />

      {/* Scrolling content */}
      {/* landing hero — only the fixed header and footer show over the background */}
      <section id="hero" aria-hidden className="min-h-dvh" />

      {/* projects */}
      <section
        id="projects"
        ref={projectsRef}
        className="scroll-mt-[7rem] pt-[7rem] pb-[4rem]"
      >
        <div className="flex flex-col items-center gap-[64px] px-page lg:px-[100px]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* about */}
      <section
        id="about"
        className="scroll-mt-[7rem] min-h-dvh flex flex-col items-center justify-center gap-6 px-page py-[7rem]"
      >
        <div className="w-full max-w-[36.375rem] flex flex-col gap-4">
          <p className="font-sans text-body-md leading-body-md text-text-highlight">
            about me 👩🏻‍🎨 |
          </p>
          {BIO_PARAGRAPHS.map((paragraph, i) => (
            <p
              key={i}
              className="font-sans text-body-md leading-body-md tracking-[0.01em] text-justify text-text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* contact */}
      <section
        id="contact"
        className="scroll-mt-[7rem] min-h-dvh flex items-center justify-center px-page py-[7rem]"
      >
        <ContactButtons />
      </section>
    </main>
  );
}
