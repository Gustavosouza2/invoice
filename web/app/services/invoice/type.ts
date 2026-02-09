import type { Invoice } from '@/types/invoice'

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
  providerMunicipalReg?: string
  type?: 'WithIA' | 'WithoutIA'
  serviceDescription: string
  customerCnpjOrCpf: string
  customerEmail?: string
  providerName: string
  providerCnpj: string
  customerName: string
  serviceValue: number
  issueDate: string
}

export type CreateInvoiceResponse = {
  invoice: Invoice
}

export type UpdateInvoiceRequest = {
  providerMunicipalReg?: string
  type?: 'WithIA' | 'WithoutIA'
  serviceDescription?: string
  customerCnpjOrCpf?: string
  invoiceNumber?: number
  customerEmail?: string
  providerName?: string
  providerCnpj?: string
  customerName?: string
  serviceValue?: number
  issueDate?: string
  id: string
}

export type UpdateInvoiceResponse = {
  invoice: Invoice
}

export type DeleteInvoiceRequest = {
  id: string
}

export type DeleteInvoiceResponse = {
  message: string
}
