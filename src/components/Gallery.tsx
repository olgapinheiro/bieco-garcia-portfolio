'use client'
import { ImageArray } from "@/utils/getImagesAction";
import { use } from "react";
import ImageTrigger from "./ImageTrigger";


export default function Gallery({ imagesPromise, directoryName }: {imagesPromise: Promise<ImageArray>, directoryName: string}) {
  const images = use(imagesPromise)

  return (
    <div className="xs:columns-2 sm:columns-3">
      {images?.blobs && images.blobs.map((image) => {
        return (
          <ImageTrigger key={image.pathname} image={image} directoryName={directoryName} />
        )
      })}
    </div>
  )
}