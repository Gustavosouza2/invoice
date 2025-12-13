'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Cookies } from 'react-cookie'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'

import { UserContextProvider } from '@/context/userContext'
import { Toaster } from '@/components/ui/sonner'
import { setToken } from '@/services/token'
import { swrFetcher } from '@/lib/fetcher'

export function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = new Cookies()
  const accessToken = cookieStore.get('access_token')?.value

  useEffect(() => {
    if (accessToken) setToken(accessToken)
  }, [accessToken])

  return (
    <UserContextProvider token={accessToken}>
      <SWRConfig
        value={{
          fetcher: swrFetcher,
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <NuqsAdapter>
          <Toaster />
          {children}
        </NuqsAdapter>
      </SWRConfig>
    </UserContextProvider>
  )
}
