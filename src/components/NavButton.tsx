"use client";

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
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`flex items-center justify-center gap-2 rounded-[6px] px-button-x py-button-y text-body-md leading-body-md text-text whitespace-nowrap no-underline transition-colors cursor-pointer ${
        isActive
          ? "bg-surface-glass-active"
          : "bg-surface-glass hover:bg-surface-glass-active"
      }`}
    >
      {label}
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
  );
}
