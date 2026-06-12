"use client";

// Per-character float timing — varied durations and delays for organic randomness
const CHAR_FLOAT = [
  { dur: "3.2s", delay: "0s" },
  { dur: "2.8s", delay: "0.45s" },
  { dur: "3.6s", delay: "0.2s" },
  { dur: "3.0s", delay: "0.75s" },
  { dur: "2.5s", delay: "0.3s" },
  { dur: "3.8s", delay: "0.15s" },
  { dur: "2.9s", delay: "0.6s" },
];

interface NavButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}

export default function NavButton({
  label,
  isActive = false,
  onClick,
  href = "#",
}: NavButtonProps) {
  return (
    <div className="relative rounded-[6px] p-px group/btn">
      {/* Default border — fades out on hover/active */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-[6px] border border-[#2a2a2a] transition-opacity duration-300 ${
          isActive ? "opacity-0" : "group-hover/btn:opacity-0"
        }`}
        aria-hidden
      />
      {/* Circling glow ring — fades in on hover/active */}
      <span
        className={`nav-btn-glow-ring pointer-events-none absolute inset-0 rounded-[6px] transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover/btn:opacity-100"
        }`}
        aria-hidden
      />
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className={`relative flex items-center justify-center gap-2 rounded-[5px] px-button-x py-button-y text-body-md leading-body-md text-text whitespace-nowrap no-underline cursor-pointer transition-colors ${
          isActive
            ? "bg-surface-glass-active"
            : "bg-surface-glass hover:bg-surface-glass-active"
        }`}
      >
        <span className="flex">
          {label.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                animation: `letter-float ${CHAR_FLOAT[i % CHAR_FLOAT.length].dur} ease-in-out infinite`,
                animationDelay: CHAR_FLOAT[i % CHAR_FLOAT.length].delay,
                willChange: "transform",
              }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
        {isActive && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </a>
    </div>
  );
}
