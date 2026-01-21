import { NextResponse } from 'next/server'

import { authService } from '@/services/auth/auth'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { email, password } = await req.json()

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
    if (response.token) {
      res.cookies.set('token', response.token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    if (response.jwt) {
      res.cookies.set('access_token', response.jwt, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
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
