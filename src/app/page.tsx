import NavButton from "@/components/NavButton";
import Eyes from "@/components/Eyes";
import SchemeButton from "@/components/SchemeButton";

export default function Home() {
  return (
    <main className="flex flex-col justify-between min-h-dvh bg-black-800">
      {/* Header */}
      <header className="px-page-mobile md:px-page">
        <div className="flex flex-wrap gap-y-6 md:gap-y-9 items-start justify-between">
          {/* Mobile: navbar first, then bio */}
          <div className="flex items-center justify-between w-full md:hidden">
            <nav className="flex gap-nav items-center">
              <NavButton label="work" />
              <NavButton label="lab" />
              <NavButton label="connect" />
            </nav>
            <Eyes />
          </div>

          {/* Bio */}
          <div className="w-full md:w-[470px]">
            <p className="text-sm md:text-body-md text-white leading-[1.6] md:leading-[28.8px] tracking-[0.18px]">
              I design experiences and interfaces at the intersection of brand
              and digital product. My work ranges from scalable design systems to
              interactive experiences. I have a master&apos;s in piano and
              studied illustration at the British Higher School of
            </p>
          </div>

          {/* Desktop navbar */}
          <nav className="hidden md:flex gap-nav items-center">
            <NavButton label="work" />
            <NavButton label="lab" />
            <NavButton label="connect" />
          </nav>
        </div>
      </header>

      {/* Middle Section */}
      <section className="flex items-center justify-between px-page-mobile md:px-page">
        <div className="flex flex-col font-sans font-normal leading-[28.8px] text-sm md:text-body-md tracking-[0.18px]">
          <span className="text-white-100">Nastia Ten</span>
          <span className="text-white-300">UX/UI Designer</span>
        </div>
        <div className="flex flex-col items-end">
          <SchemeButton color="#121212" isActive />
          <SchemeButton color="#f8f9fA" />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-page-mobile md:px-page">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center text-white-100 text-xs md:text-body-sm leading-6 tracking-[0.15px]">
            <span className="whitespace-nowrap">Status:</span>
            <span>on a look for a watermelon sorbet 🍧 |</span>
          </div>
          <div className="hidden md:block">
            <Eyes />
          </div>
        </div>
      </footer>
    </main>
  );
}
