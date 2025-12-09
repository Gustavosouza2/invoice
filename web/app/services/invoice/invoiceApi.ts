import { BaseApi } from '../base'
import type {
  GetInvoiceRequest,
  GetInvoiceResponse,
  GetAllInvoicesRequest,
  GetAllInvoicesResponse,
} from './type'

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
}

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000'
export const invoiceApi = new Invoice(baseUrl)
