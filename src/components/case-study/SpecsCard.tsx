export interface SpecChip {
  label: string;
  /** Optional icon exported alongside the case study assets. */
  icon?: string;
}

interface SpecsCardProps {
  role: string;
  work: SpecChip[];
  stack: SpecChip[];
  readTime: string;
}

function Chip({ label, icon }: SpecChip) {
  return (
    <span className="flex items-center gap-1.5 rounded-[4px] px-1 py-0.5 text-study-meta leading-study-meta tracking-[0.01em] text-text-muted">
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" className="size-3 shrink-0" />
      )}
      {label}
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
        <Field label="Role">
          <span className="text-study-meta leading-study-meta tracking-[0.01em] text-text-muted">
            {role}
          </span>
        </Field>
        <Field label="Work">
          <div className="flex flex-wrap items-start gap-3">
            {work.map((chip) => (
              <Chip key={chip.label} {...chip} />
            ))}
          </div>
        </Field>
        <Field label="Stack">
          <div className="flex flex-wrap items-start gap-3">
            {stack.map((chip) => (
              <Chip key={chip.label} {...chip} />
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
