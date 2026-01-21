'use client'

import { DeleteModal } from '@/components/features/Modal/DeleteModal'
import { useInvoiceCreate } from '@/hooks/invoices/useInvoiceCreate'
import { useInvoiceDelete } from '@/hooks/invoices/useInvoiceDelete'
import { useInvoiceTable } from '@/hooks/invoices/useInvoiceTable'
import { useInvoiceEdit } from '@/hooks/invoices/useInvoiceEdit'
import { DataTable } from '@/components/features/Table'
import { Filter } from '@/components/features/Filter'

import { InvoiceFormProvider } from './form/context'
import { InvoiceFormModal } from './form'

export default function InvoiceView() {
  const createInvoice = useInvoiceCreate()
  const deleteInvoice = useInvoiceDelete()
  const editInvoice = useInvoiceEdit()

  const table = useInvoiceTable({
    onEdit: editInvoice.openModal,
    onDelete: deleteInvoice.openModal,
  })

  return (
    <main className="gap-5 scrollbar-hide flex flex-col md-mobile:flex-row">
      <div className="w-full md-mobile:w-auto order-2 md-mobile:order-1">
        <DataTable
          data={table.data}
          columns={table.columns}
          isLoading={table.isLoading}
          totalPages={table.totalPages}
          items={table.itemsContextMenu}
          currentPage={table.currentPage}
          onPageChange={table.onPageChange}
        />
      </div>

      <div className="w-full md-mobile:w-auto order-1 md-mobile:order-2 h-full">
        <Filter
          isLoading={table.isLoading}
          handleCreateInvoice={createInvoice.openModal}
        />
      </div>

      <InvoiceFormProvider mode="create">
        <InvoiceFormModal
          isOpen={createInvoice.isOpen}
          onClose={createInvoice.closeModal}
        />
      </InvoiceFormProvider>

      {editInvoice.invoiceData && (
        <InvoiceFormProvider
          mode="edit"
          invoiceId={editInvoice.invoiceId}
          initialData={editInvoice.invoiceData}
        >
          <InvoiceFormModal
            isOpen={editInvoice.isOpen}
            onClose={editInvoice.closeModal}
          />
        </InvoiceFormProvider>
      )}

      <DeleteModal
        isOpen={deleteInvoice.isOpen}
        onClose={deleteInvoice.closeModal}
        invoiceId={deleteInvoice.invoiceId}
        onDelete={deleteInvoice.deleteInvoice}
      />
    </main>
  )
}
