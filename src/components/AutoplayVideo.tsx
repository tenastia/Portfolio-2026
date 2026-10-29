"use client";

import { useEffect, useRef } from "react";

type AutoplayVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "muted" | "loop" | "playsInline" | "preload"
> & {
  src: string;
  /**
   * Fetch and start with the page rather than on approach — for a hero that is
   * already in view on arrival, where waiting for hydration would only delay it.
   */
  eager?: boolean;
  /** Hold on a frame instead of playing, e.g. under a reduced-motion preference. */
  paused?: boolean;
};

/**
 * A muted, looping clip that only plays while it is on screen, or about to be.
 *
 * A case study can stack four or five of these down the page, and with plain
 * `autoPlay` every one of them downloads and decodes from the first paint. Here
 * nothing is fetched until the reader is within reach of the clip, and a clip
 * scrolled past stops decoding until it comes back.
 */
export default function AutoplayVideo({
  eager = false,
  paused = false,
  ...props
}: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Autoplay policy reads the property at play() time, and React does not
    // reliably reflect `muted` into the markup.
    video.muted = true;
    if (paused) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [paused]);

  return (
    <video
      ref={ref}
      autoPlay={eager && !paused}
      muted
      loop
      playsInline
      // Held still, it still wants a frame to show, so load just enough for one.
      preload={eager ? "auto" : paused ? "metadata" : "none"}
      {...props}
    />
  );
}
