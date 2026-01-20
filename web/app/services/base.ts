import { getToken, getSessionToken } from './token'

export class BaseApi {
  protected baseUrl: string
  protected token: string | undefined

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl
    this.token = token
  }

  protected async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: this.buildHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Resquest GET failed with status ${response.status}`)
    }

    return response.json()
  }

  protected async post<T, R>(
    path: string,
    body?: T,
    useSessionToken = false,
    customToken?: string,
  ): Promise<R> {
    const headers = this.buildHeaders(useSessionToken, customToken)

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`POST failed with status ${response.status}`)
    }
    return response.json()
  }

  protected async patch<T>(path: string, body?: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: this.buildHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Resquest PATCH failed with status ${response.status}`)
    }

    return response.json()
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Resquest DELETE failed with status ${response.status}`)
    }

    return response.json()
  }

  private buildHeaders(useSessionToken = false, customToken?: string) {
    let token: string | undefined
    if (customToken) {
      token = customToken
    } else {
      token = useSessionToken ? getSessionToken() : getToken()
    }
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }
}
