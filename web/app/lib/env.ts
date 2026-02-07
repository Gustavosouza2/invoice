type AppEnv = 'LOCAL' | 'PRODUCTION'

function normalizeAppEnv(value: string | undefined): AppEnv | undefined {
  const v = value?.trim().toUpperCase()
  if (v === 'LOCAL' || v === 'PRODUCTION') return v
  return undefined
}

/**
 * Feature flag:
 * - Prefer explicit NEXT_PUBLIC_APP_ENV=LOCAL|PRODUCTION
 * - Fallback to Vercel's VERCEL_ENV (development|preview|production)
 * - Fallback to NODE_ENV
 */
export const APP_ENV: AppEnv = (() => {
  const explicit = normalizeAppEnv(process.env.NEXT_PUBLIC_APP_ENV)
  if (explicit) return explicit

  const vercelEnv = process.env.VERCEL_ENV?.trim().toLowerCase()
  if (vercelEnv === 'production') return 'PRODUCTION'
  if (vercelEnv === 'preview' || vercelEnv === 'development') return 'LOCAL'

  return process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'LOCAL'
})()

export const IS_PRODUCTION = APP_ENV === 'PRODUCTION'
export const IS_LOCAL = APP_ENV === 'LOCAL'

/**
 * API base URL (Render).
 *
 * Prefer setting `NEXT_PUBLIC_API_BASE_URL` on Vercel (Production/Preview/Dev).
 * We keep backward-compat with `NEXT_PUBLIC_BASE_URL` used in older code.
 */
export function getApiBaseUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL

  if (fromEnv && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/+$/, '')
  }

  // Safe defaults for local dev only
  if (IS_LOCAL) return 'http://localhost:3001'

  // In production, require an explicit env (avoid silently calling localhost)
  throw new Error(
    'Missing NEXT_PUBLIC_API_BASE_URL (or legacy NEXT_PUBLIC_BASE_URL) in production.',
  )
}

