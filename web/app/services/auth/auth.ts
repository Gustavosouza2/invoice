import { clearToken, setToken } from '../token'
import { BaseApi } from '../base'
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from './types'

export class AuthAPI extends BaseApi {
  public async login({ email, password }: LoginRequest) {
    const response = await this.post<LoginRequest, LoginResponse>(
      '/auth/login',
      { email, password },
    )

    if (response?.token) {
      setToken(response.token)
      return response
    }
  }

  public async logout({ token }: LogoutRequest) {
    const response = await this.post<LogoutRequest, LogoutResponse>(
      '/auth/logout',
      { token },
    )

    if (response.success) clearToken()
  }

  public async register({ email, name, password, phone }: RegisterRequest) {
    const response = await this.post<RegisterRequest, RegisterResponse>(
      '/auth/register',
      { email, name, password, phone },
    )

    if (response.success) return response
  }
}

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000'
export const authService = new AuthAPI(baseUrl)
