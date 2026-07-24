"use client";

import { useState, useRef, useEffect } from "react";
import NavButton from "@/components/NavButton";
import Headshot from "@/components/Headshot";
import ProjectCard from "@/components/ProjectCard";
import ScrollProgress from "@/components/ScrollProgress";
import ContactButtons from "@/components/ContactButtons";
import PetalBio from "@/components/PetalBio";
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
      // Activate the bar whose card center is closest to the viewport center.
      const cards = el.querySelectorAll<HTMLElement>(".project-card");
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Step the projects carousel one card per scroll gesture (mouse/trackpad).
  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return; // touch keeps native scrolling + CSS snap

    const headerOffset = () =>
      7 * parseFloat(getComputedStyle(document.documentElement).fontSize || "16");

    // Are the projects the section currently filling the viewport?
    const inCarousel = () => {
      const r = section.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      return r.top < mid && r.bottom > mid;
    };

    let locked = false;
    let unlockTimer = 0;
    let unlockAt = 0;
    // Keep the lock alive until the wheel goes quiet (never shorten it), so a
    // single continuous gesture — however long or forceful — advances only one
    // card instead of overrunning into the next.
    const armUnlock = (ms: number) => {
      const at = performance.now() + ms;
      if (at <= unlockAt) return;
      unlockAt = at;
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
        unlockAt = 0;
      }, at - performance.now());
    };

    const onWheel = (e: WheelEvent) => {
      if (!inCarousel()) return; // let the hero/about/contact scroll freely
      if (locked) {
        e.preventDefault(); // swallow momentum → resistance
        armUnlock(250); // ...and stay locked until it stops arriving
        return;
      }
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir) return;

      const cards = Array.from(section.querySelectorAll<HTMLElement>(".project-card"));
      const offset = headerOffset();
      const sy = window.scrollY;
      // The scroll position at which each card is snapped to the top.
      const snapY = cards.map((c) => sy + c.getBoundingClientRect().top - offset);

      let target = -1;
      if (dir > 0) {
        for (let i = 0; i < snapY.length; i++)
          if (snapY[i] > sy + 4) {
            target = i;
            break;
          }
      } else {
        for (let i = snapY.length - 1; i >= 0; i--)
          if (snapY[i] < sy - 4) {
            target = i;
            break;
          }
      }
      // No card in that direction → release to scroll out of the carousel.
      if (target < 0) return;

      e.preventDefault();
      locked = true;
      window.scrollTo({ top: snapY[target], behavior: "smooth" });
      armUnlock(500); // base lock covers the smooth scroll for discrete clicks
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.clearTimeout(unlockTimer);
      window.removeEventListener("wheel", onWheel);
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
          <span className="hidden md:block whitespace-nowrap text-text-highlight text-body-sm leading-body-sm tracking-[0.01em]">
            built with claude in vancouver
          </span>
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
          <PetalBio
            paragraphs={BIO_PARAGRAPHS}
            className="flex flex-col gap-4"
            paragraphClassName="font-sans text-body-md leading-body-md tracking-[0.01em] text-justify text-text-muted"
          />
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
