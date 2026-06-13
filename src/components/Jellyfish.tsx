"use client";

import { useEffect, useRef } from "react";

const BB_R0 = 0;
const BB_R1 = 92;
const BB_C0 = 3;
const BB_C1 = 299;
const BB_ROWS = BB_R1 - BB_R0 + 1;
const BB_COLS = BB_C1 - BB_C0 + 1;

const GLOW_COLOR = "#B6F2F9";
const FPS = 30;

type JellyWindow = Window & typeof globalThis & { __jellyfishFrames?: string[] };

export default function Jellyfish({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const maybeCanvas = canvasRef.current;
    if (!maybeCanvas) return;
    const canvas: HTMLCanvasElement = maybeCanvas;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    let rafId = 0;
    let frameIdx = 0;
    let lastFrameTs = 0;
    let parsed: string[][] = [];
    let cw = 0;
    let lh = 0;
    let drawW = 0;
    let drawH = 0;

    function init(frames: string[]) {
      parsed = frames.map((f) => f.split("\n"));

      const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const scale = isMobile ? 1 : 0.7;
      const rawSize = (window.innerWidth * 0.9 * scale) / (BB_COLS * 0.55);
      const fontSize = Math.max(3, Math.min(rawSize, 12 * scale));

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
      canvas.style.filter = `drop-shadow(0 0 6px ${GLOW_COLOR})`;
      ctx.scale(dpr, dpr);
      ctx.font = `${fontSize}px "Courier New", monospace`;

      rafId = requestAnimationFrame(loop);
    }

    function loop(ts: number) {
      rafId = requestAnimationFrame(loop);
      if (ts - lastFrameTs < 1000 / FPS) return;
      frameIdx = (frameIdx + 1) % parsed.length;
      lastFrameTs = ts;

      ctx.clearRect(0, 0, drawW, drawH);
      ctx.textBaseline = "top";
      ctx.fillStyle = GLOW_COLOR;

      const fr = parsed[frameIdx];
      if (!fr) return;

      for (let r = 0; r < BB_ROWS; r++) {
        const srcR = r + BB_R0;
        if (srcR >= fr.length) continue;
        const row = fr[srcR];
        for (let c = 0; c < BB_COLS; c++) {
          const srcC = c + BB_C0;
          if (srcC >= row.length) continue;
          const ch = row[srcC];
          if (ch !== " ") ctx.fillText(ch, c * cw, r * lh);
        }
      }
    }

    const script = document.createElement("script");
    script.src = "/jellyfish/animation.js";
    script.addEventListener("load", () => {
      const frames = (window as JellyWindow).__jellyfishFrames;
      if (frames && frames.length > 0) init(frames);
    });
    document.head.appendChild(script);

    return () => {
      cancelAnimationFrame(rafId);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center pointer-events-none z-[5] overflow-hidden transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
