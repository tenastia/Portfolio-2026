"use client";

interface ConnectOverlayProps {
  isOpen: boolean;
}

function EmailIcon() {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="21" height="14" rx="1.5" stroke="currentColor" />
      <path d="M1 1.5L11 8.5L21 1.5" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconLinkClass =
  "flex items-center justify-center size-[2.625rem] rounded-[6px] bg-surface-glass hover:bg-surface-glass-active text-text transition-colors duration-300";

export default function ConnectOverlay({ isOpen }: ConnectOverlayProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-bg transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 items-center">
        <a
          href="mailto:ahactacna.teh@gmail.com"
          className={iconLinkClass}
          aria-label="Send an email"
          tabIndex={isOpen ? 0 : -1}
        >
          <EmailIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/anastasiia-ten"
          target="_blank"
          rel="noopener noreferrer"
          className={iconLinkClass}
          aria-label="LinkedIn profile"
          tabIndex={isOpen ? 0 : -1}
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}
