"use client";

interface ConnectOverlayProps {
  isOpen: boolean;
}

function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className || ""}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
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
          <MaskIcon src="/mail-icon.svg" className="size-[1.125rem]" />
        </a>
        <a
          href="https://www.linkedin.com/in/anastasiia-ten"
          target="_blank"
          rel="noopener noreferrer"
          className={iconLinkClass}
          aria-label="LinkedIn profile"
          tabIndex={isOpen ? 0 : -1}
        >
          <MaskIcon src="/linkedin-icon.svg" className="w-[1.0625rem] h-[1.125rem]" />
        </a>
      </div>
    </div>
  );
}
