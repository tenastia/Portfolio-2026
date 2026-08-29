"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Geometry as percentages of the scene's width, measured off the composition,
 * so every part keeps its place at any size. The stage is a little taller than
 * the artwork needs: the labels are clamped rather than purely proportional, so
 * the room they take is not a fixed share of the width, and at 429 / 277 they
 * finished 5px outside the box.
 */
const STAGE = "429 / 288";
/** Where each cube's column is centred. */
const COL = [14.2, 50, 85.8];
const CUBE = 28.6;
const CUBE_TOP = 26.1;
const HEAD = 14.4;
const HEAD_TOP = 7.2;
const LABEL_TOP = 61.3;

const SECTIONS = [
  { src: "/projects/performory/cube-I.png", label: "Exposition" },
  { src: "/projects/performory/cube-II.png", label: "Development" },
  { src: "/projects/performory/cube-III.png", label: "Recapitulation" },
];

/** Working through the piece: slow, and settling as it arrives. */
const FORWARD = { duration: 1.7, ease: [0.4, 0, 0.2, 1] } as const;
/** Giving up: eased away from the mistake and eased down at the start again. */
const BACK = { duration: 0.65, ease: [0.65, 0, 0.35, 1] } as const;

/**
 * The run-through, one beat at a time. `at` is the cube the character is over,
 * `lost` whether it has forgotten where it was going, and `move` how it gets
 * there — only meaningful on the two beats that change `at`, since the rest
 * stay put.
 *
 * A beat has to outlast its own arrival, or the next thing happens before the
 * character is there: at 1.7s forward, the second beat has to hold longer than
 * that for him to reach the development before losing his place.
 *
 * He only ever reaches the second cube. That is the finding the copy beside it
 * describes: a slip sends you back to the beginning, so the last section of the
 * piece stays untouched — which is why the third cube is never visited.
 */
const RUN = [
  { at: 0, lost: false, ms: 1400, move: BACK },
  { at: 1, lost: false, ms: 2400, move: FORWARD },
  { at: 1, lost: true, ms: 1700, move: FORWARD },
  { at: 0, lost: true, ms: 900, move: BACK },
  { at: 0, lost: false, ms: 1100, move: BACK },
];
/** The beat the scene holds when motion is not wanted: the moment it describes. */
const STILL = 2;

interface GamePlanSceneProps {
  className?: string;
}

/**
 * Three sections of a sonata as three cubes, with the player drifting over
 * them. He gets as far as the development, loses his place, and goes back to
 * the start — around and around, never reaching the recapitulation.
 *
 * The cubes breathe on their own staggered timers so the row never pulses in
 * unison; the character carries a slower bob of his own, kept on a separate
 * element from the one that moves him along, so the two never fight.
 */
export default function GamePlanScene({ className = "" }: GamePlanSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (!inView) {
      setStep(0);
      return;
    }
    const id = setTimeout(
      () => setStep((s) => (s + 1) % RUN.length),
      RUN[step].ms,
    );
    return () => clearTimeout(id);
  }, [inView, reduceMotion, step]);

  const beat = RUN[reduceMotion ? STILL : step];
  const floating = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Three cubes for the sections of a sonata — exposition, development and recapitulation. A player drifts from the first to the second, loses his place, and goes back to the beginning, never reaching the third."
      className={`relative w-full @container ${className}`}
      style={{ aspectRatio: STAGE }}
    >
      {SECTIONS.map((section, i) => (
        <div
          key={section.label}
          className="absolute -translate-x-1/2"
          style={{
            left: `${COL[i]}cqw`,
            top: `${CUBE_TOP}cqw`,
            width: `${CUBE}cqw`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={section.src}
            alt=""
            className="w-full"
            animate={floating ? { y: ["0%", "-5%", "0%"] } : { y: "0%" }}
            transition={
              floating
                ? {
                    duration: 3.4,
                    // Offset so the three never rise together.
                    delay: i * 0.55,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        </div>
      ))}

      {SECTIONS.map((section, i) => (
        <span
          key={section.label}
          className="absolute -translate-x-1/2 whitespace-nowrap font-sans text-text-muted"
          style={{
            left: `${COL[i]}cqw`,
            top: `${LABEL_TOP}cqw`,
            fontSize: "clamp(0.6875rem, 3.3cqw, 0.875rem)",
          }}
        >
          {section.label}
        </span>
      ))}

      <motion.div
        className="absolute"
        style={{ left: 0, top: `${HEAD_TOP}cqw`, width: `${HEAD}cqw` }}
        initial={{ x: `${COL[beat.at]}cqw` }}
        animate={{ x: `${COL[beat.at]}cqw` }}
        transition={beat.move}
      >
        <div className="-translate-x-1/2">
          <motion.div
            className="relative"
            animate={floating ? { y: ["0%", "-7%", "0%"] } : { y: "0%" }}
            transition={
              floating
                ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <AnimatePresence>
              {beat.lost && (
                <motion.span
                  key="?"
                  aria-hidden
                  className="absolute left-1/2 font-sans leading-none text-text-muted"
                  style={{ bottom: "104%", fontSize: "5.5cqw" }}
                  initial={{ opacity: 0, y: "40%", scale: 0.6, x: "-50%" }}
                  animate={{ opacity: 1, y: "0%", scale: 1, x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.7, x: "-50%" }}
                  transition={{ duration: 0.28, ease: "backOut" }}
                >
                  ?
                </motion.span>
              )}
            </AnimatePresence>

            {/* Both faces are stacked and cross-faded rather than swapped, so
                the head never blinks out between expressions. */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/performory/character-original.png"
                alt=""
                className="w-full"
              />
              <motion.img
                src="/projects/performory/character-surprised.png"
                alt=""
                className="absolute inset-0 w-full"
                initial={false}
                animate={{ opacity: beat.lost ? 1 : 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
