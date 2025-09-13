import Gallery from "@/components/Gallery";
import { getImagesAction } from "@/actions/getImagesAction";
import { Suspense } from "react";

const InsidesPage = () => {
  const imagesArrayPromise = getImagesAction('insides');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center md:text-left">insides</div>
      <div className="pb-16">
        <p className="max-w-3xl text-center md:text-left">
          These interior shots showcase the design and atmosphere of each hotel space, from grand lobbies to intimate suites. The focus is on texture, spatial balance, and ambient lighting — elements that reflect the essence of understated luxury and architectural storytelling.
        </p>
      </div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="insides"/>
      </Suspense>
    </main>
  )
}

export default InsidesPage