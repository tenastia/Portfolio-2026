"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

interface WorkOverlayProps {
  isOpen: boolean;
}

const COPIES = 3;
const N = projects.length;

export default function WorkOverlay({ isOpen }: WorkOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAdjustingRef = useRef(false);

  const getCopyHeight = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[N] as HTMLElement | undefined;
    if (!first || !second) return 0;
    return second.offsetTop - first.offsetTop;
  };

  const centerScroll = () => {
    const scroller = scrollRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const middleFirst = track.children[N] as HTMLElement | undefined;
    if (!middleFirst) return;
    isAdjustingRef.current = true;
    scroller.scrollTop =
      middleFirst.offsetTop - (scroller.clientHeight - middleFirst.offsetHeight) / 2;
    requestAnimationFrame(() => {
      isAdjustingRef.current = false;
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    centerScroll();
  }, [isOpen]);

  const handleScroll = () => {
    if (isAdjustingRef.current) return;
    const scroller = scrollRef.current;
    if (!scroller) return;

    const copyHeight = getCopyHeight();
    if (copyHeight === 0) return;

    const top = scroller.scrollTop;
    const lowerBound = copyHeight * 0.5;
    const upperBound = copyHeight * 2.5;

    if (top < lowerBound) {
      isAdjustingRef.current = true;
      scroller.scrollTop = top + copyHeight;
      requestAnimationFrame(() => {
        isAdjustingRef.current = false;
      });
    } else if (top > upperBound) {
      isAdjustingRef.current = true;
      scroller.scrollTop = top - copyHeight;
      requestAnimationFrame(() => {
        isAdjustingRef.current = false;
      });
    }
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide overscroll-contain scroll-pt-[200px] scroll-pb-[100px]"
      >
        <div ref={trackRef} className="flex flex-col items-center py-[50vh]">
          {Array.from({ length: COPIES }).flatMap((_, copyIdx) =>
            projects.map((project) => (
              <div
                key={`${copyIdx}-${project.slug}`}
                className="snap-center flex justify-center w-full px-page-mobile md:px-page py-8"
              >
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
