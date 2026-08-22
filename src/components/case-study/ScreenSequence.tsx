"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface SequenceFrame {
  src: string;
}

interface ScreenSequenceProps {
  /** States to cycle, in order. All frames must share a canvas size. */
  frames: SequenceFrame[];
  /** What the sequence shows, as one sentence — the frames are decorative. */
  label: string;
  /** CSS aspect-ratio of the frames, e.g. "1050 / 1635". */
  aspect: string;
  /** Milliseconds each frame holds before the next crosses in. */
  dwell?: number;
  className?: string;
}

/**
 * A screen that plays through its own states — a control being switched, a
 * value filling — by crossfading exported frames. Every frame is in the DOM
 * from the start so the first cycle never waits on a fetch, and only opacity
 * animates, so the browser can keep it on the compositor.
 *
 * The cycle runs only while the screen is on the reader's screen, and restarts
 * from the first state when they come back to it. Under a reduced-motion
 * preference it holds the last frame, which is the fullest state and the one
 * the surrounding copy is describing.
 */
export default function ScreenSequence({
  frames,
  label,
  aspect,
  dwell = 1600,
  className,
}: ScreenSequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || frames.length < 2) return;
    if (!inView) {
      setIndex(0);
      return;
    }
    const id = setInterval(
      () => setIndex((i) => (i + 1) % frames.length),
      dwell,
    );
    return () => clearInterval(id);
  }, [inView, reduceMotion, frames.length, dwell]);

  const active = reduceMotion ? frames.length - 1 : index;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`relative ${className || ""}`}
      style={{ aspectRatio: aspect }}
    >
      {frames.map((frame, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={frame.src}
          src={frame.src}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
