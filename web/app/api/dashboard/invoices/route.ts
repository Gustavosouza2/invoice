import { NextResponse } from 'next/server'
import { invoiceApi } from '@/services/invoice/invoiceApi'

export async function GET(req: Request) {
  const searchParams = new URLSearchParams(req.url.split('?')[1])
  const page = searchParams.get('page') || '1'
  const perPage = searchParams.get('per_page') || '10'

  try {
    const response = await invoiceApi.getAllInvoices({
      page: Number(page),
      perPage: Number(perPage),
    })

    return response
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
