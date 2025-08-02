import Gallery from "@/components/Gallery"
import { getImagesAction } from "@/utils/getImagesAction"
import { Suspense } from "react";

const OutsidesPage = () => {
  const imagesArrayPromise = getImagesAction('outsides');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center md:text-left">outsides</div>
      <div className="pb-16">
        <p className="max-w-3xl text-center md:text-left">
          This gallery focuses on capturing the architecture and design concept of each property. Through thoughtful use of natural light and composition, the images highlight how each hotel integrates with its surroundings, revealing the elegance and identity of the space.
        </p>
      </div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="outsides"/>
      </Suspense>
    </main>
  )
}

export default OutsidesPage