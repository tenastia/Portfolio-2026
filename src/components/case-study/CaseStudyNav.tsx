import Link from "next/link";

export default function CaseStudyNav() {
  return (
    <>
      {/* Bio overlay — desktop only, fixed top-left */}
      <p className="hidden md:block fixed top-page left-page z-50 max-w-[27rem] font-sans font-normal text-body-md leading-body-md tracking-[0.01em] text-text pointer-events-none">
        I design experiences and interfaces at the intersection of brand and
        digital product. My work ranges from scalable design systems to
        interactive experiences. I have a master&apos;s in piano and studied
        illustration at the British Higher School of Art and Design. Most
        recently, I&apos;ve been designing at Free Agency Creative and BAM
        Digital.
      </p>

      {/* Footer bar — desktop only, fixed bottom */}
      <footer className="hidden md:flex fixed bottom-0 left-0 right-0 px-page py-[0.875rem] z-50 items-center justify-between pointer-events-none">
        <div className="flex gap-1 items-center font-sans font-normal text-body-sm leading-body-sm tracking-[0.01em] text-text">
          <span className="whitespace-nowrap">status:</span>
          <span>on a look for a watermelon sorbet &#x1F367;</span>
        </div>
        <span className="font-sans font-normal text-body-sm leading-body-sm tracking-[0.01em] text-text opacity-50">
          ©All rights reserved 2025
        </span>
      </footer>

      {/* Close button — fixed bottom-right */}
      <div className="fixed bottom-page right-page z-50 flex gap-2">
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
    </>
  );
}
