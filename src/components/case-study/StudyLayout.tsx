import CaseStudyNav from "./CaseStudyNav";
import StudyRail, { type RailSection } from "./StudyRail";

interface StudyLayoutProps {
  title: string;
  year: string;
  sections: RailSection[];
  liveUrl?: string;
  /**
   * Inset the whole study from the viewport edges. Studies that open on a
   * `StudyHeroCard` need the breathing room; those still opening on a
   * full-bleed `StudyHero` must sit flush to the top.
   */
  inset?: boolean;
  /** Pass through to the rail when the hero behind it is light. */
  scrim?: boolean;
  children: React.ReactNode;
}

/**
 * The frame every case study sits in: a sticky index rail beside the reading
 * column, with full-bleed bands free to break out of it. Below the rail's
 * breakpoint the floating buttons take over navigation, so a study using this
 * layout brings its own navigation and the page must not also render
 * `CaseStudyNav`.
 */
export default function StudyLayout({
  title,
  year,
  sections,
  liveUrl,
  inset = false,
  scrim = false,
  children,
}: StudyLayoutProps) {
  return (
    <div
      className={`relative flex w-full flex-col items-center ${
        inset ? "pb-32 pt-4" : ""
      }`}
    >
      <div className="xl:hidden">
        <CaseStudyNav liveUrl={liveUrl} />
      </div>
      <StudyRail
        title={title}
        year={year}
        sections={sections}
        liveUrl={liveUrl}
        scrim={scrim}
      />
      {children}
    </div>
  );
}
