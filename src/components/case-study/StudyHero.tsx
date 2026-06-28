"use client";

import { useEffect, useRef, useState } from "react";

interface StudyHeroProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "1440 / 972" */
  aspect?: string;
  bg?: string;
  children?: React.ReactNode;
}

/**
 * Case study hero. Holds its aspect ratio with a dark panel so the layout stays
 * intact before the cover is uploaded, and hides a missing image gracefully.
 * Children (e.g. the metadata card) overlay the cover.
 */
export default function StudyHero({
  src,
  alt,
  aspect = "1440 / 972",
  bg = "#1a1a1a",
  children,
}: StudyHeroProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <section className="px-page pt-page">
      <div
        className="relative w-full overflow-hidden rounded-[8px]"
        style={{ aspectRatio: aspect, background: bg }}
      >
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {children}
      </div>
    </section>
  );
}
