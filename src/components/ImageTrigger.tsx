import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

const ImageTrigger = ({ image, directoryName }: { image: ListBlobResultBlob, directoryName: string }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (image.pathname.endsWith(`${directoryName}/`)) return null

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <button
        className="relative w-full h-auto mb-8 gap-8 z-0 cursor-pointer"
        type="button"
        onClick={handleModal}
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
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        imageUrl={image.url}
      />
    </>
  )
}

export default ImageTrigger