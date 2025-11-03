'use client'

import { redirect, usePathname } from 'next/navigation'
import { Poppins } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Cookies } from 'react-cookie'

import { UserContextProvider } from '../context/userContext'
import { SidebarProvider } from '../components/ui/sidebar'
import { CustomerIcon, HomeIcon } from '../assets/icons'
import AppSidebar from '../components/features/SideBar'
import { Toaster } from '../components/ui/sonner'

import '../styles/globals.css'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: true,
})

const inter = Inter({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: true,
})

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
  const cookieStore = new Cookies()
  const pathname = usePathname()

  const user = cookieStore.get('user')
  const token = cookieStore.get('token')

  const handleLogout = async () => {
    cookieStore.remove('token')
    cookieStore.remove('user')
    redirect('/login')
  }

  return (
    <UserContextProvider token={token} user={user}>
      <html lang="pt-BR" className={`${poppins.className} ${inter.className}`}>
        <body className="bg-bg-default flex w-screen h-screen overflow-hidden">
          <Toaster />
          <SidebarProvider>
            {pathname !== '/login' && (
              <AppSidebar
                user={user}
                navItems={navigationItems}
                logout={handleLogout}
              />
            )}
            {children}
          </SidebarProvider>
        </body>
      </html>
    </UserContextProvider>
  )
}
