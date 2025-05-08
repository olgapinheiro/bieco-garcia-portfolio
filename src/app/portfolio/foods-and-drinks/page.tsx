import Gallery from "@/components/Gallery";
import { getImagesAction } from "@/utils/getImagesAction";
import { Suspense } from "react";

const FoodsAndDrinksPage = () => {
  const imagesArrayPromise = getImagesAction('foods-and-drinks');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center">Foods & Drinks</div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="foods-and-drinks"/>
      </Suspense>
    </main>
  )
}

export default FoodsAndDrinksPage