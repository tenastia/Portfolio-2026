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
      className="flex items-center justify-center h-11 w-[72px] rounded-[6px] border border-[#2a2a2a] bg-text/[0.02] backdrop-blur-[8px] cursor-pointer transition-colors duration-300 hover:bg-text/[0.05]"
      aria-label={visible ? "Hide jellyfish" : "Show jellyfish"}
      onClick={toggle}
    >
      <img
        src={visible ? open : close}
        alt=""
        aria-hidden
        width={42}
        height={22}
      />
    </button>
  );
}
