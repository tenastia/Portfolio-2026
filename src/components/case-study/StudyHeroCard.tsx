import AmbientField from "./AmbientField";
import StudyImage from "./StudyImage";

interface StudyHeroCardProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the card, e.g. "1408 / 574". */
  aspect: string;
  /** Aspect on phones, where a wide letterbox leaves the art too small. */
  mobileAspect?: string;
  /** Card fill behind the art. */
  bg?: string;
  video?: boolean;
  /**
   * Sit the art inside the card rather than filling it. For cover art that is
   * already composed on its own backdrop — a device floating on a dark field —
   * so the card's ambient plume shows around it.
   */
  contain?: boolean;
}

/**
 * The case study hero: an inset rounded card rather than a full-bleed banner,
 * so the page opens on a framed object with the sticky rail beside it.
 */
export default function StudyHeroCard({
  src,
  alt,
  aspect,
  mobileAspect,
  bg = "var(--color-surface-hero)",
  video = false,
  contain = false,
}: StudyHeroCardProps) {
  const media = video ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label={alt}
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : (
    <StudyImage
      src={src}
      alt={alt}
      className={
        contain
          ? "absolute left-1/2 top-1/2 max-h-[95%] w-auto max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain"
          : "absolute inset-0 h-full w-full object-cover"
      }
    />
  );

  return (
    <div className="w-full px-4">
      <div
        className="relative w-full overflow-hidden rounded-[16px]"
        style={{ background: bg }}
      >
        {mobileAspect && (
          <div className="md:hidden" style={{ aspectRatio: mobileAspect }} />
        )}
        <div
          className={mobileAspect ? "hidden md:block" : ""}
          style={{ aspectRatio: aspect }}
        />
        {contain && <AmbientField />}
        {media}
      </div>
    </div>
  );
}
