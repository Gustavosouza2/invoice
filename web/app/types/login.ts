import type { User } from './user'

export interface LoginResponseSuccess {
  success: boolean
  message: string
  token: string
  jwt: string
  user: User
}
