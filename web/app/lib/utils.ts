import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getApiBaseUrl } from '@/lib/env'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the current app origin (useful for server-side absolute URLs).
 * - On the client: window.location.origin
 * - On Vercel (server): https://$VERCEL_URL
 * - Local fallback: http://localhost:3000
 */
export function getAppOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  const vercelUrl = process.env.VERCEL_URL?.trim()
  if (vercelUrl) return `https://${vercelUrl}`

  return 'http://localhost:3000'
}

/**
 * Builds an API URL against the backend (Render).
 */
export function getApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}
