"use client";

import { useScheme } from "./SchemeProvider";

interface SchemeButtonProps {
  color: string;
  scheme: "dark" | "light";
}

export default function SchemeButton({ color, scheme }: SchemeButtonProps) {
  const { scheme: currentScheme, setScheme } = useScheme();
  const isActive = currentScheme === scheme;

  return (
    <button
      onClick={() => setScheme(scheme)}
      className="h-[1.8125rem] relative cursor-pointer border-none bg-transparent p-0"
      aria-label={`Switch to ${scheme} color scheme`}
    >
      <span
        className={`font-sans font-normal leading-body-md text-body-md text-right whitespace-nowrap transition-colors duration-300 ${
          isActive ? "text-button-secondary-active" : "text-text"
        }`}
      >
        {color}
      </span>
    </button>
  );
}
