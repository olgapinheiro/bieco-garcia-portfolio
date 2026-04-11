"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    setVisible(window.scrollY >= window.innerHeight / 2);
    const onScroll = () => setVisible(window.scrollY >= window.innerHeight / 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-black flex flex-row gap-4 items-center justify-center py-3 transition-opacity duration-300 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full px-8 xs:px-16 flex flex-row items-center justify-between">
        <div className="flex gap-6 flex-wrap items-center justify-center">
          <Link
            className="flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
            href="/"
          >
            BIECO GARCIA
          </Link>
        </div>

        <NavDesktop />
        <NavMobile />
      </div>
    </header>
  );
}