"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Geometry measured off the Figma frames, which the export reproduces at
 * exactly 2× — the phone is 320 × 697 design units. Everything here is sized in
 * `cqw` against the phone, so one number means the same thing whether the
 * screen renders at 160px or 400px wide.
 */
const PHONE_W = 320;
const PHONE_H = 697;
const u = (n: number) => `${((n * 100) / PHONE_W).toFixed(4)}cqw`;

/**
 * The device itself, measured off the export: a uniform `#b3b4b4` hairline
 * around a `#191919` body, on a corner fitted to the export's alpha.
 */
const CORNER = 17.3;
const BORDER_W = 0.82;
const BORDER = "#b3b4b4";
const BODY = "#191919";

/** Chrome that stays put while the content scrolls under it. */
const STATUS_H = 49.353;
const NAV_TOP = 631.746;
const NAV_H = PHONE_H - NAV_TOP;
const PORT_TOP = STATUS_H;
const PORT_H = NAV_TOP - STATUS_H;

/**
 * Slices of the export used as the scrolling content's own top. The band is
 * everything down to where the flow's variable part begins — the toolbar, the
 * title and the piece card. The question below it is its own slice, so it can
 * leave when the flow moves past it.
 */
const BAND = { top: STATUS_H, height: 407.662 - STATUS_H };
const QUESTION = { top: 407.662, height: 28.92 };

/** The content column, inset the way every row in the export is. */
const COL_X = 19.104;
const COL_W = 281.791;

/** How far the content sits from the phone's top when nothing is scrolled. */
const CONTENT_TOP = 407.662;

const EASE = [0.22, 1, 0.36, 1] as const;
const SCROLL_TIMING = { duration: 0.62, ease: EASE };

/** A press, the way a tap reads on a device: down, and straight back up. */
const tap = (active: boolean) =>
  active ? { scale: [1, 0.96, 1] } : { scale: 1 };
const TAP_TIMING = { duration: 0.26, ease: "easeOut" as const };

/* ------------------------------------------------------------------ beats */

/**
 * The flow, one beat at a time. Each entry is how long that beat holds and how
 * far the content is scrolled while it does — so the sequence and the scrolling
 * are described in one place rather than drifting apart.
 *
 * Each scroll position is set so that whatever the next beat touches is on
 * screen when it happens: a button cannot be seen to be pressed from below the
 * fold. `inview.mjs` in the scratchpad checks that.
 */
const FLOW = [
  { ms: 1000, scroll: 0 }, // 0  the question, waiting
  { ms: 300, scroll: 0 }, //  1  Yes
  { ms: 1000, scroll: 255 }, // 2  the calendar arrives, and is scrolled to
  { ms: 900, scroll: 255 }, //  3  a date
  { ms: 400, scroll: 255 }, //  4  Continue
  { ms: 900, scroll: 0 }, //    5  the schedule screen
  { ms: 1300, scroll: 0 }, //   6  the practice days
  { ms: 700, scroll: 130 }, //  7  down to the times
  { ms: 350, scroll: 130 }, //  8  Add
  { ms: 1300, scroll: 130 }, // 9  the picker dials round to 16:00
  { ms: 400, scroll: 130 }, //  10 Add, again
  { ms: 800, scroll: 130 }, //  11 and 16:00 joins the row
  { ms: 600, scroll: 297 }, //  12 down to notifications
  { ms: 900, scroll: 297 }, //  13 on
  { ms: 2200, scroll: 297 }, // 14 the finished routine, held
];

const TAP_YES = 1;
const DATE_IN = 2;
const TAP_DAY = 3;
const TAP_CONTINUE = 4;
const SCHEDULE_IN = 5;
const PICK_DAYS = 6;
const TAP_ADD = 8;
const DIAL = 9;
const CONFIRM = 10;
const TIME_IN = 11;
const TAP_TOGGLE = 13;
const SETTLED = FLOW.length - 1;

/* ------------------------------------------------------------------ pieces */

/**
 * A horizontal slice of the export, positioned by shifting the whole image
 * behind a window of the right height. Used for the chrome that stays put and
 * for the parts of the screen the flow does not change.
 */
function Slice({
  src,
  top,
  height,
  className,
}: {
  src: string;
  top: number;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className || ""}`}
      style={{ height: u(height) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute left-0 w-full max-w-none"
        style={{ top: u(-top) }}
      />
    </div>
  );
}

/** The rules between the schedule's sections: a hairline that fades out at both ends. */
function Rule() {
  return (
    <div
      className="w-full shrink-0"
      style={{
        height: u(6.368),
        backgroundImage:
          "linear-gradient(90deg, transparent, #3a3a3a 14%, #3a3a3a 86%, transparent)",
        backgroundSize: `100% ${u(0.8)}`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="w-full font-sans text-[#999]"
      style={{ fontSize: u(11.144), lineHeight: u(12.736) }}
    >
      {children}
    </p>
  );
}

function PrimaryButton({
  label,
  filled,
  width,
  height = 44.577,
  pressed = false,
}: {
  label: string;
  filled: boolean;
  width: number;
  height?: number;
  pressed?: boolean;
}) {
  return (
    <motion.div
      className="flex shrink-0 items-center justify-center font-sans"
      style={{
        width: u(width),
        height: u(height),
        borderRadius: u(12),
        borderWidth: u(0.796),
        borderColor: "#ffffff",
        background: filled ? "#ffffff" : "transparent",
        color: filled ? "#191919" : "#ffffff",
        fontSize: u(12.74),
        lineHeight: u(15.92),
      }}
      animate={tap(pressed)}
      transition={TAP_TIMING}
    >
      {label}
    </motion.div>
  );
}

/* ----------------------------------------------------------------- calendar */

/**
 * The month as the design lays it out — the two dimmed cells at the start are
 * the previous month running into the week.
 */
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKS: (number | null)[][] = [
  [null, null, 26, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, null, null, null],
];
/** The two that belong to August, drawn back in `#575758`. */
const SPILL = new Set([26, 2]);
const CHOSEN = 5;

function Calendar({ picked }: { picked: boolean }) {
  return (
    <div
      className="flex w-full shrink-0 flex-col"
      style={{
        height: u(267.463),
        background: "#292929",
        border: `${u(0.796)} solid #333`,
        borderRadius: u(12),
        paddingLeft: u(7),
        paddingRight: u(7),
        paddingTop: u(4),
        paddingBottom: u(16),
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ paddingTop: u(12), paddingInline: u(13.26) }}
      >
        <div className="flex items-center font-sans" style={{ gap: u(8) }}>
          <span
            className="text-white"
            style={{ fontSize: u(13.26), lineHeight: u(16.58) }}
          >
            September, 2025
          </span>
          {/* The month menu's caret, and the pager either side of it. Both are
              drawn here rather than exported — see ASSETS.md. */}
          <svg
            viewBox="0 0 10 4"
            fill="currentColor"
            className="text-white"
            style={{ width: u(8.29), height: u(3.32) }}
          >
            <path d="M0 0h10L5 4Z" />
          </svg>
        </div>
        <svg
          viewBox="0 0 40 12.8"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          style={{ width: u(33.15), height: u(10.61) }}
        >
          <path d="M6.6 2.2 1.8 6.4l4.8 4.2" />
          <path d="M33.4 2.2 38.2 6.4l-4.8 4.2" />
        </svg>
      </div>

      <div
        className="w-full"
        style={{
          marginTop: u(13.26),
          height: u(0.8),
          background: "#3a3a3a",
        }}
      />

      <div
        className="grid font-sans"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          marginTop: u(6.63),
          paddingInline: u(13.26),
        }}
      >
        {WEEKDAYS.map((d, i) => (
          <span
            key={i}
            className="text-center text-[#858585]"
            style={{ fontSize: u(13.26), lineHeight: u(30) }}
          >
            {d}
          </span>
        ))}
      </div>

      <div
        className="grid flex-1 font-sans"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          paddingInline: u(13.26),
        }}
      >
        {WEEKS.flat().map((day, i) => (
          <span
            key={i}
            className="relative flex items-center justify-center"
            style={{ fontSize: u(14.92) }}
          >
            {day !== null && (
              <>
                {day === CHOSEN && (
                  // The chosen date lands under the number rather than over it,
                  // so the numeral flips to dark as the disc arrives.
                  <motion.span
                    className="absolute rounded-full bg-white"
                    style={{ width: u(29.84), height: u(29.84) }}
                    initial={false}
                    animate={{
                      scale: picked ? 1 : 0.4,
                      opacity: picked ? 1 : 0,
                    }}
                    transition={{ duration: 0.26, ease: EASE }}
                  />
                )}
                <motion.span
                  className="relative"
                  initial={false}
                  animate={{
                    color:
                      day === CHOSEN && picked
                        ? "#191919"
                        : SPILL.has(day)
                          ? "#575758"
                          : "#ffffff",
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {day}
                </motion.span>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- time picker */

/**
 * The picker the flow needs but the design does not have: an iOS-style dial in
 * this screen's own materials — the sheet, border and button are the selector
 * modal's, and the selected row is a `#292929` band like every other filled
 * surface here. The column is masked rather than recoloured per row, so the
 * value under the band is simply the one that is legible.
 */
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const MINUTES = ["00", "15", "30", "45"];
const ROW_H = 26.4;
const WHEEL_H = ROW_H * 5;
const wheelY = (index: number) => (WHEEL_H - ROW_H) / 2 - index * ROW_H;

const SHEET_W = 274;
const SHEET_H = 268.6;

function Wheel({
  values,
  index,
  from,
  animate,
}: {
  values: string[];
  index: number;
  from?: number;
  animate: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: u(WHEEL_H),
        width: u(52),
        maskImage:
          "linear-gradient(180deg, transparent, #000 26%, #000 74%, transparent)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent, #000 26%, #000 74%, transparent)",
      }}
    >
      <motion.div
        className="absolute inset-x-0 font-sans"
        initial={{ y: u(wheelY(from ?? index)) }}
        animate={{ y: u(wheelY(index)) }}
        transition={
          animate ? { duration: 0.85, delay: 0.3, ease: EASE } : { duration: 0 }
        }
      >
        {values.map((v) => (
          <div
            key={v}
            className="flex items-center justify-center text-white"
            style={{ height: u(ROW_H), fontSize: u(15) }}
          >
            {v}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TimePicker({
  dialled,
  pressed,
}: {
  dialled: boolean;
  pressed: boolean;
}) {
  return (
    <motion.div
      className="absolute left-1/2 flex flex-col items-center"
      style={{
        top: u(PORT_TOP + (PORT_H - SHEET_H) / 2),
        width: u(SHEET_W),
        height: u(SHEET_H),
        x: "-50%",
        background: "#191919",
        border: `${u(0.8)} solid #535353`,
        borderRadius: u(12),
        paddingTop: u(20),
        paddingBottom: u(20),
      }}
      initial={{ opacity: 0, scale: 0.96, y: u(6) }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.96,
        y: u(4),
        transition: { duration: 0.19, ease: "easeIn" },
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <span
        className="font-sans text-white"
        style={{ fontSize: u(12.736), lineHeight: u(15.92) }}
      >
        Set a practice time
      </span>

      <div
        className="relative flex items-center justify-center"
        style={{ marginTop: u(18), width: u(SHEET_W - 32) }}
      >
        <div
          className="absolute"
          style={{
            width: u(SHEET_W - 32),
            height: u(ROW_H),
            background: "#292929",
            borderRadius: u(8),
          }}
        />
        <div className="relative flex items-center" style={{ gap: u(4) }}>
          <Wheel
            values={HOURS.map((h) => String(h).padStart(2, "0"))}
            index={HOURS.indexOf(16)}
            from={HOURS.indexOf(11)}
            animate={dialled}
          />
          <span
            className="font-sans text-white"
            style={{ fontSize: u(15), paddingBottom: u(2) }}
          >
            :
          </span>
          <Wheel values={MINUTES} index={0} animate={false} />
        </div>
      </div>

      <div style={{ marginTop: u(18) }}>
        <PrimaryButton
          label="Add"
          filled
          width={SHEET_W - 32}
          pressed={pressed}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ screen */

const DAY_LETTERS = ["s", "m", "t", "w", "t", "f", "s"];
/** Monday to Friday — what the recommendation above the row argues for. */
const PRACTICE_DAYS = [1, 2, 3, 4, 5];

interface PracticeRoutineScreenProps {
  /** The set-up screen, with everything below the piece card left out. */
  screen: string;
  label: string;
  className?: string;
}

/**
 * The whole goal-setting flow playing inside one phone: a date, the days of the
 * week, a practice time and notifications, set one after another without the
 * screen ever being replaced by a screenshot of itself.
 *
 * The frame stays put and the content scrolls under fixed chrome, the way it
 * would on a device — the status bar and tab bar are slices of the same export
 * held at the top and bottom, and everything between them moves. What the flow
 * changes is real markup: the calendar, the day row, the time slots, the picker
 * and the toggle are all built, so each one animates on its own terms.
 *
 * The cycle runs only while the screen is in view and restarts when the reader
 * comes back to it; under a reduced-motion preference it holds the finished
 * routine, which is the state the annotation beside it describes.
 */
export default function PracticeRoutineScreen({
  screen,
  label,
  className,
}: PracticeRoutineScreenProps) {
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
      () => setStep((s) => (s + 1) % FLOW.length),
      FLOW[step].ms,
    );
    return () => clearTimeout(id);
  }, [inView, reduceMotion, step]);

  const at = reduceMotion ? SETTLED : step;
  const scheduling = at >= SCHEDULE_IN;
  const modalOpen = at >= DIAL && at < TIME_IN;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`relative @container ${className || ""}`}
      style={{ aspectRatio: `${PHONE_W} / ${PHONE_H}` }}
    >
      {/*
        The device's body and its shape. This has to be a child rather than the
        stage itself: a `cqw` in the container element's own style resolves
        against its *ancestor* container, not itself — an element cannot size
        itself from its own size — so a radius set up there came out at the
        viewport's scale instead of the phone's. Everything below the band
        depends on this layer, since there is no export down there to carry
        either the fill or the corner.
      */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ background: BODY, borderRadius: u(CORNER) }}
      >
        {/* The scroll port: everything between the fixed chrome. */}
        <div
          className="absolute inset-x-0 overflow-hidden"
          style={{ top: u(PORT_TOP), height: u(PORT_H) }}
        >
          {/* Keyed by phase, so moving to the next screen lands at its own scroll
            position instead of animating there from the previous one. */}
          <motion.div
            key={scheduling ? "schedule" : "date"}
            className="absolute inset-x-0 top-0"
            initial={{ y: u(-FLOW[at].scroll) }}
            animate={{ y: u(-FLOW[at].scroll) }}
            transition={SCROLL_TIMING}
          >
            <Slice src={screen} {...BAND} />

            {!scheduling && <Slice src={screen} {...QUESTION} />}

            <motion.div
              className="flex flex-col"
              style={{ marginLeft: u(COL_X), width: u(COL_W) }}
              initial={{ opacity: 0, y: u(8) }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: EASE }}
            >
              {scheduling ? (
                <Schedule
                  at={at}
                  daysPicked={at >= PICK_DAYS}
                  timeAdded={at >= TIME_IN}
                  notifOn={at >= TAP_TOGGLE}
                />
              ) : (
                <DateStep at={at} />
              )}
            </motion.div>

            <div style={{ height: u(28) }} />
          </motion.div>
        </div>

        {/* Fixed chrome, cut from the same export. */}
        <Slice
          src={screen}
          top={0}
          height={STATUS_H}
          className="absolute inset-x-0 top-0"
        />
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ height: u(NAV_H) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screen}
            alt=""
            className="absolute bottom-0 left-0 w-full max-w-none"
          />
        </div>

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              key="scrim"
              className="absolute inset-0 bg-black/60"
              // Rounded to the phone's own corner, or the dim squares off the
              // device it is dimming.
              style={{
                backdropFilter: "blur(0.7cqw)",
                borderRadius: u(CORNER),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.34, ease: "easeOut" },
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {modalOpen && (
            <TimePicker key="picker" dialled pressed={at === CONFIRM} />
          )}
        </AnimatePresence>
      </div>

      {/* The frame's own edge, last and over everything — including the dimmed
          sheet — so the phone reads as an object the content is inside of
          rather than a picture the content is drawn on. The export carries this
          line too, at exactly these pixels, so where a slice shows it the two
          coincide. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          border: `${u(BORDER_W)} solid ${BORDER}`,
          borderRadius: u(CORNER),
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------- flow steps */

function DateStep({ at }: { at: number }) {
  const shown = at >= DATE_IN;

  return (
    <>
      <div className="flex" style={{ gap: u(7.96) }}>
        <PrimaryButton
          label="Yes"
          filled={at >= TAP_YES}
          width={136.915}
          pressed={at === TAP_YES}
        />
        <PrimaryButton label="Not Yet" filled={false} width={136.915} />
      </div>

      <AnimatePresence initial={false}>
        {shown && (
          <motion.div
            className="flex flex-col overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            <div style={{ height: u(25.472) }} />
            <SectionLabel>Select the date</SectionLabel>
            <div style={{ height: u(12.736) }} />
            <Calendar picked={at >= TAP_DAY} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: u(29.452) }} />
      <PrimaryButton
        label="Continue"
        filled
        width={COL_W}
        height={44.657}
        pressed={at === TAP_CONTINUE}
      />
    </>
  );
}

function Schedule({
  at,
  daysPicked,
  timeAdded,
  notifOn,
}: {
  at: number;
  daysPicked: boolean;
  timeAdded: boolean;
  notifOn: boolean;
}) {
  return (
    <>
      <p
        className="font-sans text-white"
        style={{ fontSize: u(12.736), lineHeight: u(15.92) }}
      >
        Based on the timeline and the size of the piece we recommend practice it
        at least twice a day.
      </p>

      <div style={{ height: u(25.473) }} />
      <SectionLabel>
        Select the days when you would like to practice the piece.
      </SectionLabel>

      <div style={{ height: u(12.736) }} />
      <div className="flex items-center" style={{ gap: u(9.552) }}>
        {DAY_LETTERS.map((letter, i) => {
          const on = daysPicked && PRACTICE_DAYS.includes(i);
          return (
            <motion.span
              key={i}
              className="flex items-center justify-center rounded-full font-sans uppercase"
              style={{
                width: u(28.657),
                height: u(28.657),
                fontSize: u(11.14),
                borderWidth: u(1.592),
              }}
              initial={false}
              animate={{
                backgroundColor: on ? "#ffffff" : "#333333",
                borderColor: on ? "#d6d6d6" : "#333333",
                color: on ? "#191919" : "#ffffff",
                scale: on ? [1, 1.12, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                delay: on ? i * 0.08 : 0,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>

      <div style={{ height: u(38.209) }} />
      <Rule />
      <div style={{ height: u(23.881) }} />

      <SectionLabel>
        Set the time when you would like to practice the piece
      </SectionLabel>
      <div style={{ height: u(12.736) }} />
      <div
        className="flex flex-wrap"
        style={{ columnGap: u(7.96), rowGap: u(12) }}
      >
        <TimeSlot label="11:00" />
        {timeAdded && <TimeSlot label="16:00" arriving />}
        <PrimaryButton
          label="Add"
          filled={false}
          width={136.915}
          height={54.129}
          pressed={at === TAP_ADD}
        />
      </div>

      <div style={{ height: u(23.881) }} />
      <Rule />
      <div style={{ height: u(23.881) }} />

      <div className="flex w-full items-center justify-between">
        <SectionLabel>Send Notifications</SectionLabel>
        <Toggle on={notifOn} pressed={at === TAP_TOGGLE} />
      </div>

      <div style={{ height: u(42.985) }} />
      <PrimaryButton
        label="Start Memorizing"
        filled
        width={COL_W}
        height={44.657}
      />
    </>
  );
}

/**
 * A chosen practice time. Deliberately not a `layout` animation: these sit
 * inside the track whose `y` is animating for the scroll, and Framer's layout
 * animations re-measure absolute box positions every frame — against a moving
 * ancestor transform they never settle, which reads as the row twitching. The
 * new slot fades up instead, and `Add` wraps to the next line the way it would
 * in a real reflow.
 */
function TimeSlot({ label, arriving }: { label: string; arriving?: boolean }) {
  return (
    <motion.div
      className="flex shrink-0 items-center justify-center font-sans text-white"
      style={{
        width: u(136.915),
        height: u(54.129),
        background: "#292929",
        border: `${u(0.796)} solid #333`,
        borderRadius: u(8),
        fontSize: u(11.14),
        lineHeight: u(12.736),
      }}
      initial={arriving ? { opacity: 0, scale: 0.9 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {label}
    </motion.div>
  );
}

/**
 * The notifications switch. The thumb carries the answer, so the labels stay
 * where they are and only their colour follows it across.
 */
function Toggle({ on, pressed }: { on: boolean; pressed: boolean }) {
  return (
    <motion.div
      className="relative shrink-0 overflow-hidden"
      style={{ width: u(72.438), height: u(27.065), borderRadius: u(36) }}
      animate={tap(pressed)}
      transition={TAP_TIMING}
    >
      <div
        className="absolute"
        style={{
          left: u(0.8),
          top: u(0.8),
          width: u(70.846),
          height: u(25.473),
          background: "#292929",
          border: `${u(0.796)} solid #474747`,
          borderRadius: u(32),
        }}
      />
      <motion.div
        className="absolute bg-white"
        style={{
          top: u(3.18),
          width: u(32.637),
          height: u(20.697),
          borderRadius: u(32),
        }}
        initial={false}
        animate={{ left: u(on ? 36.62 : 3.18) }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      {(["No", "Yes"] as const).map((word) => {
        const active = (word === "Yes") === on;
        return (
          <motion.span
            key={word}
            className="absolute -translate-x-1/2 font-sans"
            style={{
              left: u(word === "No" ? 19.1 : 52.94),
              top: u(7.19),
              fontSize: u(11.14),
              lineHeight: u(12.736),
            }}
            initial={false}
            animate={{ color: active ? "#191919" : "#999999" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
