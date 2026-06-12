"use client";

import { useState, useEffect } from "react";

const CHARS = Array.from("on a look for a watermelon sorbet 🍧");
const TYPING_SPEED_MS = 65;
const HOLD_MS = 30000;

export default function TypewriterText() {
  const [charCount, setCharCount] = useState(0);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    if (!holding) {
      if (charCount < CHARS.length) {
        const t = setTimeout(() => setCharCount((n) => n + 1), TYPING_SPEED_MS);
        return () => clearTimeout(t);
      } else {
        setHolding(true);
      }
    } else {
      const t = setTimeout(() => {
        setCharCount(0);
        setHolding(false);
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [charCount, holding]);

  return (
    <>
      {CHARS.slice(0, charCount).join("")}
      <span className="animate-blink">|</span>
    </>
  );
}
