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
    setModalOpen(!modalOpen)
  }

  return (
    <div>
      {modalOpen &&
        <div
          className='z-10 fixed top-0 left-0 w-full h-full bg-white/95 flex justify-center items-center'
          role="dialog"
          aria-modal="true"
          onClick={handleModal}
        >
          <div className='bg-white shadow-lg m-8'>
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt=""
              style={{ objectFit: 'contain', height: 'auto', width: '100%' }}
            />
            <div className='fixed rounded-full bottom-8 sm:bottom-auto sm:inset-y-8 right-4 sm:right-8 flex items-center px-4 pt-2'>
              <button
                type='button'
                className='h-8 w-8 px-2 text-sm rounded-full bg-white/95 text-black cursor-pointer font-bold border border-gray-300/50'
                onClick={handleModal}
                aria-label="Close image"
              >
                x
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default ImageModal;
