"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface RailSection {
  /** Matches the `id` on the section element it scrolls to. */
  id: string;
  label: string;
}

interface StudyRailProps {
  title: string;
  year: string;
  sections: RailSection[];
  liveUrl?: string;
  /**
   * Darken the glass. The rail scrolls from over the hero onto the page, so a
   * study with a light hero needs a stronger scrim for the text to hold on
   * both.
   */
  scrim?: boolean;
}

const buttonClass =
  "flex items-center justify-center rounded-[6px] border px-4 py-2 backdrop-blur-[15px] transition-colors duration-300 hover:bg-text/[0.05]";

/**
 * The sticky index that rides alongside a case study — project name, year, and
 * the section list, with the reader's current section highlighted, over the
 * live-site and back-home buttons.
 *
 * Only shown once the viewport is wide enough to hold it beside the 880px
 * reading column; narrower screens get `CaseStudyNav`'s floating buttons.
 */
export default function StudyRail({
  title,
  year,
  sections,
  liveUrl,
  scrim = false,
}: StudyRailProps) {
  const surface = scrim
    ? "border-white/15 bg-black/60"
    : "border-card-border bg-surface-highlight-card";
  // The scrim panel is lighter than the page behind it, so the resting link
  // colour needs lifting to keep the same separation from the active one.
  const resting = scrim ? "text-white/50" : "text-text-highlight";
  const [activeId, setActiveId] = useState(sections[0]?.id);
  // Depend on the ids rather than the array, so an inline `sections` literal
  // does not tear down and rebuild the listener on every render.
  const sectionKey = sections.map(({ id }) => id).join("|");

  useEffect(() => {
    const ids = sectionKey.split("|");
    let frame = 0;

    // Highlight the last section whose top has passed the upper third of the
    // viewport. Read on scroll rather than via IntersectionObserver: the rail's
    // own anchor links jump the page, and a jump can skip an observer band
    // entirely without ever reporting a crossing.
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionKey]);

  return (
    <div className="pointer-events-none absolute inset-y-0 left-9 z-40 hidden xl:block">
      <div className="pointer-events-auto sticky top-0 flex flex-col items-start pt-9">
        <nav
          className={`flex flex-col gap-6 rounded-[8px] border p-6 backdrop-blur-[15px] ${surface}`}
        >
          <div className="flex flex-col uppercase">
            <span className="font-serif text-study-body leading-study-meta tracking-[0.02em] text-text-muted">
              {title}
            </span>
            <span
              className={`text-study-label leading-study-label tracking-[0.06em] ${resting}`}
            >
              {year}
            </span>
          </div>
          <ul className="flex w-[8.25rem] flex-col gap-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeId === id ? "true" : undefined}
                  className={`block text-study-label leading-study-label no-underline transition-colors duration-300 hover:text-text-muted ${
                    activeId === id ? "text-text-muted" : resting
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-[14px] pt-6">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} ${surface}`}
              aria-label="Visit live site"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon-web.svg" alt="" className="size-4" />
            </a>
          )}
          <Link
            href="/"
            className={`${buttonClass} ${surface}`}
            aria-label="Back to home"
          >
            <svg
              viewBox="0 0 13 13"
              aria-hidden
              className="size-[13px] stroke-text-muted"
              fill="none"
              strokeWidth="1"
            >
              <path d="M0.5 0.5 L12.5 12.5 M12.5 0.5 L0.5 12.5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
