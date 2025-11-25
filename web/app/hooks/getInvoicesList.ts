import useSWR from 'swr'

import type { GetAllInvoicesResponse } from '@/services/invoice/type'

type GetAllInvoicesList = {
  page: number
  perPage: number
}

export const useGetInvoicesList = ({
  page = 1,
  perPage = 10,
}: GetAllInvoicesList) => {
  const { data, error, isLoading } = useSWR<GetAllInvoicesResponse>(
    `/api/dashboard/invoices?page=${page}&perPage=${perPage}`,
  )
  return { data, error, isLoading }
}
