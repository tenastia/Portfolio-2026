"use client";

import NavButton from "@/components/NavButton";
import Eyes from "@/components/Eyes";
import SchemeButton from "@/components/SchemeButton";
import { useScheme } from "@/components/SchemeProvider";

export default function Home() {
  const { scheme } = useScheme();

  return (
    <main
      data-scheme={scheme}
      className="flex flex-col justify-between min-h-dvh bg-bg transition-colors duration-300"
    >
      {/* Header */}
      <header className="p-page-mobile md:p-page">
        <div className="flex flex-wrap gap-y-6 md:gap-y-9 items-start justify-between">
          {/* Mobile: navbar first, then bio */}
          <div className="flex items-center justify-between w-full md:hidden">
            <nav className="flex gap-nav items-center">
              <NavButton label="work" />
              <NavButton label="lab" />
              <NavButton label="connect" />
            </nav>
            <Eyes />
          </div>

          {/* Bio */}
          <div className="w-full md:w-[470px]">
            <p className="text-sm md:text-body-md text-text leading-[1.6] md:leading-[28.8px] tracking-[0.18px]">
              I design digital products and interfaces that balance brand with
              system clarity. My work moves between design systems and
              interactive experiences, guided by clarity, intention, and
              precision. An academic background in piano informs my approach to
              structure, systems thinking, and care for craft.
            </p>
          </div>

          {/* Desktop navbar */}
          <nav className="hidden md:flex gap-nav items-center">
            <NavButton label="work" />
            <NavButton label="lab" />
            <NavButton label="connect" />
          </nav>
        </div>
      </header>

      {/* Middle Section */}
      <section className="flex items-center justify-between px-page-mobile md:px-page">
        <div className="flex flex-col font-sans font-normal leading-[28.8px] text-sm md:text-body-md tracking-[0.18px]">
          <span className="text-text">Nastia Ten</span>
          <span className="text-text-muted">UX/UI Designer</span>
        </div>
        <div className="flex flex-col items-end">
          <SchemeButton color="#121212" scheme="dark" />
          <SchemeButton color="#f8f9fA" scheme="light" />
        </div>
      </section>

      {/* Footer */}
      <footer className="p-page-mobile md:p-page">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center text-text text-xs md:text-body-sm leading-6 tracking-[0.15px]">
            <span className="whitespace-nowrap">Status:</span>
            <span>on a look for a watermelon sorbet &#x1F367; |</span>
          </div>
          <div className="hidden md:block">
            <Eyes />
          </div>
        </div>
      </footer>
    </main>
  );
}
