import { getCustomersList } from '@/hooks/custom/useCustomers'
import HomeView from './view/HomeView'

const PAGE_SIZE = 10

type HomeProps = {
  searchParams: { page?: string }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1

  const customers = await getCustomersList(page, PAGE_SIZE)
  return <HomeView customers={customers} />
}
