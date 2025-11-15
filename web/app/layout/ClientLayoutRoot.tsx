'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Cookies } from 'react-cookie'

import { UserContextProvider } from '../context/userContext'
import { SidebarProvider } from '../components/ui/sidebar'
import { CustomerIcon, HomeIcon } from '../assets/icons'
import AppSidebar from '../components/features/SideBar'
import { Toaster } from '../components/ui/sonner'
import { SWRConfig } from 'swr'
import { swrFetcher } from '@/lib/fetcher'

import '../globals.css'

const navigationItems = [
  {
    title: 'Home',
    url: '/dashboard/home',
    icon: HomeIcon,
  },
  {
    title: 'Clientes',
    url: '/dashboard/customers',
    icon: CustomerIcon,
  },
]

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const cookieStore = new Cookies()
  const pathname = usePathname()

  const user = cookieStore.get('user')
  const token = cookieStore.get('token')

  const handleLogout = async () => {
    cookieStore.remove('token')
    cookieStore.remove('user')
    router.replace('/login')
  }

  return (
    <UserContextProvider token={token} user={user}>
      <SWRConfig
        value={{
          fetcher: swrFetcher,
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <Toaster />
        <SidebarProvider>
          {pathname !== '/login' && pathname !== '/register' && (
            <AppSidebar
              user={user}
              navItems={navigationItems}
              logout={handleLogout}
            />
          )}
          {children}
        </SidebarProvider>
      </SWRConfig>
    </UserContextProvider>
  )
}
