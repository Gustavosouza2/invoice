import { NextResponse } from 'next/server'

import { authService } from '@/services/auth/auth'

export async function POST(req: Request) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ message: 'Token not provided' }, { status: 400 })
  }

  try {
    const response = await authService.logout({ token })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
