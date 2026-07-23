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
 * Bio text whose letters behave like petals on water. The cursor carves a
 * pill-shaped void — a "boat" — that points along its direction of travel and
 * parts nearby letters sideways like a wake; they drift back into place once it
 * leaves. Mouse-only — falls back to static text on touch devices.
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
    const asleep = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      rotSeed[i] = (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 0.5);
    }

    // Tunables — a pill-shaped "boat" void that parts the letters along its heading
    const HALF_LEN = 80; // half-length of the pill's straight axis (px)
    const HALF_WID = 40; // pill half-width — how far letters are held off the axis (px)
    const PUSH = 44; // max displacement
    const ROT_MAX = 7; // deg — kept subtle
    const STIFF = 0.075; // spring pull home
    const DAMP = 0.74; // velocity damping

    // hx/hy = smoothed heading (direction of travel) the pill points along
    const pointer = { x: 0, y: 0, hx: 1, hy: 0, active: false };

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
      const cull = (HALF_LEN + HALF_WID) * (HALF_LEN + HALF_WID);
      for (let i = 0; i < n; i++) {
        let tx = 0;
        let ty = 0;
        let tr = 0;
        if (pointer.active) {
          const dx = homeX[i] - pointer.x;
          const dy = homeY[i] - pointer.y;
          if (dx * dx + dy * dy < cull) {
            const hx = pointer.hx;
            const hy = pointer.hy;
            const gx = -hy; // perpendicular to the heading
            const gy = hx;
            // Project into the pill's frame: along the axis and across it.
            const along = dx * hx + dy * hy;
            const across = dx * gx + dy * gy;
            // Distance to the pill's central segment (capsule) → a pill-shaped void.
            const alongC =
              along < -HALF_LEN ? along + HALF_LEN : along > HALF_LEN ? along - HALF_LEN : 0;
            const segDist = Math.sqrt(alongC * alongC + across * across) || 0.0001;
            if (segDist < HALF_WID) {
              let f = 1 - segDist / HALF_WID;
              f = f * f; // ease off toward the pill's edge
              // Push away from the pill's axis — letters part sideways like a wake.
              let dirAlong = alongC;
              let dirAcross = across;
              if (segDist < 0.5) {
                // On the axis: send it to one side so it still parts.
                dirAlong = 0;
                dirAcross = rotSeed[i] < 0 ? -1 : 1;
              }
              const wx = dirAlong * hx + dirAcross * gx;
              const wy = dirAlong * hy + dirAcross * gy;
              const wl = Math.hypot(wx, wy) || 1;
              const p = PUSH * f;
              tx = (wx / wl) * p;
              ty = (wy / wl) * p;
              tr = ROT_MAX * f * rotSeed[i];
            }
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
