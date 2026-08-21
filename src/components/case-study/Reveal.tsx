"use client";

import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  /** Seconds to hold before the reveal starts, for staggering siblings. */
  delay?: number;
  /** Distance in px the content travels up into place. */
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal used across the case study sections. Fires once when
 * the element enters the viewport and respects the reader's reduced-motion
 * preference by rendering the content statically.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
