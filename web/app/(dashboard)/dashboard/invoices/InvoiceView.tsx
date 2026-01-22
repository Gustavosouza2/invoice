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

  const handleViewInvoice = (invoiceId: string) => {
    const documentUrl = `/api/dashboard/invoices/${invoiceId}/document`
    window.open(documentUrl, '_blank')
  }

  const table = useInvoiceTable({
    onEdit: editInvoice.openModal,
    onDelete: deleteInvoice.openModal,
    onView: handleViewInvoice,
  })

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 min-h-[calc(100vh-20rem)] md:min-h-0">
      <main className="gap-5 scrollbar-hide flex flex-col md-mobile:flex-row w-full">
        <div className="w-full md-mobile:w-auto order-2 md-mobile:order-1 min-w-0">
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

        <div className="w-full md-mobile:w-auto order-1 md-mobile:order-2 h-full min-w-0">
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
    </div>
  )
}
