import Gallery from "@/components/Gallery";
import { getImagesAction } from "@/utils/getImagesAction";
import { Suspense } from "react";

const LandscapeAndWildlifePage = () => {
  const imagesArrayPromise = getImagesAction('destinations');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center md:text-left">landscape & wildlife</div>
      <div className="pb-16">
        <p className="max-w-3xl text-center md:text-left">
          This collection explores the beauty surrounding each property, from expansive landscapes to intimate wildlife moments. Using a combination of ground-level and aerial photography, the images capture the scale, diversity, and unique character of the environment. The goal is to highlight the harmony between nature and hospitality, creating an emotional connection that enhances the narrative of each destination.
        </p>
      </div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="destinations"/>
      </Suspense>
    </main>
  )
}

export default LandscapeAndWildlifePage