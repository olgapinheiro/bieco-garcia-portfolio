import Link from "next/link";

export default function Header() {
  return (
    <header className="outline bg-white dark:bg-black flex items-center justify-center py-4">
      <Link
        className="flex items-center gap-2 font-bold text-4xl"
        href="/portfolio"
      >
        BIECO GARCIA
      </Link>
    </header>
  )
}