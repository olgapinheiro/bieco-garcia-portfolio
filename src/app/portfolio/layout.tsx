import Header from "@/components/Header"
import type { Metadata } from "next";
import "../globals.css";

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
    <>
      {/* Layout UI */}
      {/* Place children where you want to render a page or nested layout */}
      <Header />
      <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
        {children}
      </div>
    </>
  )
}
