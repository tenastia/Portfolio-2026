"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface Stat {
  /** Whole percent, e.g. 72 for "72%". */
  value: number;
  label: string;
}

/**
 * Geometry of the research cluster, in the Figma's own 412×337 coordinate
 * space. Circles are sized by weight rather than strictly by value — the
 * smallest finding still needs a legible disc — and each dotted elbow runs from
 * a circle edge out to its label.
 */
const LAYOUT = [
  {
    circle: { cx: 152, cy: 120, r: 69 },
    connector: "M172 51 L172 15 L206 15",
    label: "left-1/2 top-0",
    align: "text-left",
  },
  {
    circle: { cx: 228, cy: 240, r: 60 },
    connector: "M288 215 L378 215 L378 158",
    label: "right-0 top-[38%]",
    align: "text-right",
  },
  {
    circle: { cx: 120, cy: 232, r: 30 },
    connector: "M120 262 L120 315",
    label: "left-0 bottom-0",
    align: "text-left",
  },
] as const;

function Percent({ value, animated }: { value: number; animated: boolean }) {
  const [shown, setShown] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [animated, value]);

  return <>{shown}%</>;
}

/**
 * The three research findings that open the case study, drawn as overlapping
 * translucent discs sized by weight with dotted leaders out to their labels.
 * The discs settle in and the percentages count up when the cluster is reached.
 */
export default function StatCluster({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const animated = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[25.75rem] shrink-0 [aspect-ratio:412/337]"
    >
      <svg
        viewBox="0 0 412 337"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        {stats.slice(0, LAYOUT.length).map((stat, i) => {
          const { circle, connector } = LAYOUT[i];
          return (
            <g key={stat.label}>
              <motion.path
                d={connector}
                fill="none"
                stroke="var(--color-text-highlight)"
                strokeWidth="1"
                strokeDasharray="2 3"
                initial={reduceMotion ? undefined : { opacity: 0 }}
                animate={animated ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              />
              <motion.circle
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                fill="var(--color-white-100)"
                fillOpacity="0.1"
                style={{
                  transformOrigin: `${circle.cx}px ${circle.cy}px`,
                }}
                initial={reduceMotion ? undefined : { scale: 0.7, opacity: 0 }}
                animate={animated ? { scale: 1, opacity: 1 } : undefined}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </g>
          );
        })}
      </svg>

      {stats.slice(0, LAYOUT.length).map((stat, i) => {
        const { circle } = LAYOUT[i];
        return (
          <span
            key={`${stat.label}-value`}
            className="absolute -translate-x-1/2 -translate-y-1/2 font-serif text-[length:var(--stat-size)] leading-none text-white-100 tabular-nums"
            style={{
              left: `${(circle.cx / 412) * 100}%`,
              top: `${(circle.cy / 337) * 100}%`,
              ["--stat-size" as string]:
                circle.r > 50 ? "2.125rem" : "1.375rem",
            }}
          >
            <Percent value={stat.value} animated={animated} />
          </span>
        );
      })}

      {stats.slice(0, LAYOUT.length).map((stat, i) => (
        <motion.span
          key={`${stat.label}-label`}
          className={`absolute max-w-[55%] text-study-body leading-study-body tracking-[0.01em] text-text-highlight ${LAYOUT[i].label} ${LAYOUT[i].align}`}
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={animated ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
        >
          {stat.label}
        </motion.span>
      ))}
    </div>
  );
}
