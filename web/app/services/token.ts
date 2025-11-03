import { decodeJwt, JWTPayload } from 'jose'

let token: string | undefined
let payload: JWTPayload | null = null

export const setToken = (newToken: string) => {
  token = newToken
  payload = decodeToken()
}

export const getToken = () => token

export const getPayload = (): JWTPayload | null => payload

export function clearToken() {
  token = undefined
  payload = null
}

export function decodeToken(): JWTPayload | null {
  if (!token) return null

  try {
    return decodeJwt(token)
  } catch {
    return null
  }
}
