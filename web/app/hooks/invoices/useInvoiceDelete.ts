import { useState, useCallback } from 'react'
import { mutate } from 'swr'
import axios from 'axios'

import { Toast } from '@/components/features/Toast'

export function useInvoiceDelete() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [invoiceId, setInvoiceId] = useState<string | undefined>()

  const openModal = useCallback((id: string) => {
    setInvoiceId(id)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setInvoiceId(undefined)
  }, [])

  const deleteInvoice = useCallback((id?: string) => {
    if (!id) return

    setIsOpen(false)
    axios
      .delete(`/api/dashboard/invoices/${id}`)
      .then(() => {
        mutate(
          (key) =>
            typeof key === 'string' &&
            key.startsWith('/api/dashboard/invoices'),
        )
        Toast({
          type: 'success',
          message: 'Nota fiscal excluída com sucesso!',
        })
      })
      .catch(() => {
        Toast({
          type: 'error',
          message: 'Erro ao excluir nota fiscal. Tente novamente.',
        })
      })
      .finally(() => {
        setInvoiceId(undefined)
      })
  }, [])

  return {
    isOpen,
    invoiceId,
    openModal,
    closeModal,
    deleteInvoice,
  }
}
