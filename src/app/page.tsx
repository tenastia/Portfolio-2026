"use client";

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
  "font-serif text-[2rem] leading-[2.2rem] md:text-[3.375rem] md:leading-[3.125rem] tracking-[0.02em] uppercase text-center text-text-muted";

export default function Home() {
  const { scheme } = useScheme();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main data-scheme={scheme} className="relative z-10 text-text">
      {/* Fixed header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-bg p-page">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5 shrink-0">
            <Headshot className="size-16" />
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-medium text-body-md leading-body-md lowercase text-text-muted">
                nastia ten
              </span>
              <span className="font-sans text-body-md leading-body-md text-text-highlight">
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
          <span className="hidden md:block whitespace-nowrap text-text-highlight text-body-sm leading-body-sm tracking-[0.01em]">
            built with claude in vancouver
          </span>
        </div>
      </footer>

      {/* Hero statement */}
      <section id="hero" className="min-h-dvh flex items-center justify-center px-page">
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
