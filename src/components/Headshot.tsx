interface HeadshotProps {
  className?: string;
}

export default function Headshot({ className = "" }: HeadshotProps) {
  return (
    <div
      className={`overflow-hidden rounded-[7px] size-16 bg-[#e0e0e0] shrink-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/headshot.png"
        alt="Nastia Ten"
        className="w-full h-full object-cover pointer-events-none"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}
