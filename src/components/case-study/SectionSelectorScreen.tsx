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

/** Sections already chosen before the sequence starts, in pick order. */
const PICKED = [1, 2];
/**
 * The ones this sequence adds, in the order it picks them. They sit at the far
 * end of the carousel, so reaching them is part of what the panel shows.
 */
const ADDED = [4, 5];

/** The carousel's own metrics, in design units. */
const COLUMN = 111.453;
const GAP = 8.38;
const CARD_W = 110.615;
const CARD_H = 152.514;
/** The window the row scrolls inside — `CARDS.width` as an absolute. */
const WINDOW_W = 273.184;
const ROW_W = SECTIONS.length * COLUMN + (SECTIONS.length - 1) * GAP;

/**
 * How far the row travels to bring the last sections into the window.
 * Container-relative rather than a percentage: a percentage `x` resolves
 * against the row's own box, which the overflow container has already clamped
 * to the window's width, so it would stop short of the end.
 */
const SCROLL_TO_END = inModal(-(ROW_W - WINDOW_W));

/** How long each beat holds, in milliseconds. */
const BEATS = [1300, 320, 800, 850, 850, 1000, 400, 2400];
const TAP_CHIP = 1;
const OPEN = 2;
const SCROLL = 3;
/** One beat per section added, from here on. */
const TAP_FIRST = 4;
const TAP_START = TAP_FIRST + ADDED.length;
const SETTLED = TAP_START + 1;

const EASE = [0.22, 1, 0.36, 1] as const;

/** A press, the way a tap reads on a device: down, and straight back up. */
const tap = (active: boolean) => (active ? { scale: [1, 0.94, 1] } : { scale: 1 });
const TAP_TIMING = { duration: 0.26, ease: "easeOut" as const };

/**
 * The chip's edit glyph, drawn to the Figma vector's 10.27 × 9.77 box: a pencil
 * lying at 46°, its ferrule marked off near the top, over a short rule at the
 * lower right. Inline rather than exported because the asset host is
 * unreachable from here — see ASSETS.md.
 */
function Pencil() {
  return (
    <svg
      viewBox="0 0 10.27 9.77"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: onScreen(10.27), height: onScreen(9.77) }}
    >
      <g transform="translate(4.6 4.88) rotate(-48)">
        {/* Squared at the ferrule, tapering to the point — a pencil, not a bar. */}
        <path d="M4.4-1.28H-3.6L-4.7 0l1.1 1.28H4.4Z" />
        <path d="M2.4-1.28V1.28" />
      </g>
      <path d="M5.2 9.3H9.85" />
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
 * practised in sections 1 and 2; the carousel runs out to the far end of the
 * piece, two more sections go in, and the chip comes back reading
 * `1, 2, 4, 5` — the list is the order they were chosen, and each selector
 * carries the same running number the chip spells out.
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
  // One section goes in per beat from TAP_FIRST, so the count of added ones is
  // just how far past that beat we are.
  const taken = Math.min(Math.max(at - TAP_FIRST + 1, 0), ADDED.length);
  const picks = [...PICKED, ...ADDED.slice(0, taken)];
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

            {/* The row is wider than its window, so the far sections have to be
                scrolled to — reaching them is part of what the panel shows. A
                card is cut at the edge rather than hidden, the way a carousel
                mid-scroll says there is more either side. */}
            <div className="absolute overflow-hidden" style={CARDS}>
              <motion.div
                className="flex h-full items-start"
                style={{ gap: inModal(GAP) }}
                initial={{ x: 0 }}
                animate={{ x: at >= SCROLL ? SCROLL_TO_END : 0 }}
                transition={{ duration: 0.62, ease: EASE }}
              >
                {SECTIONS.map((section, i) => (
                  <SectionCard
                    key={section.label}
                    {...section}
                    card={cards[i]}
                    order={
                      section.n === null ? 0 : picks.indexOf(section.n) + 1
                    }
                    tapping={ADDED[at - TAP_FIRST] === section.n}
                  />
                ))}
              </motion.div>
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
      style={{ width: inModal(COLUMN), gap: inModal(10.056) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card}
        alt=""
        style={{ width: inModal(CARD_W), height: inModal(CARD_H) }}
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
