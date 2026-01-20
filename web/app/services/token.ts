import { decodeJwt, JWTPayload } from 'jose'

const SESSION_TOKEN_KEY = 'session_token'
const JWT_TOKEN_KEY = 'jwt_token'

let serverJwtToken: string | undefined
let serverSessionToken: string | undefined

let payload: JWTPayload | null = null

export const setToken = (newToken: string) => {
  serverJwtToken = newToken

  if (typeof window !== 'undefined') {
    localStorage.setItem(JWT_TOKEN_KEY, newToken)
  }
  payload = decodeToken()
}

export const setSessionToken = (token: string) => {
  serverSessionToken = token

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_TOKEN_KEY, token)
  }
}

export const getToken = () => {
  if (serverJwtToken) {
    return serverJwtToken
  }

  if (typeof window !== 'undefined') {
    return localStorage.getItem(JWT_TOKEN_KEY) ?? undefined
  }
  return undefined
}

export const getSessionToken = () => {
  if (serverSessionToken) {
    return serverSessionToken
  }

  if (typeof window !== 'undefined') {
    return localStorage.getItem(SESSION_TOKEN_KEY) ?? undefined
  }
  return undefined
}

export const getPayload = (): JWTPayload | null => payload

export function clearToken() {
  serverJwtToken = undefined
  serverSessionToken = undefined
  payload = null

  if (typeof window !== 'undefined') {
    localStorage.removeItem(JWT_TOKEN_KEY)
    localStorage.removeItem(SESSION_TOKEN_KEY)
  }
}

export function decodeToken(): JWTPayload | null {
  const token = getToken()
  if (!token) return null

  try {
    return decodeJwt(token)
  } catch {
    return null
  }
}
