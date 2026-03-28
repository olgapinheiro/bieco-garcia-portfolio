import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XmarkIcon } from './icons';

const SWIPE_THRESHOLD = 50;

function useSwipe(onPrev: () => void, onNext: () => void, enabled: boolean) {
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const didSwipe = useRef(false)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    didSwipe.current = false
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || !enabled) return

    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      didSwipe.current = true
      if (dx < 0) onNext()
      else onPrev()
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  return { onTouchStart, onTouchEnd, didSwipe }
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

  const { onTouchStart, onTouchEnd, didSwipe } = useSwipe(
    hasPrev ? onPrev : () => {},
    hasNext ? onNext : () => {},
    isOpen
  )

  if (!isOpen || !currentUrl) return null

  return (
    <div
      className="z-50 fixed top-0 left-0 size-full bg-white/98 dark:bg-black/98 flex flex-col justify-center items-center p-0 cursor-pointer"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={(e) => { if (!didSwipe.current) onClose() }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="w-full flex flex-row justify-end p-4">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          aria-label="Close image"
          className="hover:opacity-70 focus:opacity-70 transition-opacity cursor-pointer"
        >
          <XmarkIcon />
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 min-h-0 pb-4 w-full flex items-center justify-center">
        <Image
          src={currentUrl}
          width={500}
          height={500}
          alt=""
          className="size-full"
          style={{ objectFit: 'contain', width: '100%' }}
        />
      </div>

      {/* Prev button — desktop only */}
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous image"
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 focus:bg-black/40 dark:focus:bg-white/40 transition-colors cursor-pointer"
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
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 focus:bg-black/40 dark:focus:bg-white/40 transition-colors cursor-pointer"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  )
}

export default ImageModal;
