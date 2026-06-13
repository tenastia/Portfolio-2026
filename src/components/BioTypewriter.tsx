"use client";

import { useState, useEffect } from "react";

const BIO =
  "Designing digital products and interfaces where brand meets system clarity. My work spans design systems, interactive experiences, and product design. An academic background in piano informs the rest — structure, systems thinking, and care for craft.";

const SPEED_MS = 22;

export default function BioTypewriter() {
  const [count, setCount] = useState(0);
  const done = count >= BIO.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCount((n) => n + 1), SPEED_MS);
    return () => clearTimeout(t);
  }, [count, done]);

  return (
    <>
      {BIO.slice(0, count)}
      {!done && <span className="animate-blink">|</span>}
    </>
  );
}
