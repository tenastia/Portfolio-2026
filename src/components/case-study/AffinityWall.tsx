/** Seconds per loop for each column, so the drift never lines up into a grid. */
const COLUMN_DURATIONS = [72, 88, 64, 96, 80, 68];

function Note({ text }: { text: string }) {
  return (
    <div className="relative flex min-h-[3.7rem] w-full flex-col rounded-[3px] bg-surface-note p-[0.31rem] drop-shadow-[0.5px_1px_0.75px_rgba(0,0,0,0.24)]">
      <span
        aria-hidden
        className="absolute left-1/2 top-[0.06rem] h-[0.125rem] w-[0.62rem] -translate-x-1/2 rounded-[0.25px] bg-white/10"
      />
      <p className="text-[0.1875rem] leading-[0.25rem] break-words text-[#2b2d2f]">
        {text}
      </p>
    </div>
  );
}

/**
 * The affinity-mapping wall from discovery, drifting slowly behind a clipped
 * panel. Each column repeats its notes twice so the loop is seamless, and
 * alternating columns run in reverse so the wall reads as a living board rather
 * than a scrolling list.
 *
 * Decorative: the notes are 3px in the Figma and unreadable by design, so the
 * whole panel is hidden from assistive technology and the findings that matter
 * are set in the copy beside it.
 */
export default function AffinityWall({ columns }: { columns: string[][] }) {
  return (
    <div
      aria-hidden
      className="relative h-[23.06rem] w-full max-w-[25.75rem] shrink-0 overflow-hidden rounded-[8px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
      }}
    >
      {columns.map((notes, i) => (
        <div
          key={i}
          className="absolute top-0 w-[3.7rem]"
          style={{ left: `${0.5 + i * 4.21}rem` }}
        >
          <div
            className={`flex flex-col gap-2 ${
              i % 2 ? "animate-note-drift animate-note-drift--reverse" : "animate-note-drift"
            }`}
            style={{ ["--drift-dur" as string]: `${COLUMN_DURATIONS[i % COLUMN_DURATIONS.length]}s` }}
          >
            {[...notes, ...notes].map((text, j) => (
              <Note key={j} text={text} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
