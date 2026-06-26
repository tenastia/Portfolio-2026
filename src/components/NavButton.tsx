"use client";

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
    <div
      className={`nav-btn-wrapper relative rounded-[6px] p-px overflow-hidden group/btn${
        isActive ? " nav-btn--active" : ""
      }`}
    >
      {/* Rotating glow — visible on hover and always on when active */}
      <span
        className={`nav-btn-glow-ring transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0 group-hover/btn:opacity-100"
        }`}
        aria-hidden
      />
      {/* Default static border — fades out on hover/active */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-[6px] border border-[#2a2a2a] transition-opacity duration-500 ${
          isActive ? "opacity-0" : "group-hover/btn:opacity-0"
        }`}
        aria-hidden
      />
      {/* 2% opacity fill + backdrop blur creates a glass panel over the glow ring */}
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className="relative z-10 flex items-center justify-center gap-2 rounded-[5px] bg-text/[0.02] backdrop-blur-[8px] px-button-x py-button-y text-body-md leading-body-md text-text whitespace-nowrap no-underline cursor-pointer"
      >
        <span className="flex">
          {label.split("").map((char, i) => (
            <span
              key={i}
              className="nav-btn-char"
              style={{
                "--char-dur": CHAR_FLOAT[i % CHAR_FLOAT.length].dur,
                "--char-delay": CHAR_FLOAT[i % CHAR_FLOAT.length].delay,
              } as React.CSSProperties}
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
