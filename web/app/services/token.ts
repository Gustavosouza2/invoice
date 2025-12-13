import { decodeJwt, JWTPayload } from 'jose'

let jwtToken: string | undefined
let payload: JWTPayload | null = null
let sessionToken: string | undefined

export const setToken = (newToken: string) => {
  jwtToken = newToken
  payload = decodeToken()
}

export const setSessionToken = (token: string) => {
  sessionToken = token
}

export const getToken = () => jwtToken

export const getSessionToken = () => sessionToken

export const getPayload = (): JWTPayload | null => payload

export function clearToken() {
  jwtToken = undefined
  sessionToken = undefined
  payload = null
}

export function decodeToken(): JWTPayload | null {
  if (!jwtToken) return null

  try {
    return decodeJwt(jwtToken)
  } catch {
    return null
  }
}
