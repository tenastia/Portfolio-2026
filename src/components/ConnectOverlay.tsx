"use client";

import { useState } from "react";

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

const EMAIL = "ahactacna.teh@gmail.com";

export default function ConnectOverlay({ isOpen }: ConnectOverlayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-bg transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleCopyEmail}
            className={iconLinkClass}
            aria-label="Copy email address"
            tabIndex={isOpen ? 0 : -1}
          >
            <MaskIcon src="/mail-icon.svg" className="size-[1.125rem]" />
          </button>
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
        <span
          className={`font-sans text-body-sm leading-body-sm tracking-[0.01em] text-text transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          copied
        </span>
      </div>
    </div>
  );
}
