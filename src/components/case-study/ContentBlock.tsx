/**
 * A text block in a case study: an optional serif section heading, an optional
 * sans subheading for a sub-part of that section, then the copy. Type follows
 * the same three-level scale as the rest of the 2026 studies — serif for
 * headings, sans for everything the reader actually reads through.
 */
interface ContentBlockProps {
  /** Anchor target for the sticky rail. */
  id?: string;
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
}

export default function ContentBlock({
  id,
  heading,
  subheading,
  children,
}: ContentBlockProps) {
  return (
    <section
      id={id}
      className="content-block max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y"
    >
      <div className="flex flex-col gap-subheading-copy">
        {(heading || subheading) && (
          <div className="flex flex-col gap-1">
            {heading && (
              <h2 className="font-serif text-study-h3 leading-study-h3 text-text-muted">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="font-sans font-medium text-study-h4 leading-study-h4 text-text-highlight">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-paragraph font-sans font-normal text-study-body leading-study-body tracking-[0.01em] text-text-muted">
          {children}
        </div>
      </div>
    </section>
  );
}
