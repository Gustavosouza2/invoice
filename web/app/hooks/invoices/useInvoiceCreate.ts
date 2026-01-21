import { useState, useCallback } from 'react'

export function useInvoiceCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
  }
}
