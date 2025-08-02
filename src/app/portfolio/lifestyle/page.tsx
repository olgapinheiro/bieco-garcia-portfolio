import Gallery from "@/components/Gallery";
import { getImagesAction } from "@/utils/getImagesAction";
import { Suspense } from "react";

const LifestylePage = () => {
  const imagesArrayPromise = getImagesAction('lifestyle');

  return (
    <main className="grid grid-cols-1 p-8 xs:p-16 gap-4 sm:gap-x-16 sm:gap-y-4 md:gap-x-32">
      <div className="text-xl font-medium text-center md:text-left">lifestyle</div>
      <div className="pb-16">
        <p className="max-w-3xl text-center md:text-left">
          More than spaces, luxury hotels offer curated experiences. These images aim to capture authentic moments of relaxation, service, and connection, conveying the feeling of staying in a place where everything is thoughtfully designed around the guest. It&apos;s not just about the space, but how it feels to live it: inviting the viewer to imagine themselves fully immersed in the experience.
        </p>
      </div>
      <Suspense>
        <Gallery imagesPromise={imagesArrayPromise} directoryName="lifestyle"/>
      </Suspense>
    </main>
  )
}

export default LifestylePage