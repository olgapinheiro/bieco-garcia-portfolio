'use client'
import { ImageArray } from "@/utils/getImagesAction";
import Image from "next/image";
import { use } from "react";

export default function Gallery({ imagesPromise, directoryName }: {imagesPromise: Promise<ImageArray>, directoryName: string}) {
  const images = use(imagesPromise)

  return (
    <div className="xs:columns-2 sm:columns-3">
      {images?.blobs && images.blobs.map((image) => {
        if (image.pathname.endsWith(`${directoryName}/`)) return null
        return (
          <div key={image.pathname} className="relative w-full h-auto mb-8 gap-8">
            <Image
              src={image.url}
              width={500}
              height={500}
              alt=""
              style={{ objectFit: 'contain', height: 'auto', width: '100%' }}
            />
          </div>
        )
      })}
    </div>
  )
}