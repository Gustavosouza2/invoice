'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

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
