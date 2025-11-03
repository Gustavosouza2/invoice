import { NextResponse } from 'next/server'

import { authService } from '@/services/auth/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  console.log({
    email,
    password,
  })

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 })
  }

  if (!password) {
    return NextResponse.json(
      { message: 'Password is required' },
      { status: 400 },
    )
  }

  try {
    const response = await authService.login({ email, password })

    if (!response) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 },
      )
    }

    const res = NextResponse.json(response, { status: 200 })
    // Set auth token cookie for middleware
    if (response.token) {
      res.cookies.set('token', response.token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }
    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
