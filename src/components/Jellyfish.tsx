"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// Bounding box of content across all frames (pre-computed)
const BB_R0 = 0;
const BB_R1 = 92;
const BB_C0 = 3;
const BB_C1 = 299;
const BB_ROWS = BB_R1 - BB_R0 + 1; // 93
const BB_COLS = BB_C1 - BB_C0 + 1; // 297

const GLOW_COLOR = "#B6F2F9";
const FPS = 30;
const DECAY = 0.93;       // opacity decay per frame
const VEL_SMOOTH = 0.35;  // EMA factor for velocity
const VEL_DECAY = 0.88;   // velocity decay per frame

export default function Jellyfish() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let rafId = 0;
    let pollId: ReturnType<typeof setInterval>;
    let velocity = 0;
    let lastX = -1, lastY = -1;
    let frameIdx = 0;
    let lastFrameTs = 0;
    let charOps: Float32Array;
    let parsed: string[][];
    let cw = 0;
    let lh = 0;
    let drawW = 0, drawH = 0;

    function init(frames: string[]) {
      parsed = frames.map((f) => f.split("\n"));

      // Responsive font size: fill ~90% viewport width, cap at 8px
      const rawSize = (window.innerWidth * 0.9) / (BB_COLS * 0.55);
      const fontSize = Math.max(3, Math.min(rawSize, 8));

      ctx.font = `${fontSize}px "Courier New", monospace`;
      cw = ctx.measureText("░").width;
      lh = fontSize * 1.15;

      drawW = BB_COLS * cw;
      drawH = BB_ROWS * lh;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(drawW * dpr);
      canvas.height = Math.round(drawH * dpr);
      canvas.style.width = `${drawW}px`;
      canvas.style.height = `${drawH}px`;
      ctx.scale(dpr, dpr);
      ctx.font = `${fontSize}px "Courier New", monospace`;

      charOps = new Float32Array(BB_ROWS * BB_COLS);
      if (isMobile) charOps.fill(1);

      rafId = requestAnimationFrame(loop);
    }

    function loop(ts: number) {
      rafId = requestAnimationFrame(loop);

      if (ts - lastFrameTs >= 1000 / FPS) {
        frameIdx = (frameIdx + 1) % parsed.length;
        lastFrameTs = ts;
      }

      const intensity = Math.min(velocity * 0.012, 1);

      if (!isMobile) {
        // Decay all character opacities
        for (let i = 0; i < charOps.length; i++) charOps[i] *= DECAY;

        // Reveal random characters proportional to movement intensity
        if (intensity > 0.015) {
          const count = Math.ceil(intensity * charOps.length * 0.035);
          for (let k = 0; k < count; k++) {
            const i = Math.floor(Math.random() * charOps.length);
            charOps[i] = Math.min(1, charOps[i] + 0.15 + intensity * 0.85);
          }
        }

        velocity *= VEL_DECAY;
      }

      ctx.clearRect(0, 0, drawW, drawH);
      ctx.textBaseline = "top";
      ctx.fillStyle = GLOW_COLOR;
      ctx.shadowColor = GLOW_COLOR;
      ctx.shadowBlur = isMobile ? 8 : intensity * 22;

      const fr = parsed[frameIdx];

      for (let r = 0; r < BB_ROWS; r++) {
        const srcR = r + BB_R0;
        if (srcR >= fr.length) continue;
        const row = fr[srcR];

        for (let c = 0; c < BB_COLS; c++) {
          const srcC = c + BB_C0;
          if (srcC >= row.length) continue;
          const ch = row[srcC];
          if (ch === " ") continue;

          const op = isMobile ? 1 : charOps[r * BB_COLS + c];
          if (op < 0.008) continue;

          ctx.globalAlpha = op;
          ctx.fillText(ch, c * cw, r * lh);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    pollId = setInterval(() => {
      const frames = (window as any).__jellyfishFrames as string[] | undefined;
      if (frames?.length) {
        clearInterval(pollId);
        init(frames);
      }
    }, 100);

    const onMove = (e: MouseEvent) => {
      if (lastX >= 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        velocity = velocity * (1 - VEL_SMOOTH) + Math.sqrt(dx * dx + dy * dy) * VEL_SMOOTH;
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      clearInterval(pollId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <Script src="/jellyfish/animation.js" strategy="afterInteractive" />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[5] overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
