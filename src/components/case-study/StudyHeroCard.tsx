import AmbientField from "./AmbientField";
import StudyImage from "./StudyImage";

interface StudyHeroCardProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the card, e.g. "1408 / 574". */
  aspect: string;
  /** Aspect on phones, where a wide letterbox leaves the art too small. */
  mobileAspect?: string;
  /**
   * Image filling the card behind the artwork. Given one, the card drops its
   * CSS ambient plume — the export carries its own.
   */
  background?: string;
  /** Solid card fill, behind everything. */
  bg?: string;
  video?: boolean;
  /**
   * Sit the artwork inside the card rather than filling it, so the background
   * reads around it.
   */
  contain?: boolean;
  /** Height of contained artwork as a share of the card. */
  containHeight?: string;
}

/**
 * The case study hero: an inset rounded card rather than a full-bleed banner,
 * so the page opens on a framed object with the sticky rail beside it.
 *
 * Artwork either fills the card or sits on a background layer — the second is
 * how the studies share one ambient field while each keeps its own subject.
 */
export default function StudyHeroCard({
  src,
  alt,
  aspect,
  mobileAspect,
  background,
  bg = "var(--color-surface-hero)",
  video = false,
  contain = false,
  containHeight = "74%",
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
          ? "absolute left-1/2 top-1/2 w-auto max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain"
          : "absolute inset-0 h-full w-full object-cover"
      }
      style={contain ? { height: containHeight } : undefined}
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
        {background ? (
          <StudyImage
            src={background}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          contain && <AmbientField />
        )}
        {media}
      </div>
    </div>
  );
}
