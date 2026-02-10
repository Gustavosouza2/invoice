import { NextResponse } from 'next/server'

import { authService } from '@/services/auth/auth'

export const runtime = 'nodejs'
export const maxDuration = 30

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
    const result = await authService.register({
      name,
      phone,
      email,
      password,
    })
    if (result instanceof Response) {
      return result
    }
    const res = NextResponse.json(
      result ?? { message: 'Registro realizado com sucesso' },
      {
        status: 201,
      },
    )

    if (result?.token) {
      res.cookies.set('token', result.token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    if (result?.jwt) {
      res.cookies.set('access_token', result.jwt, {
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
