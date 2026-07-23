"use client";

import { useState } from "react";

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
  "flex items-center justify-center size-[2.625rem] rounded-[6px] bg-surface-glass hover:bg-surface-glass-active text-text-muted hover:text-text transition-colors duration-300";

const EMAIL = "ahactacna.teh@gmail.com";

export default function ContactButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4 items-center">
        <button
          onClick={handleCopyEmail}
          className={iconLinkClass}
          aria-label="Copy email address"
        >
          <MaskIcon src="/mail-icon.svg" className="w-[21px] h-[15px]" />
        </button>
        <a
          href="https://www.linkedin.com/in/anastasiia-ten"
          target="_blank"
          rel="noopener noreferrer"
          className={iconLinkClass}
          aria-label="LinkedIn profile"
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
  );
}
