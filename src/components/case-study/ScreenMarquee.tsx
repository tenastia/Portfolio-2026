import StudyImage from "./StudyImage";

export interface Screen {
  src: string;
  alt: string;
}

/**
 * The finished screens, running edge to edge past the reader. The row is
 * duplicated so the marquee loops seamlessly, and the copy is masked at both
 * edges so screens fade in and out rather than being cut off.
 *
 * Reuses the site's existing `animate-marquee` keyframes, which pause under a
 * reduced-motion preference.
 */
export default function ScreenMarquee({ screens }: { screens: Screen[] }) {
  if (!screens.length) return null;

  const track = [...screens, ...screens];

  return (
    <section
      className="w-full overflow-hidden py-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div className="flex w-max animate-marquee gap-[3.75rem]">
        {track.map(({ src, alt }, i) => (
          <div
            key={`${src}-${i}`}
            className="h-[32.625rem] w-[15rem] shrink-0 overflow-hidden rounded-[16px] border border-border-hover bg-surface-screen"
          >
            <StudyImage
              src={src}
              alt={i < screens.length ? alt : ""}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
