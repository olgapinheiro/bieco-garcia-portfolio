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
          className='z-10 fixed top-0 left-0 w-full h-full bg-white/98 dark:bg-black/98 flex flex-col justify-between items-center p-8'
          role="dialog"
          aria-modal="true"
          tabIndex={0}
          onClick={handleModal}
          onKeyDown={(e) => { if (e.key.toLowerCase() === 'escape') handleModal() }}
        >
          <div className="w-full flex flex-row justify-end">
          <button
            type='button'
            onClick={handleModal}
            aria-label="Close image"
          >
            <XmarkIcon />
            </button>
          </div>

          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt=""
            className='h-full w-full'
            style={{ objectFit: 'contain', width: '100%'}}
          />
        </div>
      }

    </div>
  );
};

export default ImageModal;
