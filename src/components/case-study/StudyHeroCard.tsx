import AmbientField from "./AmbientField";
import StudyImage from "./StudyImage";

interface StudyHeroCardProps {
  src: string;
  alt: string;
  /**
   * Tailwind aspect classes for the card. Defaults to the Figma 1408×574
   * letterbox on desktop, squaring up on phones so the cover art stays legible.
   */
  aspectClass?: string;
  /** Cover the whole card instead of sitting contained inside it. */
  cover?: boolean;
}

/**
 * The 2026 case study hero: an inset rounded card rather than the full-bleed
 * banner the older studies use. The cover art floats on an ambient dark field
 * so the page opens on a framed object instead of an edge-to-edge image.
 */
export default function StudyHeroCard({
  src,
  alt,
  aspectClass = "aspect-[4/3] md:aspect-[1408/574]",
  cover = false,
}: StudyHeroCardProps) {
  return (
    <div className="w-full px-4">
      <div className="relative w-full overflow-hidden rounded-[16px] bg-surface-hero">
        <div className={aspectClass} />
        <AmbientField />
        <StudyImage
          src={src}
          alt={alt}
          className={
            cover
              ? "absolute inset-0 h-full w-full object-cover"
              : "absolute left-1/2 top-1/2 max-h-[95%] w-auto max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain"
          }
        />
      </div>
    </div>
  );
}
