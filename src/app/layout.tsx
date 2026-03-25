import type { Metadata } from "next";
import SchemeProvider from "@/components/SchemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nastia Ten — UX/UI Designer",
  description:
    "I design experiences and interfaces at the intersection of brand and digital product.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SchemeProvider>{children}</SchemeProvider>
      </body>
    </html>
  );
}
