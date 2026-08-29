export interface FrameScreen {
  /** The frame's own aspect ratio, e.g. "1648 / 1050". */
  aspect: string;
  /** The viewport area inside the chrome, as percentages of the frame. */
  left: string;
  top: string;
  width: string;
  height: string;
}

interface BrowserFrameProps {
  /** Browser chrome export, with an opaque viewport the video is laid over. */
  frame: string;
  video: string;
  screen: FrameScreen;
  alt: string;
}

/**
 * A site playing inside its own browser chrome. The chrome is an export and the
 * video sits on top of its viewport area, positioned by percentages measured
 * off that export so the two stay registered at any size.
 *
 * The video covers its slot rather than fitting inside it — the chrome's
 * viewport is a different shape from the recording, and letterboxing would put
 * bars inside the browser window.
 */
export default function BrowserFrame({
  frame,
  video,
  screen,
  alt,
}: BrowserFrameProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full"
      style={{ aspectRatio: screen.aspect }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frame}
        alt=""
        className="absolute inset-0 h-full w-full"
      />
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-cover"
        style={{
          left: screen.left,
          top: screen.top,
          width: screen.width,
          height: screen.height,
        }}
      />
    </div>
  );
}
