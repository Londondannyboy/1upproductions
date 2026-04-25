import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "1UP Productions — Live broadcast specialists",
  description: "Award-winning broadcast production company. LEC Finals, LoL Worlds, VCT Champions, Top Gear, UFC, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${interTight.variable}`}>
        {children}
      </body>
    </html>
  );
}