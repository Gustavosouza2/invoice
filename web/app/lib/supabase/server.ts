import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {}
        },
      },
    },
  )
}

export async function getServerUser() {
  const supabase = await createSupabaseServerClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error('Erro ao obter usuário:', error)
      return null
    }

    return user
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error)
    return null
  }
}

export async function getServerUserProfile() {
  const supabase = await createSupabaseServerClient()
  const user = await getServerUser()

  if (!user) return null

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Erro ao obter perfil:', error)
      return null
    }

    return profile
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }
}

export async function getServerSession() {
  const supabase = await createSupabaseServerClient()

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error('Erro ao obter sessão:', error)
      return null
    }

    return session
  } catch (error) {
    console.error('Erro ao verificar sessão:', error)
    return null
  }
}
