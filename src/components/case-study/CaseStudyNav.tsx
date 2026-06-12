import Link from "next/link";

export default function CaseStudyNav({ liveUrl }: { liveUrl?: string }) {
  return (
    <div className="fixed z-50 flex gap-2 left-1/2 -translate-x-1/2 top-[80dvh] md:left-auto md:translate-x-0 md:top-auto md:bottom-page md:right-[calc(var(--spacing-page)+14px)]">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center size-[2.625rem] rounded-[6px] bg-surface-glass hover:bg-surface-glass-active transition-colors text-text"
          aria-label="Visit live site"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="7.5" r="6.25" stroke="currentColor" strokeWidth="1.4" />
            <ellipse cx="7.5" cy="7.5" rx="2.75" ry="6.25" stroke="currentColor" strokeWidth="1.4" />
            <line x1="1.25" y1="5" x2="13.75" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="1.25" y1="10" x2="13.75" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </a>
      )}
      <Link
        href="/"
        className="flex items-center justify-center size-[2.625rem] rounded-[6px] bg-surface-glass hover:bg-surface-glass-active transition-colors text-text"
        aria-label="Back to home"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L12 12M12 1L1 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </div>
  );
}
