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
    icon: Icons.invoice,
  },
]

export function NavItems() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-14 border-t border-accent/10 bg-gradient-to-r from-bg-primary to-bg shadow-lg">
      <nav className="flex flex-row items-center justify-around px-4 py-2 mt-3">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex-1 flex justify-center rounded-lg hover:bg-transparent"
          >
            <Link
              href={item.href}
              className={cn('flex flex-col items-center gap-1 w-full')}
            >
              <item.icon
                className={cn(
                  'h-6 w-6 cursor-pointer text-text-tertiary hover:text-text-secondary transition-all duration-100',
                )}
              />
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}
