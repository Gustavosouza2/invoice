import { BaseApi } from '../base'
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types'
import { getApiBaseUrl } from '@/lib/env'

export class AuthAPI extends BaseApi {
  public async login({ email, password }: LoginRequest) {
    const response = await this.post<LoginRequest, LoginResponse>(
      '/auth/login',
      { email, password },
    )
    return response
  }

  public async logout({ token }: LogoutRequest, customToken?: string) {
    const response = await this.post<LogoutRequest, LogoutResponse>(
      '/auth/logout',
      { token },
      true,
      customToken,
    )
    return response
  }

  public async register({ email, name, password, phone }: RegisterRequest) {
    const response = await this.post<RegisterRequest, RegisterResponse>(
      '/auth/register',
      { email, name, password, phone },
    )

    if (response.success) return response
  }

  public async refreshToken({ token }: RefreshTokenRequest) {
    const response = await this.post<undefined, RefreshTokenResponse>(
      '/auth/refresh',
      undefined,
      true,
      token,
    )

    if (response.success) return response
  }
}

const baseUrl = getApiBaseUrl()
export const authService = new AuthAPI(baseUrl)
