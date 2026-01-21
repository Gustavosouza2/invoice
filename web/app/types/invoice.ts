import type { User } from './user'

export interface Invoice {
  providerMunicipalReg: string
  type: 'WithIA' | 'WithoutIA'
  serviceDescription: string
  customerCnpjOrCpf: string
  invoiceNumber: number
  customerEmail: string
  providerName: string
  providerCnpj: string
  customerName: string
  serviceValue: number
  issueDate: string
  updatedAt: string
  createdAt: string
  userId: string
  id: string
  user: User
}
