import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { invoiceApi } from '@/services/invoice/invoiceApi'
import { setToken } from '@/services/token'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Sessão expirada. Faça login novamente.' },
        { status: 401 },
      )
    }

    setToken(token)

    const htmlContent = await invoiceApi.getInvoiceDocument({
      invoiceId: params.id,
      token,
    })

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="nota-fiscal-${params.id}.html"`,
      },
    })
  } catch (err) {
    const anyErr = err as { message?: string; status?: number }
    const status = typeof anyErr?.status === 'number' ? anyErr.status : 500
    const message = anyErr?.message ?? 'Internal Server Error'
    return NextResponse.json({ error: message }, { status })
  }
}
