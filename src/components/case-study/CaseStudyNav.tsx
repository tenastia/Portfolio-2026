import Link from "next/link";

const buttonClass =
  "flex items-center justify-center size-[42px] rounded-[6px] border border-[#2a2a2a] bg-text/[0.02] backdrop-blur-[4px] transition-colors duration-300 hover:bg-text/[0.05]";

export default function CaseStudyNav({ liveUrl }: { liveUrl?: string }) {
  return (
    <div className="fixed z-50 flex gap-[14px] top-3 right-3 md:top-6 md:right-6">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Visit live site"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-web.svg" alt="" className="size-4" />
        </a>
      )}
      <Link href="/" className={buttonClass} aria-label="Back to home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon-arrow.svg" alt="" className="size-[14px]" />
      </Link>
    </div>
  );
}
