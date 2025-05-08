import Link from "next/link";

export default function Home() {
  return (
    <div className="static grid min-h-full p-0 gap-0 font-[family-name:var(--font-geist-sans)]">
      <main className="fixed min-h-full w-full">
        {/* <!-- Background image --> */}
        <div
          className="h-screen bg-center bg-cover bg-no-repeat bg-[url(/outsides/2-thewestinportodegalinhas.webp)]"></div>
        {/* <!-- Background image --> */}
      </main>
      <footer className="bg-white fixed inset-x-0 bottom-0 flex gap-[24px] flex-wrap items-center justify-center py-4">
        <div
          className="flex items-center gap-2 font-bold text-2xl"
        >
          BIECO GARCIA
        </div>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm"
          href="/portfolio"
        >
          PORTFÓLIO DE FOTOGRAFIA<br />
          PARA O SETOR DE HOTELARIA
        </Link>
      </footer>
    </div>
  );
}
