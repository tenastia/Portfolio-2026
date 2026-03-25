interface NavButtonProps {
  label: string;
  href?: string;
}

export default function NavButton({ label, href = "#" }: NavButtonProps) {
  return (
    <a
      href={href}
      className="backdrop-blur-[2px] bg-glass flex items-center justify-center px-4 py-2 rounded-[6px] text-white-100 text-sm md:text-button leading-[20.8px] whitespace-nowrap no-underline transition-colors hover:bg-glass-strong"
    >
      {label}
    </a>
  );
}
