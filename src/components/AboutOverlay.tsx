"use client";

interface AboutOverlayProps {
  isOpen: boolean;
}

export default function AboutOverlay({ isOpen }: AboutOverlayProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-bg overflow-y-auto transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="px-page pt-[6.5rem] pb-[4rem] max-w-[43.75rem]">
        <p className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text mb-paragraph">
          I&apos;m a product designer working at the intersection of brand
          identity and digital product systems. Based in Vancouver, BC.
        </p>
        <p className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text mb-paragraph pl-[2.25rem]">
          I approach design as a discipline of clarity — finding the structure
          underneath complex problems and building systems that hold up as they
          scale. Whether I&apos;m building a design system, designing a product
          flow, or solving a spatial interface challenge, the work stays grounded
          in research, craft, and the actual humans using it.
        </p>
        <p className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text pl-[2.25rem]">
          Before design, I trained as a classical pianist. That background still
          shapes how I think: attention to structure, sensitivity to phrasing, and
          care for how individual moments add up to something coherent.
        </p>
      </div>
    </div>
  );
}
