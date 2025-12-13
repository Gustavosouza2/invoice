'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { SidebarProvider } from '../components/ui/sidebar'
import { CustomerIcon, HomeIcon } from '../assets/icons'
import AppSidebar from '../components/features/SideBar'

import '../globals.css'

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

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

  return (
    <SidebarProvider>
      {pathname !== '/login' && pathname !== '/register' && (
        <AppSidebar navItems={navigationItems} />
      )}
      {children}
    </SidebarProvider>
  )
}
