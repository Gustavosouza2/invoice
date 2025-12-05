'use client'

import { MdEdit, MdVisibility } from 'react-icons/md'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { useGetInvoicesList } from '@/hooks/getInvoicesList'
import { DataTable } from '@/components/features/Table'
import { Filter } from '@/components/features/Filter'
import type { Invoice } from '@/types/invoice'

type InvoiceViewProps = {
  page: number
}

export default function InvoiceView({ page }: InvoiceViewProps) {
  const { data: invoices, isLoading } = useGetInvoicesList({
    page,
    perPage: 10,
  })
  const { push } = useRouter()

  const columns = useMemo(
    () =>
      [
        { name: 'customerName', label: 'Nome do cliente', size: '80' },
        { name: 'invoiceNumber', label: 'Número da nota', size: '20' },
        { name: 'serviceValue', label: 'Valor do serviço', size: '20' },
        { name: 'actions', label: '', size: '0' },
      ] as const,
    [],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      push(`/dashboard/invoices?page=${page}`)
    },
    [push],
  )

  const handleIsOpenEditModal = useCallback((id: string) => {}, [])

  const formattedInvoiceData = useMemo(() => {
    return invoices?.data?.map((invoice) => ({
      ...invoice,
      onClickRow: () => handleIsOpenEditModal(invoice.id),
    }))
  }, [invoices?.data, handleIsOpenEditModal]) as Invoice[]

  const ItemsContextMenu = useCallback(
    (rowData: Invoice) => [
      {
        label: 'Visualizar',
        icon: () => <MdVisibility className="h-4 w-4 fill-current" />,
        onClick: () => handleIsOpenEditModal(rowData.id),
      },
      {
        label: 'Editar',
        icon: () => <MdEdit className="h-4 w-4 fill-current" />,
        onClick: () => handleIsOpenEditModal(rowData.id),
      },
    ],
    [handleIsOpenEditModal],
  )

  return (
    <main className="gap-5 scrollbar-hide flex flex-col md-mobile:flex-row">
      <div className="w-full md-mobile:w-auto order-2 md-mobile:order-1">
        <DataTable
          columns={columns}
          currentPage={page}
          title="Notas Fiscais"
          isLoading={isLoading}
          items={ItemsContextMenu}
          data={formattedInvoiceData}
          onPageChange={handlePageChange}
          totalPages={invoices?.total_pages || 10}
        />
      </div>

      <div className="w-full md-mobile:w-auto order-1 md-mobile:order-2 h-full">
        <Filter />
      </div>
    </main>
  )
}
