import useSWR from 'swr'

import type { GetAllInvoicesResponse } from '@/services/invoice/type'

type GetAllInvoicesList = {
  page: number
  name?: string
  perPage: number
}

export const useGetInvoicesList = ({
  page = 1,
  name = '',
  perPage = 10,
}: GetAllInvoicesList) => {
  const { data, error, isLoading, isValidating } =
    useSWR<GetAllInvoicesResponse>(
      `/api/dashboard/invoices?page=${page}&perPage=${perPage}&name=${name}`,
      { keepPreviousData: true },
    )
  return { data, error, isLoading, isValidating }
}
