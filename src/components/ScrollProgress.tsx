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
      className={`flex flex-col justify-between h-[57px] ${
        align === "right" ? "items-end" : "items-start"
      }`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-px transition-all duration-300 ${
            i === active ? "w-[52px] bg-text/60" : "w-[29px] bg-text/20"
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
      className={`pointer-events-none fixed inset-0 z-40 hidden md:flex items-center justify-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-full max-w-[52rem] flex justify-between px-6">
        <Lines active={active} total={total} align="left" />
        <Lines active={active} total={total} align="right" />
      </div>
    </div>
  );
}
