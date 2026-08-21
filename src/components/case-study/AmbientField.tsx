/**
 * The soft plume of light that sits behind the Performory hero and the main
 * insight band — a cluster of overlapping blurred ellipses in the Figma file,
 * rebuilt here as layered radial gradients so it scales with the container
 * instead of shipping a fixed-size raster.
 */
export default function AmbientField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className || ""}`}
      style={{
        backgroundImage: [
          "radial-gradient(62% 96% at 26% 12%, rgba(248,249,250,0.055) 0%, rgba(248,249,250,0) 62%)",
          "radial-gradient(42% 66% at 4% 46%, rgba(248,249,250,0.04) 0%, rgba(248,249,250,0) 60%)",
          "radial-gradient(46% 74% at 62% 78%, rgba(248,249,250,0.05) 0%, rgba(248,249,250,0) 64%)",
          "radial-gradient(14% 26% at 54% 88%, rgba(248,249,250,0.06) 0%, rgba(248,249,250,0) 66%)",
          "radial-gradient(10% 18% at 12% 74%, rgba(248,249,250,0.045) 0%, rgba(248,249,250,0) 68%)",
        ].join(", "),
      }}
    />
  );
}
