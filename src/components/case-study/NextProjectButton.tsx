import Link from "next/link";

/**
 * The link out of a case study into the next one. Resting state is the plain
 * bordered pill from the Figma; hover lights the site's rotating glow ring, the
 * same treatment the home page nav buttons use.
 */
export default function NextProjectButton({ slug }: { slug: string }) {
  return (
    <section className="mx-auto w-full max-w-study px-page">
      <div className="nav-btn-wrapper group/btn relative inline-flex overflow-hidden rounded-[6px] p-px">
        <span
          className="nav-btn-glow-ring opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-[6px] border border-card-border transition-opacity duration-500 group-hover/btn:opacity-0"
          aria-hidden
        />
        <Link
          href={`/project/${slug}`}
          className="relative z-10 whitespace-nowrap rounded-[5px] bg-bg px-6 py-[0.875rem] font-sans text-study-body leading-study-body text-text-muted no-underline"
        >
          next project
        </Link>
      </div>
    </section>
  );
}
