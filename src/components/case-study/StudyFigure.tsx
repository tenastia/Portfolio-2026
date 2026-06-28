"use client";

import { useEffect, useRef, useState } from "react";

interface StudyFigureProps {
  src: string;
  alt?: string;
  /** CSS aspect-ratio value, e.g. "823 / 411" */
  aspect: string;
  video?: boolean;
  /** Full viewport width (no rounded corners, no page padding) */
  fullBleed?: boolean;
  /** Contain the image inside a padded panel instead of covering the box */
  contain?: boolean;
}

/**
 * A case study media block. Holds its aspect ratio with a dark panel so the
 * layout stays intact before the asset is uploaded; a missing image is hidden
 * gracefully rather than showing a broken-image icon (including when the image
 * fails to load before hydration).
 */
export default function StudyFigure({
  src,
  alt = "",
  aspect,
  video = false,
  fullBleed = false,
  contain = false,
}: StudyFigureProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  let media: React.ReactNode = null;
  if (video) {
    media = (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  } else if (contain) {
    media = failed ? null : (
      <div className="absolute inset-0 flex items-center justify-center p-[6%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  } else {
    media = failed ? null : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <section
      className={
        fullBleed
          ? "w-full pb-content-block-y"
          : "max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y"
      }
    >
      <div
        className={`relative w-full overflow-hidden ${
          fullBleed ? "" : "rounded-[8px]"
        } ${contain ? "bg-[#202020]" : "bg-[#1a1a1a]"}`}
        style={{ aspectRatio: aspect }}
      >
        {media}
      </div>
    </section>
  );
}
