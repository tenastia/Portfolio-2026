import CaseStudyNav from "./CaseStudyNav";
import StudyRail, { type RailSection } from "./StudyRail";

interface StudyLayoutProps {
  title: string;
  year: string;
  sections: RailSection[];
  liveUrl?: string;
  children: React.ReactNode;
}

/**
 * The frame every 2026 case study sits in: a sticky index rail beside a centred
 * reading column, with full-bleed bands free to break out of it. Below the
 * rail's breakpoint the floating buttons take over navigation.
 */
export default function StudyLayout({
  title,
  year,
  sections,
  liveUrl,
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
      />
      {children}
    </div>
  );
}
