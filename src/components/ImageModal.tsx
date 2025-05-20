import Image from 'next/image';
import React from 'react';

const ImageModal = ({
  modalOpen, setModalOpen, imageUrl
}: {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  imageUrl: string
}) => {
  const handleModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      {modalOpen &&
        <div
          className='z-10 fixed top-0 left-0 w-full h-full bg-white/95 dark:bg-black/95 flex justify-center items-center p-8'
          role="dialog"
          aria-modal="true"
          onClick={handleModal}
        >
          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt=""
            className='h-full w-full'
            style={{ objectFit: 'contain', width: '100%'}}
          />
            <button
              type='button'
              className='fixed bottom-8 sm:bottom-auto sm:inset-y-8 right-4 sm:right-8 h-8 w-8 px-2 text-sm rounded-full bg-white/50 dark:bg-black/50 cursor-pointer font-bold border border-gray-300/50'
              onClick={handleModal}
              aria-label="Close image"
            >
              x
            </button>
        </div>
      }

    </div>
  );
};

export default ImageModal;
