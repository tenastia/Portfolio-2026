import { projects } from "@/data/projects";
import ContentBlock from "@/components/case-study/ContentBlock";
import CalloutCard from "@/components/case-study/CalloutCard";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  return projects[(idx + 1) % projects.length].slug;
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
            src="/projects/performory/hero.jpg"
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
      <section className="max-w-[53.75rem] mx-auto w-full px-page pt-6">
        <p className="font-sans font-medium text-body-lg leading-body-lg text-text opacity-30">
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

      {/* Image: Two phone mockups */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6 w-full">
        <ImagePlaceholder
          label="Phone mockup 1"
          className="w-[18.75rem] md:w-[17.5rem] aspect-[9/19]"
        />
        <ImagePlaceholder
          label="Phone mockup 2"
          className="w-[18.75rem] md:w-[17.5rem] aspect-[9/19]"
        />
      </section>

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

      {/* Full-bleed image grid */}
      <section className="bg-[#dbdddd] w-full px-page py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[67.5rem] mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <ImagePlaceholder
              key={i}
              label={`Screen ${i + 1}`}
              className="w-full aspect-[240/522]"
            />
          ))}
        </div>
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

      {/* 3-col captioned images */}
      <section className="bg-[#dbdddd] w-full px-page py-9">
        <div className="grid grid-cols-3 gap-5 max-w-[43.75rem] mx-auto">
          {[
            { label: "Library Screen" },
            { label: "Overview Screen" },
            { label: "Practice Screen" },
          ].map((img) => (
            <div
              key={img.label}
              className="flex flex-col gap-4 items-center"
            >
              <ImagePlaceholder
                label={img.label}
                className="w-full aspect-[1206/2622]"
              />
              <span className="font-sans text-body-sm leading-body-sm text-[#777] text-center tracking-[0.01em]">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </section>

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

      {/* 2-col images */}
      <section className="bg-[#dbdddd] w-full px-page py-9">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          <ImagePlaceholder
            label="Context expansion 1"
            className="w-[16.25rem] aspect-[260/409]"
          />
          <ImagePlaceholder
            label="Context expansion 2"
            className="w-[16.25rem] aspect-[260/409]"
          />
        </div>
      </section>

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

      {/* 2-col cropped images */}
      <section className="bg-[#dbdddd] w-full px-page py-9">
        <div className="flex flex-col gap-6 items-center max-w-[43.75rem] mx-auto">
          <ImagePlaceholder
            label="Section selector"
            className="w-full max-w-[18.75rem] aspect-[300/204]"
          />
          <ImagePlaceholder
            label="Section practice"
            className="w-full max-w-[18.75rem] aspect-[300/204]"
          />
        </div>
      </section>

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

      {/* 2-col captioned iterations */}
      <section className="bg-[#dbdddd] w-full px-page py-9">
        <div className="flex flex-col gap-9 items-center">
          {[
            { label: "First Iteration" },
            { label: "Second Iteration" },
          ].map((img) => (
            <div
              key={img.label}
              className="flex flex-col gap-4 items-center"
            >
              <ImagePlaceholder
                label={img.label}
                className="w-[18.75rem] aspect-[300/295]"
              />
              <span className="font-sans text-body-sm leading-body-sm text-[#777] text-center tracking-[0.01em]">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </section>

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

      {/* 2-col vertical phone mockups */}
      <section className="bg-[#dbdddd] w-full px-page py-9">
        <div className="flex flex-col gap-11 items-center">
          <ImagePlaceholder
            label="Scheduling flow 1"
            className="w-[16.25rem] aspect-[260/462] rounded-[12px]"
          />
          <ImagePlaceholder
            label="Scheduling flow 2"
            className="w-[16.25rem] aspect-[260/485] rounded-[12px]"
          />
        </div>
      </section>

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
      {slug === "performory" ? (
        <PerformoryStudy />
      ) : (
        <div className="flex items-center justify-center min-h-dvh">
          <p className="text-body-md text-text-muted">Coming soon</p>
        </div>
      )}
      <CaseStudyNav />
    </main>
  );
}
