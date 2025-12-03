'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { MdEdit } from 'react-icons/md'

import { useGetInvoicesList } from '@/hooks/getInvoicesList'
import { DataTable } from '@/components/features/Table'
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
        { name: 'invoiceName', label: 'Nota Fiscal', size: '10' },
        { name: 'vehicleMake', label: 'Data da Nota', size: '10' },
        { name: 'customerName', label: 'Valor da Nota', size: '10' },
      ] as const,
    [],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      push(`/dashboard/customers?page=${page}`)
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
        label: 'Editar',
        icon: () => <MdEdit className="h-4 w-4 fill-current" />,
        onClick: () => handleIsOpenEditModal(rowData.id),
      },
    ],
    [handleIsOpenEditModal],
  )

  return (
    <main className="flex">
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
    </main>
  )
}
