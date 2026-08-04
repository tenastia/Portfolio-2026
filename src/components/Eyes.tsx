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
      className="flex items-center justify-center cursor-pointer border-none bg-transparent p-0"
      aria-label={visible ? "Hide jellyfish" : "Show jellyfish"}
      onClick={toggle}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={visible ? open : close} alt="" aria-hidden width={42} height={22} />
    </button>
  );
}
