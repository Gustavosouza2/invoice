import axios, { AxiosError, AxiosInstance } from 'axios'

import { getToken } from '@/services/token'

function createAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  })

  instance.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status
      const message =
        (error.response?.data as { message: string })?.message ||
        error.message ||
        'Unexpected error'
      const normalized = new Error(message) as Error & {
        status?: number
        cause?: unknown
      }
      normalized.status = status
      normalized.cause = error
      return Promise.reject(normalized)
    },
  )

  return instance
}

export const axiosClient = createAxios()

export async function swrFetcher<T = unknown>(url: string): Promise<T> {
  const res = await axiosClient.get<T>(url)
  return res.data
}
