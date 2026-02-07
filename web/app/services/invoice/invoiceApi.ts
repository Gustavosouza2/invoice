import { BaseApi } from '../base'
import type {
  GetInvoiceRequest,
  GetInvoiceResponse,
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  UpdateInvoiceRequest,
  UpdateInvoiceResponse,
  GetAllInvoicesRequest,
  GetAllInvoicesResponse,
  DeleteInvoiceRequest,
  DeleteInvoiceResponse,
} from './type'
import { getApiBaseUrl } from '@/lib/env'

class Invoice extends BaseApi {
  public async getAllInvoices({
    page,
    perPage,
    customerName,
  }: GetAllInvoicesRequest) {
    const response = await this.get<GetAllInvoicesResponse>(
      `/invoices/get-invoices?page=${page}&per_page=${perPage}&name=${customerName}`,
    )
    return response
  }

  public async getInvoiceById({ invoiceId }: GetInvoiceRequest) {
    const response = await this.get<GetInvoiceResponse>(
      `/invoices/get-invoice/${invoiceId}`,
    )
    return response
  }

  public async createInvoice({ ...data }: CreateInvoiceRequest) {
    const response = await this.post<
      CreateInvoiceRequest,
      CreateInvoiceResponse
    >(`/invoices/create-invoice`, data)
    return response
  }

  public async updateInvoice({ id, ...data }: UpdateInvoiceRequest) {
    const response = (await this.patch(
      `/invoices/update-invoice/${id}`,
      data,
    )) as UpdateInvoiceResponse
    return response
  }

  public async deleteInvoice({ id }: DeleteInvoiceRequest) {
    const response = await this.delete<DeleteInvoiceResponse>(
      `/invoices/delete-invoice/${id}`,
    )
    return response
  }

  public async getInvoiceDocument({
    invoiceId,
    token,
  }: {
    invoiceId: string
    token?: string
  }): Promise<string> {
    const response = await fetch(
      `${this.baseUrl}/invoices/${invoiceId}/document`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Request GET failed with status ${response.status}`)
    }

    return response.text()
  }
}

const baseUrl = getApiBaseUrl()
export const invoiceApi = new Invoice(baseUrl)
