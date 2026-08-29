import CaseStudyNav from "./CaseStudyNav";
import StudyRail, { type RailSection } from "./StudyRail";

interface StudyLayoutProps {
  title: string;
  year: string;
  sections: RailSection[];
  liveUrl?: string;
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
  scrim = false,
  children,
}: StudyLayoutProps) {
  return (
    <div className="relative flex w-full flex-col items-center pb-32 pt-4">
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
