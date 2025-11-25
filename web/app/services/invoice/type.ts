import type { Invoice } from '@/types/invoice'

// Invoice
export type GetAllInvoicesRequest = {
  perPage: number
  page: number
}

export type GetAllInvoicesResponse = {
  total_pages: number
  per_page: number
  data: Invoice[]
  total: number
  page: number
}

export type GetInvoiceRequest = {
  invoiceId: number
}

export type GetInvoiceResponse = {
  invoice: Invoice
}
