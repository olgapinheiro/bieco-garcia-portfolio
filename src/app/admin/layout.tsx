import Footer from "@/components/Footer"
import type { Metadata } from "next";
import "../globals.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


export const metadata: Metadata = {
  title: "BIECO GARCIA - Admin",
  description: "International photographer specializing in luxury hospitality, architecture, and food photography worldwide.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      {/* Layout UI */}
      <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
        <SignedIn>
          <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-medium text-center md:text-left flex items-center gap-4">
                Admin Panel
              </div>
              <div className="flex justify-end">
                <UserButton />
              </div>
            </div>
          {children}
          </main>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        </div>
        <Footer />
    </ClerkProvider>
  )
}
