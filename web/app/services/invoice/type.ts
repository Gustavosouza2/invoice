import type { Invoice } from '@/types/invoice'

// Invoice
export type GetAllInvoicesRequest = {
  customerName?: string
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

export type CreateInvoiceRequest = {
  serviceDescription: string
  customerCnpjOrCpf: string
  customerEmail?: string
  providerName: string
  providerCnpj: string
  customerName: string
  serviceValue: number
  issueDate: string
  userId: string
}

export type CreateInvoiceResponse = {
  invoice: Invoice
}

export type UpdateInvoiceRequest = {
  id: string
  serviceDescription?: string
  customerCnpjOrCpf?: string
  customerEmail?: string
  providerName?: string
  providerCnpj?: string
  customerName?: string
  serviceValue?: number
  issueDate?: string
  invoiceNumber?: number
  taxRate?: number
  issValue?: number
  netValue?: number
}

export type UpdateInvoiceResponse = {
  invoice: Invoice
}
