import * as React from 'react'
import Link from 'next/link'

import { Icons } from './Icons'
import { cn } from '../../../lib/utils'

const navItems = [
  {
    label: 'Home',
    href: '/dashboard/home',
    icon: Icons.home,
  },
  {
    label: 'Clientes',
    href: '/dashboard/customers',
    icon: Icons.customer,
  },
  {
    label: 'Pedidos',
    href: '/dashboard/orders',
    icon: Icons.orders,
    disabled: true,
  },
  {
    label: 'Menu',
    href: '/dashboard/menu',
    icon: Icons.menu,
  },
]

export function NavItems() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#1E1E20] border-t-2 border-[#a1a1aa28]">
      <nav className="flex flex-row items-center justify-around p-4 ">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="w-4rem rounded-lg hover:bg-transparent"
          >
            <Link
              href={item.href}
              className={cn(
                item.disabled && 'opacity-50  cursor-not-allowed',
                'flex flex-col items-center',
              )}
            >
              <item.icon
                className={cn(
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  'h-7 w-7 cursor-pointer ',
                )}
                aria-disabled={item.disabled}
              />
              <span
                className={cn(
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  'text-sm text-gray-400',
                )}
              >
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}
