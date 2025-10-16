import { revalidateTag } from 'next/cache'

import { type CreateCustomerResponse } from '@/types/customer'
import { serverFetch } from '@/lib/api'

export async function createCustomerServer(formData: FormData) {
  const response = await serverFetch<CreateCustomerResponse>(
    '/api/dashboard/customer',
    {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    },
  )

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  revalidateTag('customers')

  return {
    status: response.status,
    customer: response.customer,
  }
}
