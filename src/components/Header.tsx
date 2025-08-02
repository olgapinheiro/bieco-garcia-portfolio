import Link from "next/link";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

export default function Header() {
  return (
    <header className="w-full outline bg-white dark:bg-black flex flex-row gap-4 items-center justify-center p-3">
      <div className="container flex flex-row gap-4 items-center justify-between">
        <div className="flex gap-6 flex-wrap items-center justify-center">
          <Link
            className="flex items-center gap-2 text-xl hover:underline underline-offset-4"
            href="/"
          >
            BIECO GARCIA
          </Link>
        </div>

        <NavDesktop />
        <NavMobile />
      </div>
    </header>
  )
}