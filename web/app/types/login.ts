import { Session, User, WeakPassword } from '@supabase/supabase-js'

export interface LoginResponseSuccess {
  user: User
  session: Session
  weakPassword?:
    | WeakPassword
    | undefined
    | { user: null; session: null; weakPassword?: null | undefined }
}
