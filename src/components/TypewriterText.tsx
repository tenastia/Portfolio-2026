"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { statuses } from "@/data/statuses";

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

/** A random index that is never the one showing, so no line repeats back to back. */
function nextStatus(current: number) {
  if (statuses.length < 2) return 0;
  const i = Math.floor(Math.random() * (statuses.length - 1));
  return i >= current ? i + 1 : i;
}

interface TypewriterTextProps {
  /** Fixed text. Omitted, the line draws a fresh random status each pass. */
  text?: string;
  /** Wait to start typing until the element scrolls into view */
  startOnView?: boolean;
}

export default function TypewriterText({
  text,
  startOnView = false,
}: TypewriterTextProps) {
  const [status, setStatus] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [holding, setHolding] = useState(false);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLSpanElement>(null);
  const chars = useMemo(
    () => graphemes(text ?? statuses[status]),
    [text, status],
  );

  // Drawn on the client, after the first paint: picking during render would
  // give the server and the browser different lines and break hydration.
  // Nothing is visible yet at that point — typing starts a tick later.
  useEffect(() => {
    // Uniform on arrival — every line, including the first, can open the page.
    if (!text) setStatus(Math.floor(Math.random() * statuses.length));
  }, [text]);

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
        if (!text) setStatus(nextStatus);
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [charCount, holding, started, chars.length, text]);

  return (
    <span ref={ref}>
      {chars.slice(0, charCount).join("")}
      <span className="animate-blink">|</span>
    </span>
  );
}
