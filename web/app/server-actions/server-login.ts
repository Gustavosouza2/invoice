'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function loginAction(
  prevState: { error?: string; success: boolean } | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      error: 'Email e senha são obrigatórios',
      success: false,
    }
  }

  try {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: 'Email ou senha incorretos', success: false }
    }

    if (!data.session) {
      return { error: 'Falha ao criar sessão', success: false }
    }

    const cookieStore = cookies()
    cookieStore.set('token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      path: '/',
    })

    cookieStore.set(
      'userData',
      JSON.stringify({
        token: data.session.access_token,
        userName: data.user?.phone,
        email: data.user?.email,
        id: data.user?.id,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        path: '/',
      },
    )

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Erro interno do servidor', success: false }
  }
}
