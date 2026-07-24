"use client";

import { useEffect, useState } from "react";

function vancouverTime() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Vancouver",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .toLowerCase();
}

/** Live "vancouver h:mm pm" clock in the designer's local timezone. */
export default function LiveTime() {
  // Null on the server / first render to avoid a hydration mismatch.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(vancouverTime());
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <>vancouver&nbsp;&nbsp;{time ?? ""}</>;
}
