import useSWR from 'swr'

import type { GetAllInvoicesResponse } from '@/services/invoice/type'

type GetAllInvoicesList = {
  page: number
  perPage: number
  name?: string
}

export const useGetInvoicesList = ({
  page = 1,
  perPage = 10,
  name = '',
}: GetAllInvoicesList) => {
  const { data, error, isLoading } = useSWR<GetAllInvoicesResponse>(
    `/api/dashboard/invoices?page=${page}&perPage=${perPage}&name=${encodeURIComponent(name)}`,
  )
  return { data, error, isLoading }
}
