"use client";

const paragraphs = [
  "I grew up in Moscow, where I became an artist and a musician. Music was my first language for a long time. I earned a master's degree in academic piano and music theory, won and placed in international competitions, and toured Europe with concerts. For more than twelve years I taught piano and worked as an accompanist, with students from four to forty, and I grew especially drawn to early musical development and to what music education can offer children with ADHD. Twenty two years in music taught me to shape sound into experience, to think in systems, and to watch people closely, noticing how they learn and where they get stuck.",
  "When I was ready for something new, I studied illustration at the British Higher School of Art and Design and published my own children's book. After graduation I asked myself a question. What did I want to make next, and how could I bring my artistic side together with the interest in human behaviour and psychology that twelve years of teaching had left me with.",
  "I chose design as the place those threads met, and I made that move alongside my move from Moscow to Vancouver. The city is where I took my first real steps in interactive design, finding my footing in the fast moving agency scene, designing alongside other designers to build digital experiences for real estate developers.",
  "Away from the screen, my best ideas still arrive when I improvise at the piano. I have a cat named Mia who crossed the Atlantic with me and taught me how to lie on the bed, belly up, and enjoy doing nothing at all. On hard days I brew coffee and do yoga, because small slow things bring me back fastest. On good days I make things, from music to interactive experiences, and reach for something I have never tried before.",
];

interface AboutOverlayProps {
  isOpen: boolean;
}

export default function AboutOverlay({ isOpen }: AboutOverlayProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      {/* Desktop: scrollable overlay, bio in a narrow left-aligned column */}
      <div className="hidden md:flex flex-col h-full overflow-y-auto pt-[9rem] px-page pb-[7rem]">
        <div className="flex flex-col gap-paragraph max-w-[43.56rem]">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text"
            >
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Mobile: header + nav visible above (z-60), bio in a bounded scroll area */}
      <div className="md:hidden flex flex-col h-full">
        {/* Spacer matching the combined header + mobile-nav height */}
        <div className="shrink-0 h-[9.5rem]" />
        {/* Contained scrollable bio — flex-1 + min-h-0 keeps it bounded */}
        <div className="flex-1 min-h-0 overflow-y-auto px-page">
          <div className="flex flex-col gap-paragraph py-[1.125rem]">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="font-sans text-body-md leading-body-md tracking-[0.01em] text-text"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
        {/* Spacer matching footer height so bio doesn't run behind it */}
        <div className="shrink-0 h-[5rem]" />
      </div>
    </div>
  );
}
