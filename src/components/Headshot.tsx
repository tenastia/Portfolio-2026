interface HeadshotProps {
  className?: string;
}

export default function Headshot({ className = "" }: HeadshotProps) {
  return (
    <div
      className={`overflow-hidden rounded-[36px] border border-[rgba(248,249,250,0.3)] size-16 bg-[#e0e0e0] shrink-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/headshot-ii.jpg"
        alt="Nastia Ten"
        className="w-full h-full object-cover pointer-events-none"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}
