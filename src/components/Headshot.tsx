"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

/** The two sides of the coin: the photograph, and the drawn one. */
const FRONT = "/headshot-front.png";
const BACK = "/headshot-back.png";

/** Full turns a click sends it through before it settles. */
const SPINS = 3;

const FLIP = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const;
/** Fast out of the gate, then a long settle — a coin coming to rest. */
const SPIN = { duration: 1.15, ease: [0.16, 1, 0.3, 1] } as const;

function Face({ src, back = false }: { src: string; back?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      className="absolute inset-0 size-full rounded-full border border-[rgba(248,249,250,0.3)] object-cover"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : undefined,
      }}
    />
  );
}

interface HeadshotProps {
  className?: string;
}

/**
 * The avatar as a two-sided coin. Hovering turns it over; clicking spins it and
 * lets it land on either face, so which one comes up is a genuine toss-up
 * rather than a cycle.
 *
 * Rotation accumulates rather than resetting, so a spin always carries on from
 * where the last one stopped and never snaps back through the faces. A hover
 * only borrows a half-turn on top of that resting angle, which is why it can be
 * given back cleanly when the pointer leaves.
 *
 * The images are decorative here: this sits inside a button that names itself,
 * so a name on either face would only be read out twice.
 */
export default function Headshot({ className = "" }: HeadshotProps) {
  const reduceMotion = useReducedMotion();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  /** Where it rests, ignoring the half-turn a hover borrows. */
  const rest = useRef(0);

  const hover = (over: boolean) => {
    if (spinning || reduceMotion) return;
    setRotation(rest.current + (over ? 180 : 0));
  };

  const spin = () => {
    rest.current += 360 * SPINS + (Math.random() < 0.5 ? 180 : 0);
    setRotation(rest.current);
    if (!reduceMotion) setSpinning(true);
  };

  return (
    <div
      className={`shrink-0 [perspective:400px] ${className}`}
      onPointerEnter={() => hover(true)}
      onPointerLeave={() => hover(false)}
      onClick={spin}
    >
      <motion.div
        className="relative size-full [transform-style:preserve-3d]"
        animate={{ rotateY: rotation }}
        // Under a reduced-motion preference the same click still changes the
        // face — it just arrives there instead of spinning to it.
        transition={reduceMotion ? { duration: 0 } : spinning ? SPIN : FLIP}
        onAnimationComplete={() => setSpinning(false)}
      >
        <Face src={FRONT} />
        <Face src={BACK} back />
      </motion.div>
    </div>
  );
}
