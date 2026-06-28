interface CaseStudyMetaProps {
  title: string;
  year: string;
  categories: string[];
  tools: string[];
  readTime: string;
}

function Divider() {
  return <span aria-hidden className="self-stretch w-px bg-[#2a2a2a]" />;
}

/**
 * Metadata card pinned to the top-left corner of a case study hero — a glass
 * panel holding the project name/year, categories, tools, and read time in
 * divider-separated columns (per the Figma case study header).
 */
export default function CaseStudyMeta({
  title,
  year,
  categories,
  tools,
  readTime,
}: CaseStudyMetaProps) {
  return (
    <div className="absolute left-3 top-3 md:left-6 md:top-6 z-10 flex items-start gap-3 md:gap-9 rounded-[8px] border border-[#2a2a2a] bg-text/[0.02] backdrop-blur-[8px] px-3 py-2.5 md:px-9 md:py-5 text-[0.6875rem] leading-[1.45] md:text-body-sm md:leading-body-sm tracking-[0.01em]">
      <div className="flex flex-col gap-1">
        <span className="uppercase tracking-[0.06em] text-text-muted">{title}</span>
        <span className="text-text-highlight">{year}</span>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 text-[rgba(152,152,152,0.7)]">
        {categories.map((c) => (
          <span key={c} className="whitespace-nowrap">
            {c}
          </span>
        ))}
      </div>
      <Divider />
      <div className="flex flex-col gap-1 text-text-highlight">
        {tools.map((t) => (
          <span key={t} className="whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
      <Divider />
      <span className="text-text-highlight whitespace-nowrap">{readTime}</span>
    </div>
  );
}
