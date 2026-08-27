export interface SpecChip {
  label: string;
  /** Overrides the icon `SPEC_ICONS` would resolve from the label. */
  icon?: string;
}

/**
 * Chip label → icon. Two families live here: monochrome discipline marks for
 * the Work column, and full-colour tool logos for Stack. Keyed by label so a
 * study only names its disciplines and tools and the icon follows; a label with
 * no entry renders as text, which is the right fallback for an umbrella term
 * like "Adobe Suite" that has no single mark.
 */
const SPEC_ICONS: Record<string, string> = {
  // Disciplines
  "Research & Strategy": "/icon-research.svg",
  "UX Research": "/icon-research.svg",
  "UX | UI": "/icon-ux-ui.svg",
  "Interface Design": "/icon-ux-ui.svg",
  Brand: "/icon-brand.svg",
  "Design System": "/icon-design-system.svg",
  CMS: "/icon-cms.svg",
  "Touchscreen App": "/projects/icons-touch.svg",
  "Web Design": "/projects/icons-web.svg",
  "Motion Design": "/projects/icons-motion.svg",
  // Tools
  Figma: "/icon-figma.svg",
  Illustrator: "/icon-illustrator.svg",
  Photoshop: "/icon-photoshop.svg",
  Sketch: "/icon-sketch.svg",
  Claude: "/icon-claude.svg",
};

interface SpecsCardProps {
  /** Omitted by studies that already carry a Role card of their own. */
  role?: string;
  work: SpecChip[];
  stack: SpecChip[];
  readTime: string;
}

/** A discipline: its mark beside its name. */
function Chip({ label, icon }: SpecChip) {
  const src = icon ?? SPEC_ICONS[label];

  return (
    <span className="flex items-center gap-1.5 rounded-[4px] px-1 py-0.5 text-study-meta leading-study-meta tracking-[0.01em] text-text-muted">
      {src && (
        // Height-locked with the width left to follow: the marks are square but
        // some logos are portrait, and a shared square box would squash them.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-3 w-auto shrink-0" />
      )}
      {label}
    </span>
  );
}

/**
 * A tool: its logo alone in a disc, per the Figma. Each logo renders at its own
 * intrinsic size rather than a shared box — they are drawn to different
 * proportions (Figma is portrait, the Adobe marks are square) and forcing one
 * size would distort them. The name is still exposed to assistive technology
 * and on hover, since the mark is the only thing shown.
 */
function ToolToken({ label, icon }: SpecChip) {
  const src = icon ?? SPEC_ICONS[label];

  if (!src) return <Chip label={label} />;

  return (
    <span
      title={label}
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-text/5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-study-label leading-study-label uppercase tracking-[0.06em] text-text-highlight">
        {label}
      </span>
      {children}
    </div>
  );
}

/**
 * The credits panel that sits under a case study title — role, disciplines,
 * tools, and read time in one glass card. Replaces the meta chip that used to
 * float over the hero, so the facts sit in the reading column with the title.
 */
export default function SpecsCard({
  role,
  work,
  stack,
  readTime,
}: SpecsCardProps) {
  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-x-12 gap-y-6 rounded-[8px] border border-card-border bg-surface-highlight-card p-4 backdrop-blur-[15px]">
      <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
        {role && (
          <Field label="Role">
            <span className="text-study-meta leading-study-meta tracking-[0.01em] text-text-muted">
              {role}
            </span>
          </Field>
        )}
        <Field label="Work">
          <div className="flex flex-wrap items-start gap-3">
            {work.map((chip) => (
              <Chip key={chip.label} {...chip} />
            ))}
          </div>
        </Field>
        <Field label="Stack">
          <div className="flex flex-wrap items-center gap-1.5">
            {stack.map((chip) => (
              <ToolToken key={chip.label} {...chip} />
            ))}
          </div>
        </Field>
      </div>
      <span className="text-study-meta leading-study-meta tracking-[0.01em] text-text-highlight">
        {readTime}
      </span>
    </div>
  );
}
