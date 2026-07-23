interface ScrollProgressProps {
  /** Index of the project currently in view */
  active: number;
  total: number;
  /** Shown only while scrolling through the projects */
  visible: boolean;
}

function Lines({
  active,
  total,
  align,
}: {
  active: number;
  total: number;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col justify-between h-[57px] w-[52px] ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-px transition-all duration-300 ${
            i === active
              ? "w-[52px] bg-btn-glow shadow-[0_0_6px_var(--color-btn-glow)]"
              : "w-[29px] bg-text/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function ScrollProgress({ active, total, visible }: ScrollProgressProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-40 hidden lg:flex items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Matches the project card width so the indicators track the card edges;
          each group hangs 100px outside the card so it never bleeds in. */}
      <div className="relative w-full max-w-[42.75rem]">
        <div className="absolute right-full mr-[100px] top-1/2 -translate-y-1/2">
          <Lines active={active} total={total} align="left" />
        </div>
        <div className="absolute left-full ml-[100px] top-1/2 -translate-y-1/2">
          <Lines active={active} total={total} align="right" />
        </div>
      </div>
    </div>
  );
}
