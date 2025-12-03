import * as React from 'react'
import Link from 'next/link'

import { cn } from '../../../lib/utils'
import { Icons } from './Icons'

const navItems = [
  {
    label: 'Home',
    href: '/dashboard/home',
    icon: Icons.home,
  },
  {
    label: 'Notas',
    href: '/dashboard/invoices',
    icon: Icons.customer,
  },
]

export function NavItems() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-12 border-t border-bg-secondary/10 bg-gradient-to-r from-bg-primary to-bg-default shadow-lg">
      <nav className="flex flex-row items-center  justify-around p-4 ">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="w-4rem rounded-lg hover:bg-transparent"
          >
            <Link href={item.href} className={cn('flex flex-col items-center')}>
              <item.icon className={cn('h-6 w-6 cursor-pointer ')} />
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}
