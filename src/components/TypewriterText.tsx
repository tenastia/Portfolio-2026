"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_TEXT = "on a look for a watermelon sorbet 🍧";
const TYPING_SPEED_MS = 65;
const HOLD_MS = 30000;

// Split into user-perceived characters so emoji (incl. ZWJ sequences like
// 👩🏻‍🎨) type as a single unit rather than byte-by-byte.
function graphemes(text: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
  if (Seg) {
    return Array.from(new Seg(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

interface TypewriterTextProps {
  text?: string;
  /** Wait to start typing until the element scrolls into view */
  startOnView?: boolean;
}

export default function TypewriterText({
  text = DEFAULT_TEXT,
  startOnView = false,
}: TypewriterTextProps) {
  const chars = useMemo(() => graphemes(text), [text]);
  const [charCount, setCharCount] = useState(0);
  const [holding, setHolding] = useState(false);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLSpanElement>(null);

  // Kick off typing when the title first enters the viewport.
  useEffect(() => {
    if (started) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (!holding) {
      if (charCount < chars.length) {
        const t = setTimeout(() => setCharCount((n) => n + 1), TYPING_SPEED_MS);
        return () => clearTimeout(t);
      }
      setHolding(true);
    } else {
      const t = setTimeout(() => {
        setCharCount(0);
        setHolding(false);
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [charCount, holding, started, chars.length]);

  return (
    <span ref={ref}>
      {chars.slice(0, charCount).join("")}
      <span className="animate-blink">|</span>
    </span>
  );
}
