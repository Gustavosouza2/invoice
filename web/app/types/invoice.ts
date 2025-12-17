import type { User } from './user'

export interface Invoice {
  providerMunicipalReg: string
  serviceDescription: string
  customerCnpjOrCpf: string
  verificationCode: string
  invoiceNumber: number
  customerEmail: string
  providerName: string
  providerCnpj: string
  customerName: string
  serviceValue: number
  issueDate: string
  updatedAt: string
  createdAt: string
  issValue: number
  netValue: number
  taxRate: number
  userId: string
  status: string
  id: string
  user: User
}
