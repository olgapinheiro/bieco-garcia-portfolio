'use client'
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeftIcon, ChevronRightIcon, XmarkIcon } from './icons';

const SWIPE_X_THRESHOLD = 50
const SWIPE_X_VELOCITY = 500
const SWIPE_Y_THRESHOLD = 80
const SWIPE_Y_VELOCITY = 500
const TAP_THRESHOLD = 10

// Variant functions receive the `custom` direction value passed to AnimatePresence
const slideVariants = {
  enter: (dir: number) => ({ x: `${dir * 100}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: `${dir * -100}%`, opacity: 0 }),
}

const ImageModal = ({
  imageUrls,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: {
  imageUrls: string[]
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  const isOpen = selectedIndex !== null
  const currentUrl = isOpen ? imageUrls[selectedIndex] : null
  const hasPrev = isOpen && selectedIndex > 0
  const hasNext = isOpen && selectedIndex < imageUrls.length - 1

  // Track slide direction so AnimatePresence can give exiting items the correct direction
  const prevIndexRef = useRef<number | null>(null)
  const directionRef = useRef(0)
  if (selectedIndex !== null && prevIndexRef.current !== null && selectedIndex !== prevIndexRef.current) {
    directionRef.current = selectedIndex > prevIndexRef.current ? 1 : -1
  }
  prevIndexRef.current = selectedIndex

  // Track pointer type (touch vs mouse) to differentiate tap behaviour
  const pointerTypeRef = useRef<string>('')

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, hasPrev, hasNext, onClose, onPrev, onNext])

  // Preload adjacent images
  const preloadRefs = useRef<HTMLLinkElement[]>([])
  useEffect(() => {
    preloadRefs.current.forEach((el) => el.parentNode?.removeChild(el))
    preloadRefs.current = []
    if (!isOpen) return
    const urls = [
      hasPrev ? imageUrls[selectedIndex - 1] : null,
      hasNext ? imageUrls[selectedIndex + 1] : null,
    ].filter(Boolean) as string[]
    urls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
      preloadRefs.current.push(link)
    })
    return () => {
      preloadRefs.current.forEach((el) => el.parentNode?.removeChild(el))
      preloadRefs.current = []
    }
  }, [isOpen, selectedIndex, hasPrev, hasNext, imageUrls])

  if (!isOpen || !currentUrl) return null

  const dir = directionRef.current

  return (
    <div
      className="z-50 fixed top-0 left-0 size-full bg-white/98 dark:bg-black/98 flex flex-col justify-center items-center p-0 pb-4"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      // Desktop: clicking the backdrop (outside the image drag area) closes the modal
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="w-full flex flex-row justify-end p-4 flex-shrink-0">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          aria-label="Close image"
          className="hover:opacity-70 focus:opacity-70 transition-opacity cursor-pointer"
        >
          <XmarkIcon />
        </button>
      </div>

      {/* Slide animation container — relative so absolute children stack correctly */}
      <div className="flex-1 min-h-0 pb-4 w-full overflow-hidden relative">
        <AnimatePresence initial={false} custom={dir}>
          {/*
           * ANIMATION LAYER — keyed by selectedIndex, owns enter/exit slide.
           * Must be separate from the drag layer to avoid motion value conflicts.
           */}
          <motion.div
            key={selectedIndex}
            className="absolute inset-0 flex items-center justify-center"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          >
            {/*
             * DRAG LAYER — no key, no variants, owns drag physics only.
             * Separating from the animation layer prevents the snap-back conflict.
             */}
            <motion.div
              className="size-full flex items-center justify-center"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              onPointerDown={(e) => { pointerTypeRef.current = e.pointerType }}
              onDragEnd={(_, { offset, velocity }) => {
                const isTap = Math.abs(offset.x) < TAP_THRESHOLD && Math.abs(offset.y) < TAP_THRESHOLD

                if (isTap) {
                  // Mobile tap on image = go to next image (if available)
                  if (pointerTypeRef.current === 'touch' && hasNext) onNext()
                  return
                }

                const isHorizontal = Math.abs(offset.x) > Math.abs(offset.y)
                if (isHorizontal) {
                  if (offset.x < -SWIPE_X_THRESHOLD || velocity.x < -SWIPE_X_VELOCITY) {
                    if (hasNext) onNext()
                  } else if (offset.x > SWIPE_X_THRESHOLD || velocity.x > SWIPE_X_VELOCITY) {
                    if (hasPrev) onPrev()
                  }
                } else {
                  if (Math.abs(offset.y) > SWIPE_Y_THRESHOLD || Math.abs(velocity.y) > SWIPE_Y_VELOCITY) {
                    onClose()
                  }
                }
              }}
              // Stop click propagation so the backdrop onClick doesn't fire
              // when the user interacts with the image area
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentUrl}
                width={500}
                height={500}
                alt=""
                className="size-full pointer-events-none select-none"
                style={{ objectFit: 'contain', width: '100%' }}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev button — desktop only */}
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous image"
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white/20 dark:bg-white/20 hover:bg-white/40 dark:hover:bg-white/40 focus:bg-white/40 dark:focus:bg-white/40 transition-colors cursor-pointer"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* Next button — desktop only */}
      {hasNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next image"
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white/20 dark:bg-white/20 hover:bg-white/40 dark:hover:bg-white/40 focus:bg-white/40 dark:focus:bg-white/40 transition-colors cursor-pointer"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  )
}

export default ImageModal;
