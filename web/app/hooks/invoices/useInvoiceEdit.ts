import { useState, useCallback } from 'react'

import type { InvoiceFormData } from '@/(dashboard)/dashboard/invoices/form/context'
import type { Invoice } from '@/types/invoice'

export function useInvoiceEdit() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [invoiceId, setInvoiceId] = useState<string | undefined>()
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData | null>(null)

  const openModal = useCallback((invoice: Invoice) => {
    const { issueDate, ...invoiceFormFields } = invoice

    setInvoiceData({
      ...invoiceFormFields,
      issueDate: issueDate?.split('T')[0],
    } as InvoiceFormData)

    setInvoiceId(invoice.id)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setInvoiceData(null)
    setInvoiceId(undefined)
  }, [])

  return {
    isOpen,
    invoiceId,
    invoiceData,
    openModal,
    closeModal,
  }
}
