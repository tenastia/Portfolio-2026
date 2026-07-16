"use client";

import { useScheme } from "./SchemeProvider";
import { useJellyfish } from "./JellyfishProvider";

export default function Eyes() {
  const { scheme } = useScheme();
  const { visible, toggle } = useJellyfish();

  const open = scheme === "light" ? "/eyes-open-light.svg" : "/eyes-open-dark.svg";
  const close = scheme === "light" ? "/eyes-closed-light.svg" : "/eyes-closed-dark.svg";

  return (
    <button
      className="group/eyes relative h-11 w-[72px] rounded-[6px] p-px overflow-hidden cursor-pointer"
      aria-label={visible ? "Hide jellyfish" : "Show jellyfish"}
      onClick={toggle}
    >
      {/* Rotating glow border — revealed on hover */}
      <span
        className="nav-btn-glow-ring opacity-0 group-hover/eyes:opacity-100 transition-opacity duration-500"
        aria-hidden
      />
      {/* Default static border — fades out on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[6px] border border-[#2a2a2a] group-hover/eyes:opacity-0 transition-opacity duration-500"
        aria-hidden
      />
      <span className="relative z-10 flex items-center justify-center w-full h-full rounded-[5px] bg-text/[0.02] backdrop-blur-[8px]">
        <img
          src={visible ? open : close}
          alt=""
          aria-hidden
          width={42}
          height={22}
        />
      </span>
    </button>
  );
}
