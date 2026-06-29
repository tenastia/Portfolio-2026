interface CaseStudyMetaProps {
  title: string;
  year: string;
  categories: string[];
  tools: string[];
  readTime: string;
  /**
   * "dark" for light text over a dark hero (default), "light" for dark text
   * over a light hero, "muted" for uniform muted text with a white-tinted
   * border over a dark hero.
   */
  theme?: "dark" | "light" | "muted";
}

const THEMES = {
  dark: {
    container: "border-[#2a2a2a] bg-text/[0.02] backdrop-blur-[8px]",
    divider: "bg-[#2a2a2a]",
    title: "text-text-muted",
    secondary: "text-text-highlight",
    categories: "text-[rgba(152,152,152,0.7)]",
  },
  muted: {
    container: "border-text/15 bg-text/[0.02] backdrop-blur-[15px]",
    divider: "bg-text/15",
    title: "text-text-muted",
    secondary: "text-text-muted",
    categories: "text-text-muted",
  },
  light: {
    container: "border-black/10 bg-black/[0.02] backdrop-blur-[15px]",
    divider: "bg-black/15",
    title: "text-[#121212]",
    secondary: "text-[rgba(18,18,18,0.65)]",
    categories: "text-[rgba(18,18,18,0.65)]",
  },
} as const;

/**
 * Metadata card pinned to the top-left corner of a case study hero — a glass
 * panel holding the project name/year, categories, tools, and read time in
 * divider-separated columns (per the Figma case study header). The theme adapts
 * the text/border colours to a dark or light hero.
 */
export default function CaseStudyMeta({
  title,
  year,
  categories,
  tools,
  readTime,
  theme = "dark",
}: CaseStudyMetaProps) {
  const t = THEMES[theme];
  const divider = <span aria-hidden className={`self-stretch w-px ${t.divider}`} />;

  return (
    <div
      className={`absolute left-3 top-3 md:left-6 md:top-6 z-10 flex items-start gap-3 md:gap-9 rounded-[8px] border ${t.container} px-3 py-2.5 md:px-9 md:py-5 text-[0.6875rem] leading-[1.45] md:text-body-sm md:leading-body-sm tracking-[0.01em]`}
    >
      <div className="flex flex-col gap-1">
        <span className={`uppercase tracking-[0.06em] ${t.title}`}>{title}</span>
        <span className={t.secondary}>{year}</span>
      </div>
      {divider}
      <div className={`flex flex-col gap-1 ${t.categories}`}>
        {categories.map((c) => (
          <span key={c} className="whitespace-nowrap">
            {c}
          </span>
        ))}
      </div>
      {divider}
      <div className={`flex flex-col gap-1 ${t.secondary}`}>
        {tools.map((t2) => (
          <span key={t2} className="whitespace-nowrap">
            {t2}
          </span>
        ))}
      </div>
      {divider}
      <span className={`${t.secondary} whitespace-nowrap`}>{readTime}</span>
    </div>
  );
}
