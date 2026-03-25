export default function Eyes() {
  return (
    <button
      className="backdrop-blur-[8px] bg-glass-strong flex items-center p-2.5 rounded-[6px] cursor-pointer border-none"
      aria-label="Toggle eye tracking"
    >
      <div className="flex gap-[5px] items-center">
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="9" cy="6" rx="9" ry="6" fill="white" fillOpacity="0.9" />
          <circle cx="9" cy="6" r="3.5" fill="#121212" />
        </svg>
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="9" cy="6" rx="9" ry="6" fill="white" fillOpacity="0.9" />
          <circle cx="9" cy="6" r="3.5" fill="#121212" />
        </svg>
      </div>
    </button>
  );
}
