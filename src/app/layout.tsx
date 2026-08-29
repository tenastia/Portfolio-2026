import type { Metadata } from "next";
import SchemeProvider from "@/components/SchemeProvider";
import JellyfishProvider from "@/components/JellyfishProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nastia Ten — Product & Web Designer",
  description:
    "I design experiences and interfaces at the intersection of brand and digital product.",
  icons: {
    // A #050990 disc — the brand colour, and the one the drawn avatar is
    // already painted on. The SVG's ground is transparent so it takes the
    // browser's own tab colour; Apple composites over black instead, where a
    // navy this dark would disappear, so that tile carries its own white.
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SchemeProvider>
          <JellyfishProvider>{children}</JellyfishProvider>
        </SchemeProvider>
      </body>
    </html>
  );
}
