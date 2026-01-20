'use client'

import { useCallback, useMemo, useState, useEffect } from 'react'
import { MdEdit, MdVisibility } from 'react-icons/md'
import { useRouter } from 'next/navigation'

import { useGetInvoicesList } from '@/hooks/getInvoicesList'
import { DataTable } from '@/components/features/Table'
import { usePagination } from '@/hooks/usePagination'
import { Filter } from '@/components/features/Filter'
import type { Invoice } from '@/types/invoice'

import { InvoiceFormProvider, type InvoiceFormData } from './form/context'
import { InvoiceFormModal } from './form'

export default function InvoiceView() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [editInvoiceId, setEditInvoiceId] = useState<string | undefined>()
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [editInvoiceData, setEditInvoiceData] =
    useState<InvoiceFormData | null>(null)
  const { filters, setFilters } = usePagination()

  const [debouncedName, setDebouncedName] = useState(filters.name ?? '')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(filters.name ?? '')
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.name])

  const handleIsOpenCreateInvoiceModal = useCallback(() => {
    setIsOpenCreateModal(!isOpenCreateModal)
  }, [isOpenCreateModal])

  const handleOpenEditModal = useCallback((invoice: Invoice) => {
    const { issueDate, ...invoiceFormFields } = invoice

    setEditInvoiceData({
      ...invoiceFormFields,
      issueDate: issueDate?.split('T')[0],
    } as InvoiceFormData)

    setEditInvoiceId(invoice.id)
    setIsOpenEditModal(true)
  }, [])

  const handleCloseEditModal = useCallback(() => {
    setIsOpenEditModal(false)
    setEditInvoiceData(null)
    setEditInvoiceId(undefined)
  }, [])

  const { data: invoices, isLoading } = useGetInvoicesList({
    page: filters.page,
    perPage: filters.pageSize,
    name: debouncedName,
  })

  const showSkeleton = useMemo(
    () => isLoading && !invoices,
    [isLoading, invoices],
  )

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
      setFilters({ ...filters, page })
      push(`/dashboard/invoices?page=${page}`)
    },
    [push, setFilters, filters],
  )

  const formattedInvoiceData = useMemo(() => {
    return invoices?.data?.map((invoice) => ({
      ...invoice,
      onClickRow: () => handleOpenEditModal(invoice),
    }))
  }, [invoices?.data, handleOpenEditModal]) as Invoice[]

  const ItemsContextMenu = useCallback(
    (rowData: Invoice) => [
      {
        label: 'Visualizar',
        icon: () => <MdVisibility className="h-4 w-4 fill-current" />,
        onClick: () => handleOpenEditModal(rowData),
      },
      {
        label: 'Editar',
        icon: () => <MdEdit className="h-4 w-4 fill-current" />,
        onClick: () => handleOpenEditModal(rowData),
      },
    ],
    [handleOpenEditModal],
  )

  return (
    <main className="gap-5 scrollbar-hide flex flex-col md-mobile:flex-row">
      <div className="w-full md-mobile:w-auto order-2 md-mobile:order-1">
        <DataTable
          columns={columns}
          isLoading={showSkeleton}
          items={ItemsContextMenu}
          currentPage={filters.page}
          data={formattedInvoiceData}
          onPageChange={handlePageChange}
          totalPages={invoices?.total_pages || 10}
        />
      </div>

      <div className="w-full md-mobile:w-auto order-1 md-mobile:order-2 h-full">
        <Filter
          isLoading={showSkeleton}
          handleCreateInvoice={handleIsOpenCreateInvoiceModal}
        />
      </div>

      <InvoiceFormProvider mode="create">
        <InvoiceFormModal
          isOpen={isOpenCreateModal}
          onClose={handleIsOpenCreateInvoiceModal}
        />
      </InvoiceFormProvider>

      {editInvoiceData && (
        <InvoiceFormProvider
          mode="edit"
          initialData={editInvoiceData}
          invoiceId={editInvoiceId}
        >
          <InvoiceFormModal
            isOpen={isOpenEditModal}
            onClose={handleCloseEditModal}
          />
        </InvoiceFormProvider>
      )}
    </main>
  )
}
