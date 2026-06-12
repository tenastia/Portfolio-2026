import { projects } from "@/data/projects";
import ContentBlock from "@/components/case-study/ContentBlock";
import CalloutCard from "@/components/case-study/CalloutCard";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function StudyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <section className="w-full px-page py-10 flex justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto ${className || "max-w-[43.75rem]"}`}
      />
    </section>
  );
}

function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#2a2a2a] rounded-[18px] overflow-hidden flex items-center justify-center ${className || ""}`}
    >
      <span className="text-caption text-white/20 text-center px-2">
        {label}
      </span>
    </div>
  );
}

function getNextProjectSlug(currentSlug: string): string {
  const caseStudies = projects.filter((p) => !p.externalUrl);
  const idx = caseStudies.findIndex((p) => p.slug === currentSlug);
  return caseStudies[(idx + 1) % caseStudies.length].slug;
}

function CenturyGroupStudy() {
  const nextSlug = getNextProjectSlug("century-group");

  return (
    <>
      {/* Hero */}
      <section className="px-page pt-page">
        <div className="relative w-full aspect-[1404/990] rounded-[8px] overflow-hidden bg-[#0e0f10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/century-group/cg-hero-image.png"
            alt="Century Group"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Metadata */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-content-block-y">
        <div className="flex justify-between text-body-md leading-body-md tracking-[0.01em] text-[rgba(152,152,152,0.7)]">
          <div className="flex gap-8">
            <div className="flex flex-col gap-0.5">
              <span>Design System</span>
              <span>Interface Design</span>
              <span>Responsive Design</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span>Figma</span>
              <span>Adobe Suite</span>
              <span>Claude</span>
            </div>
          </div>
          <span className="whitespace-nowrap">~ 5 mins read</span>
        </div>
      </section>

      {/* Title */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-[64px] md:pt-[128px]">
        <h1 className="font-sans font-medium text-body-lg leading-body-lg text-text-highlight">
          Building a scalable design system for a multidivisional real-estate developer
        </h1>
      </section>

      {/* Role + Outcome */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-content-block-y">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Role",
              body: "Design system lead. I owned the component architecture, the brand application across the site, the responsive behaviour, and the token pipeline.",
            },
            {
              label: "Scope",
              body: "A centralized design system that gives Century Group one foundation to scale their portfolio and business verticals on.",
            },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="border border-[#4e4e4f] rounded-[16px] px-7 py-7 flex flex-col gap-2"
            >
              <span className="font-sans text-body-md leading-body-md text-text-muted">
                {label}
              </span>
              <p className="font-sans text-body-md leading-body-md text-text opacity-50">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Context */}
      <ContentBlock heading="The Context">
        <p>
          Century Group is a multidivisional real estate developer. The portfolio
          was growing across businesses and projects, but the digital foundation
          had been built one screen at a time, with no shared base. As the company
          grew, the existing digital infrastructure struggled to adapt.
        </p>
        <p>
          The brand drifted. Without a single source of truth, the site grew
          visually and functionally inconsistent, which affected the brand
          presence and user experience.
        </p>
        <p>
          Lack of scalability. Every new property type or vertical meant breaking
          layouts and heavy dev work, so getting new pages or sections live took
          longer than the business wanted.
        </p>
        <p>
          No reusable components. The absence of reusable, modular components
          slowed time to market for new projects and made global updates hard to
          execute cleanly.
        </p>
      </ContentBlock>

      {/* Building a Scalable System */}
      <ContentBlock heading="Building a Scalable System">
        <p className="font-medium">
          Less is more. Bringing structure and hierarchy to the website.
        </p>
        <p>
          One of the first steps toward a scalable system was deciding which
          elements to consolidate, which to add to the new site, and which to
          retire.
        </p>
        <p>
          I started with the button styles and introduced three main types. The
          Primary button carries the main CTA on a page. Secondary buttons move
          the user to the next page, step, or action. The Tertiary button sits on
          image cards and smaller actions further down the hierarchy.
        </p>
        <p>
          That replaced the one-off button approach the site had before and gave
          us a consistent navigation system.
        </p>
        <p>
          The component library grew further once I added other interactive UI
          elements such as dropdowns, filtering chips, and icon buttons. These
          gave the product a full set of interactive parts to use across the
          website.
        </p>
      </ContentBlock>

      {/* Button system image */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
        <ImagePlaceholder
          label="Button system & UI components"
          className="w-full aspect-[823/413]"
        />
      </section>

      {/* Cards */}
      <ContentBlock>
        <p className="font-medium">Cards: one structure, any data</p>
        <p>
          With the cards, I found that their variety in the old design was driven
          by content. News cards, project cards, approach cards, and business
          cards all carried different fields. I broke the existing cards down to
          their common denominators and built a small suite that holds a strict
          underlying grid no matter what data gets plugged in.
        </p>
      </ContentBlock>

      {/* Cards video */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
        <video
          src="/projects/century-group/cards-motion.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-[18px]"
        />
      </section>

      {/* AI / Claude section */}
      <ContentBlock heading="Where did AI help the most">
        <p>
          A substantial design system isn&apos;t complete without a clear
          guideline for using it. That was where I brought Claude Code into the
          process. To document my component library from scratch, I built a
          Component-Spec Skill that guided Claude through reading Figma components
          and writing the finished documentation into the file.
        </p>
      </ContentBlock>

      {/* Claude skill image */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
        <video
          src="/projects/century-group/claude-skill-img.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-[18px]"
        />
      </section>

      <ContentBlock>
        <p>
          The result gave me a solid starting point. I still had to remove the
          irrelevant and repetitive specifications Claude produced and shape the
          document around my library, but it saved hours of work up front.
        </p>
      </ContentBlock>

      <ContentBlock heading="Documentation is ready, what's next?">
        <p>
          A design system is a fluid construct that shifts and evolves over time.
          Every one of those changes has to reach the documentation, which is the
          area design teams overlook the most. To keep the documentation current,
          I set up a specific Routine inside Claude Code that runs each time the
          design system changes.
        </p>
        <p>This kept a mundane but necessary part of the process running in the background, with supervision.</p>
      </ContentBlock>

      {/* Claude routine image */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/century-group/claude-routine-img.png"
          alt="Claude Code routine"
          className="w-full rounded-[18px]"
        />
      </section>

      {/* Documentation output video */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
        <video
          src="/projects/century-group/documentation-img.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full rounded-[18px]"
        />
      </section>

      {/* Colour wayfinding */}
      <ContentBlock heading="Colour as the wayfinding system">
        <p>
          The real challenge arrived with the brand handoff. It came with a large,
          highly vibrant colour palette that had to stand in as the new Century
          Group identity. Paired with the goal of a clean corporate look, balancing
          that palette became the hard part.
        </p>
        <p>
          Instead of treating the palette as decoration, I gave it a job. I
          assigned one anchor colour to each major section of the site — Main,
          Businesses, Projects, and About — and used it as a functional wayfinding
          system. As users move through the site, the subtle colour shift acts as
          a quiet anchor that tells them where they are.
        </p>
      </ContentBlock>

      {/* Colour wayfinding — marquee */}
      <section className="w-full overflow-hidden pb-content-block-y">
        <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
          {[...Array(2)].flatMap((_, setIdx) =>
            [1, 2, 3, 4].map((n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${setIdx}-${n}`}
                src={`/projects/century-group/marquee-${n}.png`}
                alt=""
                className="h-[160px] md:h-[224px] aspect-[398/224] object-cover rounded-[11px] shrink-0"
              />
            ))
          )}
        </div>
      </section>

      <ContentBlock heading="Tradeoffs I had to make around this decision">
        <p>
          One was accessibility, specifically how colourblind users rely on the
          navigation. So the wayfinding colour always rides alongside a redundant
          cue such as the location label.
        </p>
        <p>
          The other obstacle was that the UI elements had to be adapted for each
          colour scheme, which in this case meant four separate themes. This was
          where I had to revisit the wayfinding approach and discuss a
          single-theme design with the client. A one-theme route would have been
          simpler, but the colour differentiation wasn&apos;t something the client
          wanted to give up.
        </p>
      </ContentBlock>

      {/* Token cascade */}
      <ContentBlock heading="The engine: tokens that cascade">
        <p>
          The wayfinding logic could only scale if it was wired to tokens.
          Hard-coded values would have become a nightmare in the shipping phase, so
          I built the whole system around something the design and dev teams could
          share.
        </p>
        <p>The system consists of four main Variable Collections:</p>
        <p>
          Brand. This collection lists the primitive tokens such as colour hexes,
          typefaces and their variations, and the base scale.
        </p>
        <p>
          Alias. This group sets out the general roles and intent of the brand
          primitives, including error, information, primary, secondary, and
          thematic colours.
        </p>
        <p>
          Mapped. These tokens are the ones assigned to the components. Here I
          tied the alias roles to the specific scenarios where each token should
          be used.
        </p>
        <p>
          Responsive. This collection carries all the typographic values across
          desktop, tablet, and mobile viewports.
        </p>
        <p>
          With this setup the design team can update any value in minutes instead
          of changing it in every instance.
        </p>
      </ContentBlock>

      {/* Token collection image — scrollable */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pb-content-block-y">
        <div className="w-full h-[260px] md:h-[413px] rounded-[8px] bg-[#202020] overflow-hidden">
          <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="pt-[113px] pb-16 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/century-group/tokens-collection.png"
                alt="Token collection overview"
                className="w-[56%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Token cascade image */}
      <StudyImage
        src="/projects/century-group/token-cascade-img.png"
        alt="Token cascade diagram"
      />

      <ContentBlock>
        <p>
          For the dev handoff, the Mapped and Responsive collections were set to
          be exported to TypeScript and placed on GitHub for the developers to
          pick up and maintain. Our internal team had never worked this way before,
          since past projects used much simpler libraries, and bringing this method
          into our process was my initiative to reduce friction between the teams.
          Everything was ready to run this way when, at the very last minute, I
          had to quietly hand the design off to a vendor and had little chance to
          work with them on any new workflows.
        </p>
      </ContentBlock>

      {/* Results */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page py-content-block-y">
        <h3 className="font-sans font-normal text-h2 leading-h2 tracking-[0.03em] text-text mb-8">
          What we achieved in this redesign session
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Built a scalable design system that the Century Group team can now adapt for their growing portfolio.",
            "Consolidated at least 10 ad-hoc elements like cards and button styles into a set of token-driven and hierarchy-structured components spanning all states.",
            "The system now absorbs 5 business verticals and 11 projects without a redesign — directly addressing the scalability gap.",
            "Global brand or colour changes that were previously hours of manual edits now cascade from a single token in a few minutes.",
            "Tokenized system bridged the gap between design and engineering, significantly reducing friction and handoff time between the teams.",
          ].map((text, i) => (
            <div
              key={i}
              className="border border-[#4e4e4f] rounded-[16px] px-7 py-7"
            >
              <p className="font-sans text-body-md leading-body-md text-text">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reflections */}
      <ContentBlock heading="Reflections">
        <p>
          Next time I&apos;d validate the wayfinding idea with users. The logic
          held up on paper and had clear design reasoning behind it, but a quick
          unmoderated test would have either confirmed the anchor effect or shown
          me the cue needed to be more explicit.
        </p>
        <p>
          I&apos;d also rework the token setup to cut down the number of mapped
          tokens. Right now the mapped collection holds a separate value for the
          buttons in each theme. I&apos;d treat the four colour schemes as themes
          and split them one tier earlier by using modes in Figma variables. That
          would collapse four tokens into one, so{" "}
          <code className="font-mono text-sm">--surface-button-ochre</code>,{" "}
          <code className="font-mono text-sm">--surface-button-clay</code>,{" "}
          <code className="font-mono text-sm">--surface-button-ocean</code>, and{" "}
          <code className="font-mono text-sm">--surface-button-bark</code> all
          become <code className="font-mono text-sm">--surface-button</code>.
        </p>
      </ContentBlock>

      {/* Next Project */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page py-4 pb-content-block-y">
        <Link
          href={`/project/${nextSlug}`}
          className="inline-flex gap-4 items-center bg-surface-glass hover:bg-surface-glass-active rounded-[6px] px-6 py-[1.125rem] transition-colors"
        >
          <span className="font-sans text-button leading-button text-text whitespace-nowrap">
            next project
          </span>
          <div className="w-12 h-px bg-text" />
        </Link>
      </section>
    </>
  );
}

function AviaryStudy() {
  const nextSlug = getNextProjectSlug("aviary");

  return (
    <>
      {/* Hero */}
      <section className="px-page pt-page">
        <div className="relative w-full aspect-[1404/990] rounded-[8px] overflow-hidden bg-[#1a1a1a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/aviary/aviary-hero-image.png"
            alt="Aviary"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Metadata */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-content-block-y">
        <div className="flex justify-between text-body-md leading-body-md tracking-[0.01em] text-[rgba(152,152,152,0.7)]">
          <div className="flex gap-8">
            <div className="flex flex-col gap-0.5">
              <span>Interactive Kiosk</span>
              <span>Interface Design</span>
              <span>Responsive Design</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span>Figma</span>
              <span>Adobe Suite</span>
            </div>
          </div>
          <span className="whitespace-nowrap">~ 3 mins read</span>
        </div>
      </section>

      {/* Title */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-[64px] md:pt-[128px]">
        <h1 className="font-sans font-medium text-body-lg leading-body-lg text-text-highlight">
          Designing a multi-platform digital experience for Aviary Living
        </h1>
      </section>

      {/* Role + Scope */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-content-block-y">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "Role",
              body: "I owned the product and interaction design while a development team built the front end and a brand team supplied the identity.",
            },
            {
              label: "Scope",
              body: "Multiplatform user experience design across a responsive web app and an interactive sales gallery touchscreen.",
            },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="border border-[#4e4e4f] rounded-[16px] px-7 py-7 flex flex-col gap-2"
            >
              <span className="font-sans text-body-md leading-body-md text-text-muted">
                {label}
              </span>
              <p className="font-sans text-body-md leading-body-md text-text opacity-50">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Context */}
      <ContentBlock heading="The Context">
        <p>Aviary needed two digital products at once, and they could not behave the same way.</p>
        <p>
          The web app was something people would meet on their own devices,
          leaning in to read about the lifestyle and the community at their own
          pace. The touchscreen was a physical product, a large interactive kiosk
          recessed into a wall of the sales gallery, where prospective buyers
          would walk up and explore floorplans, the site plan, features, and the
          surrounding neighbourhood in a few quick minutes.
        </p>
      </ContentBlock>

      {/* Full-width kiosk GIF */}
      <section className="w-full px-page pb-content-block-y">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/aviary/aviary-image-1.gif"
          alt="Aviary kiosk interface"
          className="w-full h-auto rounded-[8px]"
        />
      </section>

      {/* The Constraint */}
      <ContentBlock heading="The Constraint that Shaped the Approach">
        <p>
          I designed the touchscreen without ever touching the hardware. The unit
          was not available during the design phase, so there was no way to stand
          in front of it, reach for a control, or sense the comfortable zones.
        </p>
        <p>
          So I built the next best thing. I taped the full outline of the screen
          onto the wall at its planned mounting height and stood in front of it.
          How high the top edge sat, how far the reach ran across, and what a
          shorter or seated visitor could comfortably touch stopped being guesses
          and became things we could feel.
        </p>
      </ContentBlock>

      <StudyImage
        src="/projects/aviary/aviary-image-2.png"
        alt="Taped screen outline on wall"
        className="max-w-[53.75rem]"
      />

      {/* The Process */}
      <ContentBlock heading="The Process">
        <p className="font-medium">Reading the room before the screen</p>
        <p>
          Before laying out a single frame, I gathered the physical
          specifications of where the kiosk would live. I established the
          mounting height, how deeply the unit would sit recessed into the wall,
          and the lighting conditions of the space, including how close it sat to
          windows that could throw glare and reflection across the display.
        </p>
        <p className="font-medium">Designing the navigation around reach</p>
        <p>
          The navigation went through several iterations, and each one failed for
          a reason rooted in the body rather than the screen.
        </p>
        <p>
          The first version used a dropdown for the primary menu to conserve
          space, with a secondary navigation across the top, borrowing a familiar
          desktop pattern. It looked clean, but a menu placed that high sits out
          of reach for shorter visitors and anyone seated, so it failed on reach.
        </p>
        <p>
          The second version moved the secondary navigation to the bottom to
          bring it within reach of everyone. That solved height, but it collided
          with the hardware. Because the unit was recessed rather than surface
          mounted, the lip of the wall sat in front of the lower edge of the
          screen, physically blocking any control placed there.
        </p>
      </ContentBlock>

      <StudyImage
        src="/projects/aviary/aviary-image-3.png"
        alt="First and second navigation iterations"
        className="max-w-[53.75rem]"
      />

      <ContentBlock>
        <p>
          The final version resolved both problems at once. I consolidated the
          primary and secondary navigation into a single vertical menu anchored
          to the right of the screen, in the band that stays within comfortable
          reach regardless of a visitor's height and clear of the recessed wall
          edge. One stable, reachable navigation system replaced two competing
          ones.
        </p>
      </ContentBlock>

      <StudyImage
        src="/projects/aviary/aviary-image-4.png"
        alt="Final navigation design"
        className="max-w-[53.75rem]"
      />

      {/* The same assets */}
      <ContentBlock heading="The same assets, reauthored for each screen">
        <p>
          The web app and the touchscreen drew on the same set of assets. I knew
          from the start that a layout built for a screen you walk up to would
          never be the right answer on one you hold in your hand, and that was
          the interesting part of the work. The same maps, floorplans, and
          components had to be reauthored rather than resized, so each feature
          suited the way its screen is actually used.
        </p>
        <p>
          The interactive map for selecting units was a centrepiece on the kiosk,
          where the large display gave it room to breathe, and it worked just as
          well on the desktop web view. On a narrow, vertical phone screen it did
          not. There the same map became cramped and awkward to operate, so on
          mobile I moved to a carousel of unit floorplans that a thumb could move
          through comfortably.
        </p>
        <p>
          The community map followed the same logic in reverse. On the large
          kiosk, points of interest risked sitting too high to reach and the
          underlying material was hard to parse at a glance, so I paired the map
          with an interactive list that kept every destination accessible within
          the reachable zone. On mobile, where the constraint was small targets
          rather than height, I leaned on tappable markers sized for a fingertip.
        </p>
      </ContentBlock>

      <StudyImage
        src="/projects/aviary/aviary-image-5.png"
        alt="Interactive siteplan"
        className="max-w-[53.75rem]"
      />

      <StudyImage
        src="/projects/aviary/aviary-image-6.png"
        alt="Community map"
        className="max-w-[53.75rem]"
      />

      {/* Final Product */}
      <ContentBlock heading="Final Product">
        <p>
          The real test came at launch, the first time anyone stood in front of
          the finished unit. The design held. Every call I had made from a taped
          outline on a wall — the menu on the right, the reachable zones, the
          reauthored maps — worked on hardware. The kiosk did its job in the
          sales gallery, and Aviary went on to be named a finalist for Best
          Project Identity at the Georgie Awards.
        </p>
      </ContentBlock>

      {/* Reflections */}
      <ContentBlock heading="Reflections">
        <p>
          If I designed Aviary again, I would treat the touchscreen as an
          extension of the whole presentation centre rather than a single place
          where a visitor explores everything. The first version tried to do both
          jobs at once, carrying the lifestyle story alongside the floorplans and
          the map.
        </p>
        <p>
          The centre already tells that story, and tells it better than a screen
          can. Its walls carry lifestyle imagery of the community and interior
          renders. The touchscreen does not need to repeat any of it. So I would
          push the storytelling to the background and make the kiosk a purely
          functional engine, with floorplan browsing and the interactive map as
          its entire purpose, the two things a visitor cannot get just by looking
          around the room.
        </p>
        <p>
          The second change is about proportion. Designing a large touchscreen on
          a fifteen inch laptop is quietly misleading. Imagery that looks right on
          the laptop can turn out so large on the installed screen that a visitor
          has to step back to take it in, and type that reads cleanly at desk
          distance can be too thin to hold up on a lower resolution touchscreen.
          Testing on the actual hardware is ideal, but when that is not possible,
          printing the interface at full size and standing in front of it catches
          most of these problems before they ship.
        </p>
      </ContentBlock>

      {/* Next Project */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page py-4 pb-content-block-y">
        <Link
          href={`/project/${nextSlug}`}
          className="inline-flex gap-4 items-center bg-surface-glass hover:bg-surface-glass-active rounded-[6px] px-6 py-[1.125rem] transition-colors"
        >
          <span className="font-sans text-button leading-button text-text whitespace-nowrap">
            next project
          </span>
          <div className="w-12 h-px bg-text" />
        </Link>
      </section>
    </>
  );
}

function PerformoryStudy() {
  const nextSlug = getNextProjectSlug("performory");

  return (
    <>
      {/* Hero */}
      <section className="px-page pt-page">
        <div className="relative w-full aspect-[1404/990] rounded-[8px] overflow-hidden bg-[#1a1a1a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/performory/performory-hero-img.png"
            alt="Performory"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Metadata */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-content-block-y">
        <div className="flex justify-between text-body-md leading-body-md tracking-[0.01em] text-[rgba(152,152,152,0.7)]">
          <div className="flex gap-8">
            <div className="flex flex-col gap-0.5">
              <span>UX Research</span>
              <span>Interface Design</span>
              <span>Brand</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span>Figma</span>
              <span>Adobe Suite</span>
              <span>Chat GPT</span>
              <span>Midjourney</span>
            </div>
          </div>
          <span className="whitespace-nowrap">~ 5 mins read</span>
        </div>
      </section>

      {/* Tagline */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-[64px] md:pt-[128px]">
        <p className="font-sans font-medium text-body-lg leading-body-lg text-text-highlight">
          A practice platform for musicians who struggle with memory lapses and
          confidence under pressure.
        </p>
      </section>

      {/* Section 1 */}
      <ContentBlock heading="The Overture: How It Began">
        <p>
          This project started with the question: why do musicians lose
          confidence on stage when they need it most?
        </p>
        <p>
          Coming from a music background, this matter felt personal to me.
          I&apos;ve seen how someone can be highly disciplined, well-prepared,
          and technically strong, and yet still face stage fright and have their
          confidence collapse at the most important moments.
        </p>
        <p>
          That pushed me to look deeper into the problem and study stage fright
          not only as an emotional response, but as a system of multiple
          triggers.
        </p>
      </ContentBlock>

      {/* Image: Overview screens */}
      <StudyImage
        src="/projects/performory/overview-img.png"
        alt="Performory overview and events screens"
        className="max-w-[34rem]"
      />

      {/* Section 2 */}
      <ContentBlock heading="Diving Deeper Into the Problem">
        <p>
          To ground the project, I interviewed five musicians and used affinity
          mapping to understand what actually sits underneath stage fright.
        </p>
        <p>
          The strongest pattern was that performance anxiety was rarely just
          about fear on its own. More often, it was tied to a loss of trust in
          preparation—especially when musicians felt unsure about memory, recall,
          and readiness under pressure. Themes like perfectionism, memorization,
          support, self-awareness, responsibility, and performance frequency kept
          showing up across interviews, which made the problem feel both
          emotional and behavioural at the same time.
        </p>
        <p>
          That shifted how I framed the opportunity. Instead of designing for a
          broad topic like performance anxiety among musicians, I pivoted to
          something more tangible: musicians lacked a structured way to prepare
          material and build confidence before a performance.
        </p>
      </ContentBlock>

      {/* Callout */}
      <CalloutCard>
        Memorization emerged as the clearest product entry point at this stage.
        Research suggested that what often breaks down on stage is not effort,
        but reliable recall. That made memorization a functional problem, not
        just a practice habit, and shaped the direction of the product.
      </CalloutCard>

      {/* All screens — full bleed */}
      <section className="w-full py-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/performory/all-screens-img.png"
          alt="Performory app screens"
          className="w-full h-auto"
        />
      </section>

      {/* Section 3 */}
      <ContentBlock heading="The Game Plan">
        <p>
          During research, I noticed a recurring pattern in how musicians
          responded to memory slips: when they forgot a part, they usually went
          back to the beginning of the piece or restarted from a familiar
          section. While this pattern seems to be a natural instinct, this
          behaviour keeps reinforcing the parts they already know best, while
          weaker transitions and less stable passages stay relatively untouched.
        </p>
        <p>
          That became the thinking behind Performory&apos;s core memorization
          exercise. If the real challenge in performance is being able to recover
          when memory breaks, then practice should train that skill directly. So,
          the app shows a random bar from the piece and asks the musician to
          continue from that point entirely from memory.
        </p>
        <p>
          The goal of the exercise was to shift memorization away from passive
          repetition and closer to the reality of performance, where recall
          rarely arrives in a neat, predictable order.
        </p>
      </ContentBlock>

      {/* Library / Overview / Practice screens */}
      <StudyImage
        src="/projects/performory/the-game-plan-img.png"
        alt="Library, Overview and Practice screens"
      />

      {/* Section 4 */}
      <ContentBlock heading="Giving Just Enough Help">
        <p>Early testing revealed a predictable failure point.</p>
        <p>
          If a musician couldn&apos;t recognize a single random bar, they either
          had to skip multiple prompts in a row or abandon the session
          altogether. Very quickly, the experience started to feel like failure
          instead of practice.
        </p>
        <p>
          To make that interaction more usable, I introduced a controlled support
          mechanism: users can now expand the prompt from one bar to two or three
          bars, depending on how much context they need. This kept the recall
          exercise intact but made it less punishing. Instead of turning a
          difficult moment into a dead end, it gave users a way back in.
        </p>
        <p>
          That small adjustment changed the tone of the interaction quite a bit.
          The challenge stayed there, but the experience became more supportive
          and flexible, which encouraged more people in the testing group to
          finish the exercise.
        </p>
      </ContentBlock>

      {/* Context expansion screens */}
      <StudyImage
        src="/projects/performory/govong-help-img.png"
        alt="Memorization prompt with adjustable bar context"
      />

      {/* Section 5 */}
      <ContentBlock heading="Taming the Monster: Making Long Pieces Manageable">
        <p>
          For more advanced musicians working with long-form
          repertoire—concertos, symphonies, and other multi-movement works that
          can take up to 100+ pages of music—this technique posed a challenge
          with the volume of practice material. Practicing those pieces through
          fully random fragments started to feel overwhelming very quickly.
          Sessions became scattered, and the work felt endless instead of
          directional.
        </p>
        <p>
          To solve that, I introduced sectioning and a section selector before
          each practice session. Instead of approaching a long piece as one giant
          block of work, users can choose which section or sections they want to
          focus on—or practice the whole piece. This added structure without
          making the flow rigid.
        </p>
        <p>
          In later testing, sectioning even small pieces helped to make practice
          more intentional and structured. It gave musicians a more systematic
          and strategic way of working, while still keeping the overall
          experience flexible.
        </p>
      </ContentBlock>

      {/* Section selector for long pieces */}
      <StudyImage
        src="/projects/performory/long-pieces-img.png"
        alt="Section selector for long pieces"
      />

      {/* Section 6 */}
      <ContentBlock heading="Setting the Tempo: Pacing the Preparation">
        <p>
          In interviews, musicians didn&apos;t describe stage fright as
          something that suddenly appears out of nowhere. More often, it built up
          during preparation. A recurring trigger was the combination of time
          pressure and uncertainty—not knowing if they were on track, how much
          work was left, or whether they had enough time for the piece to sink
          into memory.
        </p>
        <p>
          To help musicians stay on track with their preparations, I introduced a
          goal-setting flow where users could assign a piece to a specific event.
          Although, in testing, that worked only when someone already had a
          concrete event to prepare for. Otherwise, it felt too limiting, so I
          shifted the flow.
        </p>
      </ContentBlock>

      {/* Goal-setting flow iterations */}
      <StudyImage
        src="/projects/performory/gradual-skill-builder.png"
        alt="First and second iterations of the goal-setting flow"
      />

      {/* Section 7 — body only (no heading) */}
      <ContentBlock>
        <p>
          Instead of making events the center of the system, I moved toward a
          more flexible setup: users can choose to set a date for memorizing a
          piece, and then turn that deadline into a practice schedule with days,
          times, and optional notifications. The app also uses the timeline and
          piece size to recommend a realistic frequency, so scheduling becomes
          part of the preparation system rather than just a calendar add-on.
        </p>
        <p>
          This made progress feel more measurable, lowered uncertainty, and
          helped users build confidence through consistency.
        </p>
      </ContentBlock>

      {/* Scheduling flow */}
      <StudyImage
        src="/projects/performory/calendar-img.png"
        alt="Date selection and practice scheduling screens"
      />

      {/* Section 8 — bullet list */}
      <ContentBlock heading="The Next Movement: What I'd Improve">
        <ul className="list-disc ml-[1.3125rem] flex flex-col gap-paragraph">
          <li>
            <span>
              Growing the Audience by Introducing More Techniques
              <br />
              From my research, I learned that different musicians rely on
              different memorization techniques. Even though the technique picked
              for this stage was universal, broadening the variety of techniques
              to accommodate the specific needs of different kinds of musicians
              would be a key step in growing the platform&apos;s audience.
            </span>
          </li>
          <li>
            <span>
              Differentiating the Musician Segment Further
              <br />
              &ldquo;Musicians&rdquo; is already a much stronger focus than
              &ldquo;all performers that experience stage fright,&rdquo; but
              it&apos;s still quite broad to use the same technique for all.
              <br />
              The next level would be narrowing the audience further—for example,
              instrumentalists, vocalists, or advanced students preparing for
              recitals. A tighter segment would make the product more specific
              and stronger.
            </span>
          </li>
          <li>
            <span>
              Testing Whether the Platform Feels Comprehensive in Practice
              <br />
              The overall strategy is to manage stage fright indirectly through
              preparation, structure, and memory work.
              <br />
              That logic makes sense, but I&apos;d want to validate whether
              users actually experience the product as one coherent support
              system in practice, rather than as a set of useful features living
              next to each other.
            </span>
          </li>
        </ul>
      </ContentBlock>

      {/* Section 9 */}
      <ContentBlock heading="Coda: Final Thoughts">
        <p>
          There were many possible directions this concept could have taken—
          mental health support, habit formation, or educational content that
          would predictably lead me to create another meditation platform curated
          exclusively for musicians. Researching the problem from different
          angles allowed me to look deeper below the surface issues and uncover
          the stronger problem I chose to focus on.
        </p>
        <p>
          What I still think works best in this project is the framing. It takes
          an emotional problem and translates it into something design can
          actually affect in a meaningful way.
        </p>
        <p>
          Performory is a concept project, but it reflects the kind of product
          thinking I care about most: starting with a real human tension, finding
          the behavioural layer underneath it, and designing a system that
          creates emotional value by being genuinely useful.
        </p>
      </ContentBlock>

      {/* Next Project */}
      <section className="max-w-[53.75rem] mx-auto w-full px-page py-4 pb-content-block-y">
        <Link
          href={`/project/${nextSlug}`}
          className="inline-flex gap-4 items-center bg-surface-glass hover:bg-surface-glass-active rounded-[6px] px-6 py-[1.125rem] transition-colors"
        >
          <span className="font-sans text-button leading-button text-text whitespace-nowrap">
            next project
          </span>
          <div className="w-12 h-px bg-text" />
        </Link>
      </section>
    </>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return (
      <main className="min-h-dvh bg-bg flex items-center justify-center">
        <p className="text-body-md text-text-muted">Project not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-bg">
      {slug === "century-group" ? (
        <CenturyGroupStudy />
      ) : slug === "performory" ? (
        <PerformoryStudy />
      ) : slug === "aviary" ? (
        <AviaryStudy />
      ) : (
        <div className="flex items-center justify-center min-h-dvh">
          <p className="text-body-md text-text-muted">Coming soon</p>
        </div>
      )}
      <CaseStudyNav liveUrl={project.liveUrl} />
    </main>
  );
}
