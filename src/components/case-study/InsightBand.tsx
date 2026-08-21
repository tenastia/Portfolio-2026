import AmbientField from "./AmbientField";
import Reveal from "./Reveal";

/**
 * The full-bleed band that stops the page on a single finding. Sits darker than
 * the page around it so the research section lands on one sentence before the
 * design work begins.
 */
export default function InsightBand({
  label = "Main insight",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-surface-deep px-page py-32">
      <AmbientField />
      <Reveal className="relative flex max-w-[50rem] flex-col items-center gap-3.5 text-center">
        <p className="text-study-label leading-study-label uppercase tracking-[0.06em] text-text-muted">
          {label}
        </p>
        <p className="font-serif text-study-h3 leading-study-h3 text-text-muted">
          {children}
        </p>
      </Reveal>
    </section>
  );
}
