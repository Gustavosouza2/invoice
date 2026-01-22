'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { Card, type CardProps } from '@/components/features/Card'
import { useGetInvoicesList } from '@/hooks/invoices/getInvoicesList'
import { useUserContext } from '@/context/userContext'

const PAGE_SIZE = 10
const PAGE = 1

const Chart = dynamic(
  () => import('@/components/features/Chart').then((m) => m.Chart),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-72 max-w-7xl">
        <div className="w-full h-72 rounded-xl bg-bg-primary border border-accent" />
      </div>
    ),
  },
)

export default function HomeView() {
  const { userData } = useUserContext()

  const { data: invoices, isLoading } = useGetInvoicesList({
    page: PAGE,
    perPage: PAGE_SIZE,
  })

  const invoicesData = useMemo(() => invoices?.data ?? [], [invoices])

  const totalGrossRevenue = useMemo(
    () => invoicesData.reduce((sum, inv) => sum + (inv.serviceValue || 0), 0),
    [invoicesData],
  )

  const totalInvoices = useMemo(() => invoicesData.length, [invoicesData])

  const uniqueCustomers = useMemo(
    () => new Set(invoicesData.map((inv) => inv.customerName)).size,
    [invoicesData],
  )

  const cardItems: CardProps[] = [
    {
      title: `Bem vindo de volta ${userData?.name || 'Admin'}!`,
      description: 'Veja as principais métricas da sua empresa',
      isFirstCard: true,
    },
    {
      title: 'Total de Invoices',
      info: totalInvoices.toLocaleString('pt-br'),
      description: 'Número total de notas fiscais',
    },
    {
      title: 'Receita Bruta',
      info: totalGrossRevenue.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      description: 'Receita bruta total',
    },
    {
      title: 'Clientes Únicos',
      info: uniqueCustomers.toLocaleString('pt-br'),
      description: 'Número de clientes únicos',
    },
  ]

  return (
    <main className="flex flex-col gap-5 py-6 mt-10 md:mt-0 px-10 items-center justify-center scrollbar-hide min-h-[calc(100vh-8rem)] md:min-h-0">
      <div className="max-w-7xl">
        <div className="mb-4">
          <Card data={[cardItems[0]]} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
          <Card data={[cardItems[1]]} isLoading={isLoading} />
          <Card data={[cardItems[2]]} isLoading={isLoading} />
          <Card data={[cardItems[3]]} isLoading={isLoading} />
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <Chart isLoading={isLoading} data={invoices?.data ?? []} />
      </div>
    </main>
  )
}
