"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface VideoBandProps {
  src: string;
  /** How much black sits between the footage and the copy, as a percentage. */
  dim?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * A full-bleed band with footage behind it and the copy laid over the top.
 *
 * The dim is what makes the type readable, so it is a real layer between the
 * two rather than an opacity on the video — the panel colour stays underneath
 * as the ground while the video loads, or if it never does.
 *
 * A looping backdrop is exactly the kind of motion a reduced-motion preference
 * means to stop, so the video is held on a frame instead of removed: the band
 * keeps its picture either way.
 */
export default function VideoBand({
  src,
  dim = 80,
  className = "",
  children,
}: VideoBandProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduceMotion) video.pause();
    else video.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <section
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-surface-panel px-page py-24 ${className}`}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0, 0, 0, ${dim / 100})` }}
      />
      <div className="relative flex w-full flex-col items-center">
        {children}
      </div>
    </section>
  );
}
