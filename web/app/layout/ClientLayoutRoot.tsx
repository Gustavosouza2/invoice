'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { InvoiceIcon } from '@/assets/icons/InvoiceIcon'
import { HomeIcon } from '@/assets/icons/HomeIcon'

import { SidebarProvider } from '../components/ui/sidebar'
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
        icon: () => (
          <InvoiceIcon className="hover:text-text-secondary transition-all duration-100" />
        ),
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
