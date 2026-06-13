"use client";

import { useState } from "react";
import { useScheme } from "./SchemeProvider";

export default function Eyes() {
  const { scheme } = useScheme();
  const [closed, setClosed] = useState(false);

  const open = scheme === "light" ? "/eyes-open-light.svg" : "/eyes-open-dark.svg";
  const close = scheme === "light" ? "/eyes-closed-light.svg" : "/eyes-closed-dark.svg";

  return (
    <button
      className="cursor-pointer border-none bg-transparent p-0"
      aria-label="Eyes"
      onClick={() => setClosed((prev) => !prev)}
    >
      <img
        src={closed ? close : open}
        alt=""
        aria-hidden
        width={61}
        height={32}
      />
    </button>
  );
}
