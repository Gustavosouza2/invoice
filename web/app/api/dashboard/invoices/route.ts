import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import z from 'zod'

import { invoiceApi } from '@/services/invoice/invoiceApi'
import { setToken } from '@/services/token'

const createInvoiceSchema = z.object({
  issueDate: z.string().min(1),
  providerName: z.string().min(1),
  providerCnpj: z.string().min(1),
  customerName: z.string().min(1),
  customerCnpjOrCpf: z.string().min(1),
  serviceDescription: z.string().min(1),
  serviceValue: z.coerce.number().positive(),
  customerEmail: z.string().email().optional(),
  userId: z.string().min(1),
})

const updateInvoiceSchema = z.object({
  id: z.string().min(1),
  issueDate: z.string().optional(),
  providerName: z.string().optional(),
  providerCnpj: z.string().optional(),
  customerName: z.string().optional(),
  customerCnpjOrCpf: z.string().optional(),
  serviceDescription: z.string().optional(),
  serviceValue: z.coerce.number().positive().optional(),
  customerEmail: z.string().email().optional(),
  invoiceNumber: z.coerce.number().optional(),
  taxRate: z.coerce.number().optional(),
  issValue: z.coerce.number().optional(),
  netValue: z.coerce.number().optional(),
  status: z.string().optional(),
})

export async function GET(req: Request) {
  const url = new URL(req.url)
  const searchParams = url.searchParams
  const page = Number(searchParams.get('page') ?? '1')
  const perPage = Number(
    searchParams.get('per_page') ?? searchParams.get('perPage') ?? '10',
  )
  const customerName = searchParams.get('name') ?? ''

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

    const data = await invoiceApi.getAllInvoices({
      page,
      perPage,
      customerName,
    })

    return NextResponse.json(data)
  } catch (err) {
    const anyErr = err as { message?: string; status?: number }

    if (anyErr?.message?.includes('404')) {
      return NextResponse.json({
        data: [],
        total: 0,
        page,
        per_page: perPage,
        total_pages: 0,
      })
    }

    const status = typeof anyErr?.status === 'number' ? anyErr.status : 500
    const message = anyErr?.message ?? 'Internal Server Error'
    return NextResponse.json({ error: message }, { status })
  }
}

export async function POST(req: Request) {
  const body = await req.json()

  const parsed = createInvoiceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

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
    const data = await invoiceApi.createInvoice(parsed.data)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: Request) {
  const body = await req.json()

  const parsed = updateInvoiceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

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
    const data = await invoiceApi.updateInvoice(parsed.data)
    return NextResponse.json(data)
  } catch (err) {
    console.log('error', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
