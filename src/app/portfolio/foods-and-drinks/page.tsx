import Gallery from "@/components/Gallery";
import { getImagesAction } from "@/utils/getImagesAction";
import { Suspense } from "react";

const FoodsAndDrinksPage = () => {
  const imagesArrayPromise = getImagesAction('foods-and-drinks');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center md:text-left">foods & drinks</div>
      <div className="pb-16">
        <p className="max-w-3xl text-center md:text-left">
          This collection highlights the sensory of high-end gastronomy through carefully styled compositions. Each image is designed to enhance the shine, texture, and color of the food, making it look more appetizing and inviting. The goal is to evoke not just taste, but the full dining experience.
        </p>
        <p className="max-w-3xl text-center md:text-left">
          High-quality food photography can increase interest and sales, with studies showing it can boost meal orders by up to 30% in hotels and restaurants.
        </p>
      </div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="foods-and-drinks"/>
      </Suspense>
    </main>
  )
}

export default FoodsAndDrinksPage