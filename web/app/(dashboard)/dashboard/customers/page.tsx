import { getCustomersList } from '@/hooks/custom/useCustomers'
import { CustomersView } from './view/CustomersView'
import { PAGE_SIZE } from '@/constants/pageSize'

type Props = {
  searchParams: { page?: string }
}

export default async function Customers({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1

  const customers = await getCustomersList(page, PAGE_SIZE)
  return <CustomersView customers={customers} currentPage={page} />
}
