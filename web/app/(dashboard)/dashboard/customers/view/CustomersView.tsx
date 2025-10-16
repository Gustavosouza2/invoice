'use client'

import { useState, useCallback, useMemo } from 'react'
import { MdEdit } from 'react-icons/md'

import { type Customer, type CustomersResponse } from '@/types/customer'
import { DataTable } from '@/components/features/Table'
import { useUserContext } from '@/context/userContext'
import { PAGE_SIZE } from '@/constants/pageSize'
import { Button } from '@/components/ui/button'

import { CreateCustomerModal } from '../create-customer'
import { EditCustomerModal } from '../edit-customer'

type CustomersViewProps = {
  customers: CustomersResponse
  currentPage: number
}

export const CustomersView = ({
  customers,
  currentPage,
}: CustomersViewProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()
  const { push } = useUserContext()

  const handlePageChange = useCallback(
    (page: number) => {
      push(`/dashboard/customers?page=${page}`)
    },
    [push],
  )

  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
  const handleIsOpenCreate = useCallback(
    () => setIsOpenCreate(!isOpenCreate),
    [isOpenCreate],
  )

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)

  const totalPages = useMemo(
    () =>
      customers?.count
        ? Math.max(1, Math.ceil(customers.count / PAGE_SIZE))
        : 1,
    [customers?.count],
  )

  const columns = useMemo(
    () =>
      [
        { name: 'name', label: 'Nome:', size: '30' },
        { name: 'email', label: 'Email:', size: '30' },
        { name: 'status', label: 'Status:', size: '40' },
        { name: 'amount', label: 'Valor:', size: '20' },
        { name: 'actions', label: '', size: '0' },
      ] as const,
    [],
  )

  const handleIsOpenEditModal = useCallback(
    (customerId: number) => {
      const customerToEdit = customers?.data?.find(
        (customer: Customer) => customer.id === customerId,
      )

      if (customerToEdit) {
        setSelectedCustomer(customerToEdit)
        setIsOpenEdit(!isOpenEdit)
      }
    },
    [customers?.data, isOpenEdit],
  )

  const formattedCustomersData = useMemo(() => {
    return customers?.data?.map((customer) => ({
      ...customer,
      onClickRow: () => handleIsOpenEditModal(customer.id),
    }))
  }, [customers?.data, handleIsOpenEditModal])

  const ItemsContextMenu = useCallback(
    (rowData: Customer) => [
      {
        label: 'Editar',
        icon: () => <MdEdit className="h-4 w-4 fill-current" />,
        onClick: () => handleIsOpenEditModal(rowData.id),
      },
    ],
    [handleIsOpenEditModal],
  )

  return (
    <div className="flex flex-col py-20 px-10 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-gray-300 font-mono font-medium tracking-wide ml-5 mt-1">
          Clientes:
        </h1>

        <div>
          <Button
            className="rounded-xl mb-5"
            onClick={handleIsOpenCreate}
            variant="secondary"
          >
            Novo Cliente
          </Button>
        </div>

        <CreateCustomerModal
          isOpen={isOpenCreate}
          onClose={handleIsOpenCreate}
        />
      </div>

      <div>
        <EditCustomerModal
          isOpen={isOpenEdit}
          customer={selectedCustomer as Customer}
          onClose={() => setIsOpenEdit(!isOpenEdit)}
        />
      </div>

      <DataTable
        onPageChange={handlePageChange}
        data={formattedCustomersData}
        currentPage={currentPage}
        items={ItemsContextMenu}
        totalPages={totalPages}
        columns={columns}
        title="Clientes"
      />
    </div>
  )
}
