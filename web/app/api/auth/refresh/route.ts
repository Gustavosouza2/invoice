import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { authService } from '@/services/auth/auth'

export async function POST() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('token')?.value

  if (!sessionToken) {
    return NextResponse.json(
      {
        message: 'Missing session token',
      },
      { status: 401 },
    )
  }

  try {
    const response = await authService.refreshToken({ token: sessionToken })

    if (!response?.success) {
      return NextResponse.json(
        { message: 'Failed to refresh token' },
        { status: 401 },
      )
    }

    const res = NextResponse.json(response, { status: 200 })
    if (response?.jwt) {
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
