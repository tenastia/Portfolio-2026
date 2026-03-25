interface SchemeButtonProps {
  color: string;
  isActive?: boolean;
}

export default function SchemeButton({
  color,
  isActive = false,
}: SchemeButtonProps) {
  return (
    <button
      className="h-[29px] relative cursor-pointer border-none bg-transparent p-0"
      aria-label={`Switch to ${color} color scheme`}
    >
      <span
        className={`font-sans font-normal leading-[28.8px] text-sm md:text-button text-right whitespace-nowrap ${
          isActive
            ? "text-button-secondary-active"
            : "text-white-100"
        }`}
      >
        {color}
      </span>
    </button>
  );
}
