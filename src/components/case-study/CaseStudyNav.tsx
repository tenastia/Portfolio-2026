import Link from "next/link";

const btnClass =
  "flex items-center justify-center size-[42px] rounded-[6px] bg-surface-glass hover:bg-surface-glass-active backdrop-blur-[4px] transition-colors text-text";

export default function CaseStudyNav({ liveUrl }: { liveUrl?: string }) {
  return (
    <div className="fixed z-50 flex gap-[14px] left-1/2 -translate-x-1/2 top-[80dvh] md:left-auto md:translate-x-0 md:top-auto md:bottom-page md:right-[calc(var(--spacing-page)+14px)]">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={btnClass}
          aria-label="Visit live site"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1" />
            <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="1.5" y1="10.5" x2="14.5" y2="10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </a>
      )}
      <Link href="/" className={btnClass} aria-label="Back to home">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1L9 11M9 1L1 11"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </div>
  );
}
