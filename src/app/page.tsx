import Link from "next/link";

export default function Home() {
  return (
    <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
      <main className="fixed min-h-full w-full">
        <Link href="/portfolio">
          {/* <!-- Background image --> */}
          <div
            className="h-screen bg-center bg-cover bg-no-repeat hover:bg-blend-darken transition-all duration-700 ease-in-out bg-[url(/outsides/2-thewestinportodegalinhas.webp)]"></div>
          {/* <!-- Background image --> */}
        </Link>
      </main>
    </div>
  );
}
