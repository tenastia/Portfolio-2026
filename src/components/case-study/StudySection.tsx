import Reveal from "./Reveal";

interface StudySectionProps {
  /** Anchor target for the sticky rail. Only the first section of a rail
   *  group needs one. */
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A block in the reading column — 880px wide, centred, with the page gutter on
 * narrow screens. Full-bleed bands (`StudyBand`) sit outside this.
 */
export default function StudySection({
  id,
  children,
  className,
}: StudySectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-study px-page ${className || ""}`}
    >
      {children}
    </section>
  );
}

interface StudyProseProps {
  heading?: string;
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Serif section heading over body copy — the recurring text unit of the case
 * study. Centred when the copy introduces a full-width visual, left-aligned
 * when it sits beside one.
 */
export function StudyProse({
  heading,
  children,
  align = "left",
  className,
}: StudyProseProps) {
  const centred = align === "center";

  return (
    <Reveal
      className={`flex flex-col gap-subheading-copy ${
        centred ? "items-center text-center" : "items-start"
      } ${className || ""}`}
    >
      {heading && (
        <h2 className="font-serif text-study-h3 leading-study-h3 text-text-muted">
          {heading}
        </h2>
      )}
      <div className="flex flex-col gap-paragraph text-study-body leading-study-body tracking-[0.01em] text-text-muted">
        {children}
      </div>
    </Reveal>
  );
}

/**
 * Emphasis inside case study copy — the phrases the Figma sets in the medium
 * weight to carry the argument when the page is skimmed.
 */
export function Em({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-text">{children}</strong>;
}
