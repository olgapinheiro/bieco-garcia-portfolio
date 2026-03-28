import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";

const ImageTrigger = ({
  image,
  directoryName,
  onClick,
}: {
  image: ListBlobResultBlob
  directoryName: string
  onClick: () => void
}) => {
  if (image.pathname.endsWith(`${directoryName}/`)) return null

  return (
    <button
      className="relative w-full h-auto mb-8 gap-8 z-0 cursor-pointer"
      type="button"
      onClick={onClick}
      aria-label="Open image in modal"
    >
      <Image
        src={image.url}
        width={500}
        height={500}
        alt={`Gallery image from ${directoryName}`}
        style={{ objectFit: 'contain', height: 'auto', width: '100%' }}
      />
    </button>
  )
}

export default ImageTrigger
