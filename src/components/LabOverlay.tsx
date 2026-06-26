"use client";

interface LabOverlayProps {
  isOpen: boolean;
}

export default function LabOverlay({ isOpen }: LabOverlayProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-bg transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="h-full flex flex-col pt-[6.5rem] px-page pb-page">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 flex-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[11px] bg-[#1a1a1a]" />
          ))}
        </div>
      </div>
    </div>
  );
}
