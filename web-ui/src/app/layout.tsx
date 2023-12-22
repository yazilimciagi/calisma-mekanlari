import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Çalışma Mekanları",
  description: "Şehrinizdeki çalışma mekanlarını gösteren web uygulaması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={fontSans.variable}>{children}</body>
    </html>
  );
}
