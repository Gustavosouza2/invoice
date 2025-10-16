import { getCustomersList } from '@/hooks/custom/useCustomers'
import { PAGE_SIZE } from '@/constants/pageSize'

import HomeView from './view/HomeView'

type HomeProps = {
  searchParams: { page?: string }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1

  const customers = await getCustomersList(page, PAGE_SIZE)
  return <HomeView customers={customers} />
}
