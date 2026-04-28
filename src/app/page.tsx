"use client";

import { useState } from "react";
import NavButton from "@/components/NavButton";
import Eyes from "@/components/Eyes";
import SchemeButton from "@/components/SchemeButton";
import WorkOverlay from "@/components/WorkOverlay";
import { useScheme } from "@/components/SchemeProvider";

type Overlay = "work" | "lab" | "connect" | null;

export default function Home() {
  const { scheme } = useScheme();
  const [overlay, setOverlay] = useState<Overlay>(null);

  const toggle = (name: Exclude<Overlay, null>) => () =>
    setOverlay((prev) => (prev === name ? null : name));

  return (
    <main
      data-scheme={scheme}
      className="flex flex-col justify-between min-h-dvh bg-bg transition-colors duration-300"
    >
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
          <div className={`w-full md:w-[29.375rem] transition-opacity duration-300 ${overlay !== null ? "opacity-0 pointer-events-none" : ""}`}>
            <p className="text-body-md text-text leading-body-md tracking-[0.01em]">
              I design digital products and interfaces that balance brand with
              system clarity. My work moves between design systems and
              interactive experiences, guided by clarity, intention, and
              precision. An academic background in piano informs my approach to
              structure, systems thinking, and care for craft.
            </p>
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
      <section className="flex items-center justify-between px-page relative z-40 pointer-events-none">
        <div className="flex flex-col font-sans font-normal leading-body-md text-body-md tracking-[0.01em]">
          <span className="text-text">Nastia Ten</span>
          <span className="text-text-muted">UX/UI Designer</span>
        </div>
        <div className="flex flex-col items-end pointer-events-auto">
          <SchemeButton color="#121212" scheme="dark" />
          <SchemeButton color="#f8f9fA" scheme="light" />
        </div>
      </section>

      {/* Footer */}
      <footer className="p-page relative z-40 pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center text-text text-body-sm leading-body-sm tracking-[0.01em]">
            <span className="whitespace-nowrap">Status:</span>
            <span>on a look for a watermelon sorbet &#x1F367; |</span>
          </div>
          <div className="hidden md:block pointer-events-auto">
            <Eyes />
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <WorkOverlay isOpen={overlay === "work"} />
    </main>
  );
}
