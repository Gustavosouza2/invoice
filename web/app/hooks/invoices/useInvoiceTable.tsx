import { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { MdDelete, MdEdit, MdVisibility } from 'react-icons/md'

import { useGetInvoicesList } from '@/hooks/invoices/getInvoicesList'
import { usePagination } from '@/hooks/usePagination'
import type { Invoice } from '@/types/invoice'
import { debounce } from '@/utils/debounce'

type UseInvoiceTableProps = {
  onDelete: (invoiceId: string) => void
  onView?: (invoiceId: string) => void
  onEdit: (invoice: Invoice) => void
}

export function useInvoiceTable({
  onEdit,
  onView,
  onDelete,
}: UseInvoiceTableProps) {
  const { filters, setFilters } = usePagination()
  const [debouncedName, setDebouncedName] = useState(filters.name ?? '')

  const debouncedSetNameRef = useRef(
    debounce((name: string) => {
      setDebouncedName(name)
    }, 300),
  )

  useEffect(() => {
    debouncedSetNameRef.current(filters.name ?? '')
  }, [filters.name])

  const { data: invoices, isLoading } = useGetInvoicesList({
    page: filters.page,
    perPage: filters.pageSize,
    name: debouncedName,
  })

  const showSkeleton = useMemo(
    () => isLoading && !invoices,
    [isLoading, invoices],
  )

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
      setFilters({ ...filters, page, pageSize: filters.pageSize || 10 })
    },
    [setFilters, filters],
  )

  const formattedInvoiceData = useMemo(() => {
    return invoices?.data?.map((invoice) => ({
      ...invoice,
      onClickRow: () => onEdit(invoice),
    }))
  }, [invoices?.data, onEdit]) as Invoice[]

  const itemsContextMenu = useCallback(
    (rowData: Invoice) => [
      {
        label: 'Visualizar',
        icon: () => <MdVisibility className="h-4 w-4 fill-current" />,
        onClick: () => {
          if (onView) {
            return onView(rowData.id)
          }
          return onEdit(rowData)
        },
      },
      {
        label: 'Editar',
        icon: () => <MdEdit className="h-4 w-4 fill-current" />,
        onClick: () => onEdit(rowData),
      },
      {
        label: 'Excluir',
        icon: () => <MdDelete className="h-4 w-4 fill-current" />,
        onClick: () => onDelete(rowData.id),
      },
    ],
    [onEdit, onDelete, onView],
  )

  return {
    columns,
    data: formattedInvoiceData,
    isLoading: showSkeleton,
    currentPage: filters.page,
    totalPages: invoices?.total_pages || 10,
    onPageChange: handlePageChange,
    itemsContextMenu,
  }
}
