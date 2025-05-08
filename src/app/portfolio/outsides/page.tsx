import Gallery from "@/components/Gallery"
import { getImagesAction } from "@/utils/getImagesAction"
import { Suspense } from "react";

const OutsidesPage = () => {
  const imagesArrayPromise = getImagesAction('outsides');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center">Outsides</div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="outsides"/>
      </Suspense>
    </main>
  )
}

export default OutsidesPage