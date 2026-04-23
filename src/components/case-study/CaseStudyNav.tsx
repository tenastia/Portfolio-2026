import Link from "next/link";

export default function CaseStudyNav() {
  return (
    <div className="fixed bottom-[clamp(16px,13.029px+0.762vw,24px)] right-[clamp(16px,13.029px+0.762vw,24px)] z-50 flex gap-2">
      <Link
        href="/"
        className="flex items-center justify-center size-[42px] rounded-[6px] bg-surface-glass hover:bg-surface-glass-active transition-colors text-text"
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
