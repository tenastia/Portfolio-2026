"use client";

import { useEffect, useRef, useState } from "react";

interface StudyHeroProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio value matching the image, e.g. "2880 / 2048" */
  aspect?: string;
  bg?: string;
  children?: React.ReactNode;
}

/**
 * Full-bleed case study hero. The cover image spans the full viewport width
 * with no border or rounded corners, sitting flush to the top so the metadata
 * card (passed as children) top-aligns with the fixed floating buttons. Holds
 * its aspect ratio with a dark panel and hides a missing image gracefully.
 */
export default function StudyHero({
  src,
  alt,
  aspect = "2880 / 2048",
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
    <section className="relative w-full">
      <div
        className="relative w-full overflow-hidden"
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
      </div>
      {children}
    </section>
  );
}
