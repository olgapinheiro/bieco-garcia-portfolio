'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

const ModalContext = createContext<{
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
}>({ isModalOpen: false, setModalOpen: () => {} })

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
