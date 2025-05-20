import Link from "next/link";

export default function Home() {
  return (
    <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
      <main className="fixed min-h-full w-full">
        <Link href="/portfolio">
          {/* <!-- Background image --> */}
          <div
            className="h-screen bg-center bg-cover bg-no-repeat bg-[url(/outsides/2-thewestinportodegalinhas.webp)]"></div>
          {/* <!-- Background image --> */}
        </Link>
      </main>
      <footer className="bg-white dark:bg-black fixed inset-x-0 bottom-0 flex gap-[24px] flex-wrap items-center justify-center py-4">
        <Link
          className="flex items-center gap-2 font-bold text-2xl hover:underline underline-offset-4"
          href="/about"
        >
          BIECO GARCIA
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
          href="/portfolio"
        >
          PHOTOGRAPHER PORTFOLIO
        </Link>
      </footer>
    </div>
  );
}
