import type { Metadata } from "next";
import { Caveat, Cormorant_Garamond, DM_Mono, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });
const handwriting = Caveat({ variable: "--font-handwriting", subsets: ["latin"], weight: ["500"], display: "swap" });

export const metadata: Metadata = {
  title: "Fossil Hunters in UK",
  description: "We collect fossils, and memories too. 21 个英国化石地点与从伦敦出发的路线。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} ${handwriting.variable}`}>{children}</body>
    </html>
  );
}
