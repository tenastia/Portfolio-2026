"use client";

import { useState } from "react";

interface NavButtonProps {
  label: string;
  href?: string;
}

export default function NavButton({ label, href = "#" }: NavButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        setIsActive(!isActive);
      }}
      className={`flex items-center justify-center gap-2 rounded-[6px] px-[16px] py-[8px] text-[14px] md:text-[18px] leading-[20.8px] text-white-100 whitespace-nowrap no-underline transition-colors cursor-pointer ${
        isActive
          ? "bg-[rgba(239,239,239,0.3)]"
          : "bg-[rgba(239,239,239,0.15)] hover:bg-[rgba(239,239,239,0.3)]"
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
            stroke="#f8f9fa"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </a>
  );
}
