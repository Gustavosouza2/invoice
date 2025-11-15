'use client'

import dynamic from 'next/dynamic'

import { Card, type CardProps } from '@/components/features/Card'
import { useGetInvoicesList } from '@/hooks/getInvoicesList'
import { useUserContext } from '@/context/userContext'

const PAGE_SIZE = 10

const Chart = dynamic(
  () => import('@/components/features/Chart').then((m) => m.Chart),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-72 max-w-7xl">
        <div className="w-full h-72 rounded-xl bg-[#0E0E10] border border-[#FFFA]/10" />
      </div>
    ),
  },
)

export default function HomeView() {
  const { userData: userFromContext } = useUserContext()
  const userData = {
    email: userFromContext?.email,
    name: userFromContext?.userName,
  }

  const searchParams = new URLSearchParams()
  const page = searchParams.get('page') || '1'

  const { data: invoices, isLoading } = useGetInvoicesList({
    page: Number(page),
    perPage: PAGE_SIZE,
  })

  const cardItems: CardProps[] = [
    {
      title: `Bem vindo de volta ${userData?.email?.slice(0, 7) || 'Admin'}!`,
      typeInfo: 'decrypted',
      type: 'string',
    },
    {
      // info: invoices?.data?.length.toString() ?? '0',
      description: 'Total de clientes adicionados',
      title: 'Clientes',
      typeInfo: 'text',
      type: 'number',
    },
    {
      description: 'Número total de vendas realizadas',
      title: 'Valor total de vendas',
      // info: totalAmount.toLocaleString('pt-br', {
      //   style: 'currency',
      //   currency: 'BRL',
      // }),
      typeInfo: 'text',
      type: 'number',
    },
  ]

  return (
    <main className="flex flex-col gap-6 py-20 mt-40 px-10 items-center justify-center scrollbar-hide">
      <div className="w-full max-w-6xl">
        <div className="block md-mobile:hidden">
          <div className="mb-4">
            <Card data={[cardItems[0]]} isLoading={isLoading} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <Card data={[cardItems[1]]} isLoading={isLoading} />
            </div>

            <div className="md:col-span-1">
              <Card data={[cardItems[2]]} isLoading={isLoading} />
            </div>
          </div>
        </div>

        <div className="hidden md-mobile:block">
          <div className="grid grid-cols-3 gap-4">
            <Card data={cardItems} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <Chart isLoading={isLoading} data={invoices ?? []} />
      </div>
    </main>
  )
}
