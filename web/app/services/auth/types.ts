import { type User } from '@/types/user'

export type LoginRequest = {
  password: string
  email: string
}

export type LoginResponse = {
  success: boolean
  token: string
  jwt: string
  user: User
}

export type LogoutRequest = {
  token: string
}

export type LogoutResponse = {
  success: boolean
}

export type RegisterRequest = {
  password: string
  phone: string
  email: string
  name: string
}

export type RegisterResponse = {
  success: boolean
  token: string
  jwt: string
  user: User
}

export type RefreshTokenRequest = {
  token: string
}

export type RefreshTokenResponse = {
  success: boolean
  token: string
  jwt: string
}
