import type { Metadata } from "next";
import SchemeProvider from "@/components/SchemeProvider";
import JellyfishProvider from "@/components/JellyfishProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nastia Ten — Product & Web Designer",
  description:
    "I design experiences and interfaces at the intersection of brand and digital product.",
  icons: {
    icon: "/headshot-ii.jpg",
    apple: "/headshot-ii.jpg",
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
