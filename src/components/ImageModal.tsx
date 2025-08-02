import Image from 'next/image';
import React from 'react';
import { XmarkIcon } from './icons';

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
          className='z-10 fixed top-0 left-0 size-full max-h-svh bg-white/98 dark:bg-black/98 flex flex-col justify-center items-center p-0 cursor-pointer'
          role="dialog"
          aria-modal="true"
          tabIndex={0}
          onClick={handleModal}
          onKeyDown={(e) => { if (e.key.toLowerCase() === 'escape') handleModal() }}
        >
          <div className="w-full flex flex-row justify-end p-4">
            <button
              type='button'
              onClick={handleModal}
              aria-label="Close image"
              className="hover:opacity-70 focus:opacity-70 transition-opacity cursor-pointer"
            >
              <XmarkIcon />
            </button>
          </div>

          <div className='grow'>
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt=""
              className='size-full'
              style={{ objectFit: 'contain', width: '100%'}}
            />
          </div>
        </div>
      }

    </div>
  );
};

export default ImageModal;
