import Reveal from "./Reveal";

/**
 * A chapter break in the case study — a serif label held between two hairlines.
 * Marks the shift from research into design, and from design into the finished
 * screens.
 */
export default function SectionDivider({
  label,
  id,
}: {
  label: string;
  id?: string;
}) {
  const rule = (
    <span aria-hidden className="h-px min-w-px flex-1 bg-text/10" />
  );

  return (
    <section id={id} className="mx-auto w-full max-w-study px-page">
      <Reveal className="flex items-center gap-12">
        {rule}
        <h2 className="font-serif text-study-title leading-study-title uppercase tracking-[0.04em] text-text-muted">
          {label}
        </h2>
        {rule}
      </Reveal>
    </section>
  );
}
