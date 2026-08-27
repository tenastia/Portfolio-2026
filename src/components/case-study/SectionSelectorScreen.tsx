"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Geometry measured off the Figma frames, which the exports reproduce at
 * exactly 2× — the phone screen is 350 × 562 design units and the modal
 * 300 × 397.687 sitting inside it. Boxes are written as percentages of their
 * parent so the overlay stays registered at any width; type and detail are
 * `cqw` against the nearest container, so the chip's padding scales with the
 * screen and the cards' with the modal.
 */
const SCREEN_ASPECT = "350 / 562";

/** A design unit as `cqw` of the screen, and of the modal. */
const onScreen = (u: number) => `${((u * 100) / 350).toFixed(4)}cqw`;
const inModal = (u: number) => `${((u * 100) / 300).toFixed(4)}cqw`;

/** The empty slot in the screen export where the sections chip belongs. */
const CHIP = { left: "23.2409%", top: "25.1744%" };
const MODAL = {
  left: "7.1429%",
  top: "14.5810%",
  width: "85.7143%",
  height: "70.7629%",
};
/** The modal's carousel window — the export leaves it empty. */
const CARDS = {
  left: "4.4693%",
  top: "28.3567%",
  width: "91.0613%",
  height: "49.7288%",
};
/** Start Practice, drawn in the export; this box only carries the press. */
const START = {
  left: "20.6703%",
  top: "86.9359%",
  width: "58.6593%",
  height: "7.5855%",
};

/** The carousel, in order. `n` is the section's number; "All" has none. */
const SECTIONS = [
  { n: null, label: "All" },
  { n: 1, label: "Section 1" },
  { n: 2, label: "Section 2" },
  { n: 3, label: "Section 3" },
  { n: 4, label: "Section 4" },
  { n: 5, label: "Section 5" },
];

/** Sections already chosen, in the order they were picked. */
const PICKED = [2, 4, 5];
/**
 * The one this sequence adds. It is the first section in the carousel, but it
 * is picked last — so it joins the end of the list rather than sorting itself
 * into numeric order, which is the whole point of the selector.
 */
const ADDED = 1;

/** How long each beat holds, in milliseconds. */
const BEATS = [1500, 320, 900, 1400, 420, 2600];
const TAP_CHIP = 1;
const OPEN = 2;
const TAP_CARD = 3;
const TAP_START = 4;
const SETTLED = 5;

const EASE = [0.22, 1, 0.36, 1] as const;

/** A press, the way a tap reads on a device: down, and straight back up. */
const tap = (active: boolean) => (active ? { scale: [1, 0.94, 1] } : { scale: 1 });
const TAP_TIMING = { duration: 0.26, ease: "easeOut" as const };

function Pencil() {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: onScreen(9.577), height: onScreen(9.11) }}
    >
      <path d="M7.1 0.9 9.1 2.9 3.4 8.6 0.9 9.1 1.4 6.6Z" />
      <path d="M5.8 2.2 7.8 4.2" />
    </svg>
  );
}

interface SectionSelectorScreenProps {
  /** The practice screen with the sections chip left out of its row. */
  screen: string;
  /** The selector modal with its carousel left empty. */
  modal: string;
  /** Section thumbnails, one per entry in `SECTIONS`, in that order. */
  cards: string[];
  label: string;
  className?: string;
}

/**
 * The practice screen opening its section selector: the chip, the carousel's
 * selectors and the modal's entrance are real markup over two static exports,
 * so the sequence plays as one continuous interaction rather than a set of
 * screenshots dissolving into each other.
 *
 * It runs the case the copy beside it makes. A long piece is already being
 * practised in sections 2, 4 and 5; the reader watches a fourth go in, and the
 * chip comes back reading `2, 4, 5, 1` — the new section last, because the
 * list is the order they were chosen, not the order they appear in the score.
 *
 * The cycle runs only while the screen is in view and restarts when the reader
 * comes back to it; under a reduced-motion preference it holds the settled
 * state, which is the one the annotation describes.
 */
export default function SectionSelectorScreen({
  screen,
  modal,
  cards,
  label,
  className,
}: SectionSelectorScreenProps) {
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
      () => setStep((s) => (s + 1) % BEATS.length),
      BEATS[step],
    );
    return () => clearTimeout(id);
  }, [inView, reduceMotion, step]);

  const at = reduceMotion ? SETTLED : step;
  const picks = at >= TAP_CARD ? [...PICKED, ADDED] : PICKED;
  const modalOpen = at >= OPEN && at < SETTLED;

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

      {/* The chip grows as the fourth number joins it, so the change reads as
          the list extending rather than a new chip appearing. */}
      <motion.div
        className="absolute flex items-center justify-center whitespace-nowrap rounded-[var(--r)] bg-[#292929] font-sans text-white"
        style={
          {
            ...CHIP,
            "--r": onScreen(5.224),
            height: onScreen(24.378),
            paddingInline: onScreen(10.448),
            gap: onScreen(8.706),
            fontSize: onScreen(13.93),
            lineHeight: onScreen(17.413),
          } as React.CSSProperties
        }
        animate={tap(at === TAP_CHIP)}
        transition={TAP_TIMING}
      >
        <motion.span layout="position" transition={{ duration: 0.3, ease: EASE }}>
          {picks.join(", ")}
        </motion.span>
        <Pencil />
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="scrim"
            className="absolute inset-0 bg-black/60"
            style={{ backdropFilter: "blur(0.7cqw)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // The scrim outlasts the modal on the way out, so the sheet has
            // cleared before the screen behind it comes back up — otherwise
            // the two read as a double exposure rather than a dismissal.
            exit={{ opacity: 0, transition: { duration: 0.34, ease: "easeOut" } }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal"
            className="absolute @container"
            style={MODAL}
            initial={{ opacity: 0, scale: 0.96, y: "2%" }}
            animate={{ opacity: 1, scale: 1, y: "0%" }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: "1.5%",
              transition: { duration: 0.19, ease: "easeIn" },
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modal}
              alt=""
              className="absolute inset-0 h-full w-full object-fill"
            />

            {/* The row overflows its window on the right, the way a carousel
                sits mid-scroll — the next card is cut, not hidden. */}
            <div className="absolute overflow-hidden" style={CARDS}>
              <div
                className="flex h-full items-start"
                style={{ gap: inModal(8.38) }}
              >
                {SECTIONS.map((section, i) => (
                  <SectionCard
                    key={section.label}
                    {...section}
                    card={cards[i]}
                    order={
                      section.n === null ? 0 : picks.indexOf(section.n) + 1
                    }
                    tapping={at === TAP_CARD && section.n === ADDED}
                  />
                ))}
              </div>
            </div>

            <motion.div
              className="absolute"
              style={{ ...START, borderRadius: inModal(6.704) }}
              animate={tap(at === TAP_START)}
              transition={TAP_TIMING}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SectionCardProps {
  card: string;
  label: string;
  /** Position in the picked list, 1-based; 0 when the section is unpicked. */
  order: number;
  tapping: boolean;
}

/**
 * One card in the carousel: the exported thumbnail, its name, and the selector
 * that carries the section's place in the running list. That number is what
 * the chip on the practice screen spells out, so a section picked fourth reads
 * "4" here and lands fourth there.
 */
function SectionCard({ card, label, order, tapping }: SectionCardProps) {
  const picked = order > 0;

  return (
    <div
      className="flex shrink-0 flex-col items-center"
      style={{ width: inModal(111.453), gap: inModal(10.056) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card}
        alt=""
        style={{ width: inModal(110.615), height: inModal(152.514) }}
      />
      <div
        className="flex flex-col items-center font-sans"
        style={{ gap: inModal(6.704) }}
      >
        <span
          className="text-white"
          style={{ fontSize: inModal(11.73), lineHeight: inModal(13.408) }}
        >
          {label}
        </span>
        <motion.span
          className="flex items-center justify-center rounded-full border border-white font-sans"
          style={{
            width: inModal(15.084),
            height: inModal(15.084),
            borderWidth: inModal(0.838),
            fontSize: inModal(11.73),
            lineHeight: inModal(13.408),
          }}
          animate={{
            backgroundColor: picked ? "#ffffff" : "rgba(255,255,255,0.3)",
            color: picked ? "#191919" : "rgba(0,0,0,0)",
            ...tap(tapping),
          }}
          transition={{
            backgroundColor: { duration: 0.22, ease: "easeOut" },
            color: { duration: 0.22, ease: "easeOut" },
            scale: TAP_TIMING,
          }}
        >
          {order || ""}
        </motion.span>
      </div>
    </div>
  );
}
