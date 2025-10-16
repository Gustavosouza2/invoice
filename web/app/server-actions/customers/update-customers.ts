import { type UpdateCustomerResponse } from '@/types/customer'
import { serverFetch } from '@/lib/api'

export async function updateCustomerServer(formData: FormData) {
  const response = await serverFetch<UpdateCustomerResponse>(
    `/api/dashboard/customer`,
    {
      method: 'PATCH',
      body: formData,
      cache: 'no-store',
    },
  )

  return response
}
