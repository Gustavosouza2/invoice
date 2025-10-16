import { buildApiUrl } from '@/lib/config'

export async function serverFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const apiUrl = buildApiUrl(path)

  const response = await fetch(apiUrl, {
    ...options,
    headers: {
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: apiUrl,
      body: errorText,
    })
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
  }

  return response.json()
}

export async function updateCustomerServer(formData: FormData) {
  const apiUrl = buildApiUrl('/api/dashboard/customer')

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
