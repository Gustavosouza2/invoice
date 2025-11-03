import { NextResponse } from 'next/server'

import { authService } from '@/services/auth/auth'

export async function POST(req: Request) {
  const { email, name, password, phone } = await req.json()

  if (!email || !password || !phone || !name) {
    return NextResponse.json(
      {
        message: 'Fields not provided',
      },
      { status: 400 },
    )
  }

  try {
    const response = await authService.register({
      name,
      phone,
      email,
      password,
    })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
