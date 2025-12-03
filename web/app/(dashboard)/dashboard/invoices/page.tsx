import InvoiceView from './InvoiceView'

export default async function Invoices() {
  const searchParams = new URLSearchParams()

  const page = searchParams.get('page') || '1'
  const currentPage = Number(page)

  return <InvoiceView page={currentPage} />
}
