"use client";

import { useEffect, useState } from "react";
import NavButton from "@/components/NavButton";
import Headshot from "@/components/Headshot";
import ProjectCard from "@/components/ProjectCard";
import ContactButtons from "@/components/ContactButtons";
import PetalBio from "@/components/PetalBio";
import TypewriterText from "@/components/TypewriterText";
import LiveTime from "@/components/LiveTime";
import { useScheme } from "@/components/SchemeProvider";
import { projects } from "@/data/projects";

const NAV: { label: string; target: string }[] = [
  { label: "work", target: "projects" },
  { label: "about", target: "about" },
  { label: "lab", target: "lab" },
  { label: "connect", target: "contact" },
];

const BIO_PARAGRAPHS = [
  "I grew up in Moscow, where I became an artist and a musician. I earned a master's degree in academic piano and music theory, won and placed in international competitions, toured Europe with concerts, and spent more than twelve years teaching, drawn especially to how music education can serve children with ADHD. Twenty two years in music taught me to think in systems and to watch people closely, noticing how they learn and where they get stuck.",
  "When I was ready for something new, I studied illustration and published a children's book, then asked myself what I wanted to make next. Design became the place my artistic side and my interest in human behaviour finally met. I made that move alongside my move to Vancouver, where I took my first real steps in interactive design, building digital experiences for real estate developers.",
  "Away from the screen, my best ideas still arrive when I improvise at the piano. I have a cat named Mia who crossed the Atlantic with me and taught me how to lie on the bed, belly up, and enjoy doing nothing at all. On hard days I brew coffee and do yoga, because small slow things bring me back fastest. On good days I make things, from music to interactive experiences, and reach for something I have never tried before.",
];

// Shared Didone display headline styling
const DIDONE =
  "font-serif text-[2rem] leading-[2.2rem] md:text-[3.375rem] md:leading-[3.75rem] tracking-[0.02em] uppercase text-center text-text-muted";

export default function Home() {
  const { scheme } = useScheme();
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Highlight the nav button for whichever section is under the viewport middle.
  useEffect(() => {
    const ids = ["hero", "projects", "about", "contact"];
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // The bio and contact sections are anchored vertically centered in the
    // space between the fixed header and footer, so their content isn't
    // partially covered. Other targets align their top below the header.
    const centered = id === "about" || id === "contact";
    if (!centered) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
    const header = 7 * rem; // fixed header height
    const footer = 4.5 * rem; // fixed footer height
    const rect = el.getBoundingClientRect();
    const availableCenter = header + (window.innerHeight - header - footer) / 2;
    const target = window.scrollY + rect.top + rect.height / 2 - availableCenter;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <main data-scheme={scheme} className="relative z-10 text-text">
      {/* Fixed header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-bg p-page">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5 shrink-0">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="rounded-[36px] cursor-pointer transition-opacity duration-300 hover:opacity-80"
            >
              <Headshot className="size-16" />
            </button>
            <div className="flex flex-col">
              <span className="font-sans font-medium text-body-md leading-[1.125rem] lowercase text-text-muted">
                nastia ten
              </span>
              <span className="font-sans text-body-md leading-[1.125rem] text-text-highlight">
                product designer
              </span>
            </div>
          </div>
          <nav className="flex gap-nav items-center flex-wrap justify-end">
            {NAV.map(({ label, target }) => (
              <NavButton
                key={label}
                label={label}
                isActive={activeSection === target}
                onClick={() => scrollToSection(target)}
              />
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
          <span className="hidden md:block whitespace-nowrap text-text-highlight text-body-sm leading-body-sm tracking-[0.01em]">
            built with claude in vancouver
          </span>
        </div>
      </footer>

      {/* Hero statement — a touch under a full screen so the first project row
          peeks above the footer, hinting there's more to scroll to. */}
      <section id="hero" className="min-h-[calc(100dvh-11rem)] flex items-center justify-center px-page">
        <p className={`${DIDONE} max-w-[43.25rem]`}>
          i build digital products and interfaces where brand meets system clarity
        </p>
      </section>

      {/* Projects grid */}
      <section id="projects" className="scroll-mt-[7rem] px-page pt-[3rem] pb-[9rem]">
        <div className="mx-auto max-w-[87rem] grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-[7rem] min-h-dvh flex flex-col items-center justify-center gap-6 px-page py-[7rem]"
      >
        <div className="w-full max-w-[36.375rem] flex flex-col gap-4">
          <p className="font-sans text-body-md leading-body-md text-text-highlight">
            about me 👩🏻‍🎨 |
          </p>
          <PetalBio
            paragraphs={BIO_PARAGRAPHS}
            className="flex flex-col gap-4"
            paragraphClassName="font-sans text-body-md leading-body-md tracking-[0.01em] text-justify text-text-muted"
          />
        </div>
      </section>

      {/* Availability / contact */}
      <section
        id="contact"
        className="scroll-mt-[7rem] min-h-dvh flex flex-col items-center justify-center gap-12 px-page py-[7rem]"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 rounded-[6px] border border-text/[0.05] bg-text/[0.02] px-5 py-2">
            <span className="size-1.5 rounded-full bg-[#4ade80] shrink-0" aria-hidden />
            <span className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text-muted whitespace-nowrap">
              <LiveTime />
            </span>
          </div>
          <p className={`${DIDONE} max-w-[43.25rem]`}>
            open to local and global collaborations
          </p>
        </div>
        <ContactButtons />
      </section>
    </main>
  );
}
