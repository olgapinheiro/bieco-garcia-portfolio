import Link from "next/link";
import Footer from "@/components/Footer";

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
      <Footer className="fixed inset-x-0 bottom-0" />
    </div>
  );
}
