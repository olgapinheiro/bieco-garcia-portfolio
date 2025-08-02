import Footer from "@/components/Footer"
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "BIECO GARCIA - Portfolio",
  description: "International photographer specializing in luxury hospitality, architecture, and food & beverage photography available worldwide.",
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
      {children}
      <Footer />
    </>
  )
}
