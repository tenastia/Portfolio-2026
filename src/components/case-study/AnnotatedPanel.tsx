import Reveal from "./Reveal";

export interface Annotation {
  side: "left" | "right";
  text: string;
}

/**
 * The dotted leader that ties an annotation to the screen it describes: it
 * rises from the outer edge of the text, then runs across to the screen. Drawn
 * with borders so it stretches with the gap instead of pinning to a fixed width.
 */
function Leader({ side }: { side: Annotation["side"] }) {
  const turn = side === "left" ? "left-0" : "right-0";

  return (
    <span aria-hidden className="relative mb-4 hidden h-20 w-full lg:block">
      <span className="absolute inset-x-0 top-0 border-t border-dashed border-text/20" />
      <span
        className={`absolute bottom-0 top-0 border-l border-dashed border-text/20 ${turn}`}
      />
    </span>
  );
}

function AnnotationColumn({ side, text }: Annotation) {
  return (
    <div
      className={`flex flex-col items-start text-left ${
        side === "right" ? "lg:items-end lg:text-right" : ""
      }`}
    >
      <Leader side={side} />
      <p className="text-study-meta leading-study-meta tracking-[0.01em] text-text-highlight lg:max-w-[13.75rem]">
        {text}
      </p>
    </div>
  );
}

interface AnnotatedPanelProps {
  id?: string;
  heading?: string;
  intro?: string;
  /** Where the heading sits relative to the media. */
  headingPosition?: "top" | "overlay-left";
  annotations?: Annotation[];
  children: React.ReactNode;
}

/**
 * A full-width design panel: screens on a raised surface with the reasoning
 * annotated alongside them. On desktop the notes flank the media with dotted
 * leaders pointing in; on narrow screens they stack underneath, where the
 * leaders would only add noise.
 */
export default function AnnotatedPanel({
  id,
  heading,
  intro,
  headingPosition = "top",
  annotations = [],
  children,
}: AnnotatedPanelProps) {
  const left = annotations.filter((a) => a.side === "left");
  const right = annotations.filter((a) => a.side === "right");

  const title = heading && (
    <div
      className={`flex flex-col gap-subheading-copy ${
        headingPosition === "top"
          ? "items-center text-center"
          : "items-start text-left"
      }`}
    >
      <h2 className="font-serif text-study-h3 leading-study-h3 text-text-muted">
        {heading}
      </h2>
      {intro && (
        <p className="max-w-[43rem] text-study-body leading-study-body tracking-[0.01em] text-text-muted">
          {intro}
        </p>
      )}
    </div>
  );

  return (
    <section id={id} className="w-full px-4">
      <Reveal className="flex w-full flex-col items-center gap-12 overflow-hidden rounded-[16px] bg-surface-panel px-page py-16">
        {headingPosition === "top" && title}
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="order-2 lg:order-1">
            {headingPosition === "overlay-left" && (
              <div className="mb-10 lg:mb-16">{title}</div>
            )}
            {left.map((a) => (
              <AnnotationColumn key={a.text} {...a} />
            ))}
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            {children}
          </div>
          <div className="order-3">
            {right.map((a) => (
              <AnnotationColumn key={a.text} {...a} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
