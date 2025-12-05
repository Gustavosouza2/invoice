'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { Cookies } from 'react-cookie'
import { SWRConfig } from 'swr'

import { setToken } from '@/services/token'
import { swrFetcher } from '@/lib/fetcher'

import { UserContextProvider } from '../context/userContext'
import { SidebarProvider } from '../components/ui/sidebar'
import { CustomerIcon, HomeIcon } from '../assets/icons'
import AppSidebar from '../components/features/SideBar'
import { Toaster } from '../components/ui/sonner'

import '../globals.css'

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = new Cookies()
  const pathname = usePathname()

  const user = cookieStore.get('user')
  const token = cookieStore.get('access_token') ?? cookieStore.get('token')

  const navigationItems = useMemo(
    () => [
      {
        title: 'Home',
        url: '/dashboard/home',
        icon: HomeIcon,
      },
      {
        title: 'Notas',
        url: '/dashboard/invoices',
        icon: CustomerIcon,
      },
    ],
    [],
  )

  useEffect(() => {
    if (token) setToken(token)
  }, [token])

  return (
    <UserContextProvider token={token} user={user}>
      <SWRConfig
        value={{
          fetcher: swrFetcher,
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <NuqsAdapter>
          <Toaster />
          <SidebarProvider>
            {pathname !== '/login' && pathname !== '/register' && (
              <AppSidebar navItems={navigationItems} />
            )}
            {children}
          </SidebarProvider>
        </NuqsAdapter>
      </SWRConfig>
    </UserContextProvider>
  )
}
