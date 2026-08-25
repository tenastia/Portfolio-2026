"use client";

import { useEffect, useRef, useState } from "react";

interface StudyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Rendered in place of the image while the asset is missing. */
  fallback?: React.ReactNode;
}

/**
 * An image that removes itself when the asset is missing rather than showing a
 * broken-image icon — including when the load fails before hydration. Case
 * study sections reference exports that land in `public/projects/<slug>/` after
 * the layout is built, so a not-yet-exported asset leaves the surrounding panel
 * intact instead of breaking the page.
 */
export default function StudyImage({
  src,
  alt = "",
  className,
  style,
  fallback = null,
}: StudyImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
