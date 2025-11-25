import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { invoiceApi } from '@/services/invoice/invoiceApi'
import { setToken } from '@/services/token'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const searchParams = url.searchParams
  const page = Number(searchParams.get('page') ?? '1')
  const perPage = Number(
    searchParams.get('per_page') ?? searchParams.get('perPage') ?? '10',
  )

  try {
    const cookieStore = cookies()
    const token =
      cookieStore.get('access_token')?.value ?? cookieStore.get('token')?.value
    if (token) setToken(token)

    const data = await invoiceApi.getAllInvoices({ page, perPage })

    return NextResponse.json(data)
  } catch (err) {
    const anyErr = err as { message?: string; status?: number }
    const status = typeof anyErr?.status === 'number' ? anyErr.status : 500
    const message = anyErr?.message ?? 'Internal Server Error'
    return NextResponse.json({ error: message }, { status })
  }
}
