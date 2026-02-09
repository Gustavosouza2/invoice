import { Suspense } from 'react'

import InvoiceView from './InvoiceView'

export default async function Invoices() {
  return (
    <Suspense>
      <InvoiceView />
    </Suspense>
  )
}
