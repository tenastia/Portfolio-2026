"use client";

import { Fragment, useEffect, useRef } from "react";

interface PetalBioProps {
  paragraphs: string[];
  /** Wrapper class (layout only) */
  className?: string;
  /** Class applied to each <p> */
  paragraphClassName?: string;
}

/**
 * Bio text whose letters behave like petals on water: the cursor gently pushes
 * nearby letters apart (with a slight swirl), and they drift back into place
 * once it leaves. Mouse-only — falls back to static text on touch devices.
 */
export default function PetalBio({
  paragraphs,
  className = "",
  paragraphClassName = "",
}: PetalBioProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse-only: on touch devices there's no cursor, so leave the text static.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    const letters = Array.from(container.querySelectorAll<HTMLElement>(".petal"));
    const n = letters.length;
    if (!n) return;

    // Physics state
    const homeX = new Float64Array(n);
    const homeY = new Float64Array(n);
    const ox = new Float64Array(n);
    const oy = new Float64Array(n);
    const orot = new Float64Array(n);
    const vx = new Float64Array(n);
    const vy = new Float64Array(n);
    const vr = new Float64Array(n);
    const rotSeed = new Float64Array(n);
    const reach = new Float64Array(n);
    const magJit = new Float64Array(n);
    const angJit = new Float64Array(n);
    const asleep = new Uint8Array(n);

    // Tunables — small, chaotic scatter (no clean circle)
    const RADIUS = 66; // base reach around the cursor (px)
    const PUSH = 34; // base displacement
    const ROT_MAX = 8; // deg — subtle tumble
    const STIFF = 0.075; // spring pull home
    const DAMP = 0.74; // velocity damping

    for (let i = 0; i < n; i++) {
      rotSeed[i] = (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 0.5);
      // Per-letter randomness breaks the circular boundary and even spacing
      reach[i] = RADIUS * (0.55 + Math.random() * 0.75); // ragged edge
      magJit[i] = 0.4 + Math.random() * 1.2; // varied push distance
      angJit[i] = (Math.random() * 2 - 1) * 1.0; // ±~57° direction scatter
    }

    const pointer = { x: 0, y: 0, active: false };

    const measure = () => {
      for (let i = 0; i < n; i++) letters[i].style.transform = "";
      const c = container.getBoundingClientRect();
      for (let i = 0; i < n; i++) {
        const r = letters[i].getBoundingClientRect();
        homeX[i] = r.left + r.width / 2 - c.left;
        homeY[i] = r.top + r.height / 2 - c.top;
        ox[i] = oy[i] = orot[i] = vx[i] = vy[i] = vr[i] = 0;
        asleep[i] = 1;
      }
    };

    let raf = 0;
    let running = false;
    const ensureRunning = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      let awake = pointer.active;
      for (let i = 0; i < n; i++) {
        let tx = 0;
        let ty = 0;
        let tr = 0;
        if (pointer.active) {
          const dx = homeX[i] - pointer.x;
          const dy = homeY[i] - pointer.y;
          const ri = reach[i];
          const d2 = dx * dx + dy * dy;
          if (d2 < ri * ri) {
            const d = Math.sqrt(d2) || 0.0001;
            let f = 1 - d / ri;
            f = f * f; // ease off toward the ragged edge
            const ang = Math.atan2(dy, dx) + angJit[i]; // scatter the push direction
            const p = PUSH * f * magJit[i];
            tx = Math.cos(ang) * p;
            ty = Math.sin(ang) * p;
            tr = ROT_MAX * f * rotSeed[i];
          }
        }
        // critically-ish damped spring toward the target offset
        vx[i] = (vx[i] + (tx - ox[i]) * STIFF) * DAMP;
        vy[i] = (vy[i] + (ty - oy[i]) * STIFF) * DAMP;
        vr[i] = (vr[i] + (tr - orot[i]) * STIFF) * DAMP;
        ox[i] += vx[i];
        oy[i] += vy[i];
        orot[i] += vr[i];

        const moving =
          Math.abs(ox[i]) > 0.05 ||
          Math.abs(oy[i]) > 0.05 ||
          Math.abs(orot[i]) > 0.05 ||
          Math.abs(vx[i]) > 0.05 ||
          Math.abs(vy[i]) > 0.05 ||
          tx !== 0 ||
          ty !== 0;

        if (moving) {
          letters[i].style.transform = `translate3d(${ox[i].toFixed(2)}px, ${oy[i].toFixed(2)}px, 0) rotate(${orot[i].toFixed(2)}deg)`;
          if (asleep[i]) {
            letters[i].style.willChange = "transform";
            asleep[i] = 0;
          }
          awake = true;
        } else if (!asleep[i]) {
          ox[i] = oy[i] = orot[i] = vx[i] = vy[i] = vr[i] = 0;
          letters[i].style.transform = "";
          letters[i].style.willChange = "";
          asleep[i] = 1;
        }
      }
      if (awake) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const c = container.getBoundingClientRect();
      pointer.x = e.clientX - c.left;
      pointer.y = e.clientY - c.top;
      pointer.active = true;
      ensureRunning();
    };
    const onLeave = () => {
      pointer.active = false;
      ensureRunning();
    };

    let ro: ResizeObserver | null = null;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      measure();
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);
      ro = new ResizeObserver(() => {
        pointer.active = false;
        measure();
      });
      ro.observe(container);
    };

    // Measure only once webfonts are ready, so home positions are accurate.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(start);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      ro?.disconnect();
      for (let i = 0; i < n; i++) {
        letters[i].style.transform = "";
        letters[i].style.willChange = "";
      }
    };
  }, [paragraphs]);

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map((paragraph, pi) => {
        const words = paragraph.split(" ");
        return (
          <p key={pi} className={paragraphClassName}>
            {words.map((word, wi) => (
              <Fragment key={wi}>
                <span className="petal-word inline-block whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => (
                    <span key={ci} className="petal inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
