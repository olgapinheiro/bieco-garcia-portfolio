import Header from "@/components/Header"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIECO GARCIA - Portfolio",
  description: "Photographer",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <Header />
        <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
          {children}
        </div>
      </body>
    </html>
  )
}
