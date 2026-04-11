'use client'
import { useModal } from '@/contexts/ModalContext'
import { WhatsappIcon } from './icons'
import { WHATSAPP_URL } from '@/lib/utils'

export default function FloatingContactButton() {
  const { isModalOpen } = useModal()

  if (isModalOpen) return null

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 rounded-full bg-foreground px-6 py-4 text-base sm:px-5 sm:py-3 sm:gap-2 sm:text-sm text-background font-medium shadow-[2px_4px_10px_rgba(0,0,0,0.35)] hover:shadow-[3px_6px_12px_rgba(0,0,0,0.45)] hover:opacity-80 transition-opacity"
    >
      <WhatsappIcon size={20} className="sm:hidden" />
      <WhatsappIcon size={18} className="hidden sm:block" />
      Contact Us
    </a>
  )
}
