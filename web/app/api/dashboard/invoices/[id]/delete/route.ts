import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { invoiceApi } from '@/services/invoice/invoiceApi'
import { setToken } from '@/services/token'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  const cookieStore = cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return NextResponse.json(
      { error: 'Sessão expirada. Faça login novamente.' },
      { status: 401 },
    )
  }

  setToken(token)

  try {
    await invoiceApi.deleteInvoice({ id })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    const anyErr = err as { message?: string; status?: number }
    const status = typeof anyErr?.status === 'number' ? anyErr.status : 500
    const message = anyErr?.message ?? 'Internal Server Error'
    return NextResponse.json({ error: message }, { status })
  }
}
