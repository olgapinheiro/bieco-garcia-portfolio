'use client'
import { ImageArray } from "@/actions/getImagesAction";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import ImageTrigger from "./ImageTrigger";
import ImageModal from "./ImageModal";


export default function Gallery({ imagesPromise, directoryName }: { imagesPromise: Promise<ImageArray>, directoryName: string }) {
  const images = use(imagesPromise)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const imageUrls = useMemo(
    () =>
      images?.blobs
        ?.filter((blob) => !blob.pathname.endsWith(`${directoryName}/`))
        .map((blob) => blob.url) ?? [],
    [images, directoryName]
  )

  useEffect(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev >= imageUrls.length ? null : prev
    )
  }, [imageUrls.length])

  const handleOpen = useCallback((index: number) => setSelectedIndex(index), [])
  const handleClose = useCallback(() => setSelectedIndex(null), [])
  const handlePrev = useCallback(() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const handleNext = useCallback(
    () => setSelectedIndex((i) => (i !== null && i < imageUrls.length - 1 ? i + 1 : i)),
    [imageUrls.length]
  )

  return (
    <>
      <div className="xs:columns-2 sm:columns-3">
        {images?.blobs &&
          images.blobs
            .filter((blob) => !blob.pathname.endsWith(`${directoryName}/`))
            .map((image, index) => (
              <ImageTrigger
                key={image.pathname}
                image={image}
                directoryName={directoryName}
                onClick={() => handleOpen(index)}
              />
            ))}
      </div>

      <ImageModal
        imageUrls={imageUrls}
        selectedIndex={selectedIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  )
}
