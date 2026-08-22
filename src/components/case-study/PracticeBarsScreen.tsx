"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Geometry measured off the exported screen (1050 × 1635) and written as
 * percentages, so the overlay stays registered to the image at any width.
 * Positions inside the track are percentages of the track, not the screen.
 */
const SCREEN_ASPECT = "1050 / 1635";
const NOTATION = { left: "5.905%", top: "11.132%", width: "88.095%" };
const TRACK = {
  left: "13.714%",
  top: "52.355%",
  width: "72.571%",
  height: "6.116%",
};
const THUMB = { width: 18.11, height: 72, top: 14, left: [33.07, 56.3, 79.66] };
const LABEL_LEFT = 5.51;
const SEGMENT_CENTRE = [42.13, 65.35, 88.71];

const OPTIONS = ["One", "Two", "Three"];

/**
 * The control is reproducing an iOS UI inside a screen mock, not page furniture,
 * so it takes the platform's own interface face rather than the site's brand
 * type — that is what the surrounding pixels were rendered in.
 */
const UI_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

interface PracticeBarsScreenProps {
  /** The screen with the notation slot and the control row left empty. */
  screen: string;
  /** Notation cards, one per option, in order. */
  notation: string[];
  label: string;
  /** Milliseconds each option holds before the selection moves on. */
  dwell?: number;
  className?: string;
}

/**
 * The practice screen playing its own bar-context control: the selector is real
 * markup over a static screen export, so the thumb slides between segments
 * instead of one screenshot dissolving into another. Only the notation card
 * behind it swaps, and it is the same white card each time — what changes is
 * the music on it.
 *
 * The control leads and the notation follows by a beat, the way a real tap
 * reads. The cycle runs only while the screen is in view and restarts when the
 * reader comes back to it; under a reduced-motion preference it holds the last
 * option, the fullest state and the one the copy beside it describes.
 */
export default function PracticeBarsScreen({
  screen,
  notation,
  label,
  dwell = 1800,
  className,
}: PracticeBarsScreenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (!inView) {
      setIndex(0);
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % OPTIONS.length), dwell);
    return () => clearInterval(id);
  }, [inView, reduceMotion, dwell]);

  const active = reduceMotion ? OPTIONS.length - 1 : index;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`relative @container ${className || ""}`}
      style={{ aspectRatio: SCREEN_ASPECT }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={screen}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* The notation card is identical in every state — only the music on it
          changes — so a short fade reads as the staff redrawing. */}
      <div className="absolute" style={NOTATION}>
        {notation.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            className={`w-full transition-opacity duration-200 ease-out ${
              i === 0 ? "relative" : "absolute inset-0"
            } ${i === active ? "opacity-100 delay-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Type scales with the screen, so every metric below can stay relative. */}
      <div
        className="absolute rounded-[0.55em] bg-[#292929] text-[3.35cqw] leading-none"
        style={{ ...TRACK, fontFamily: UI_FONT }}
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-white-100"
          style={{ left: `${LABEL_LEFT}%` }}
        >
          {"Show\u00a0\u00a0Bars:"}
        </span>

        <motion.span
          className="absolute rounded-[0.64em] bg-white"
          style={{
            width: `${THUMB.width}%`,
            height: `${THUMB.height}%`,
            top: `${THUMB.top}%`,
          }}
          initial={false}
          animate={{ left: `${THUMB.left[active]}%` }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
          }
        />

        {OPTIONS.map((option, i) => (
          <span
            key={option}
            // Every option keeps the same grey, on the thumb as well as off it
            // — in the design the moving thumb is the whole signal.
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[#858585]"
            style={{ left: `${SEGMENT_CENTRE[i]}%` }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}
