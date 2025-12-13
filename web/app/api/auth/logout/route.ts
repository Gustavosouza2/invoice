import { NextResponse } from 'next/server'

import { authService } from '@/services/auth/auth'

export async function POST(req: Request) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ message: 'Token not provided' }, { status: 400 })
  }

  try {
    const response = await authService.logout({ token }, token)

    const res = NextResponse.json(response, { status: 200 })
    res.cookies.delete('token')
    res.cookies.delete('access_token')

    return res
  } catch (error) {
    console.error('Logout error:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
