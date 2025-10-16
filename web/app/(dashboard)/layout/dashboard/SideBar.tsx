import * as React from 'react'
import Link from 'next/link'

import {
  Sidebar as SideBarShad,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from '@/components/ui/sidebar'

import { CustomerIcon, HomeIcon } from '@/assets/icons'

interface NavItem {
  icon: () => JSX.Element
  disabled?: boolean
  external?: boolean
  title: string
  href?: string
}

export const Sidebar = () => {
  const items: NavItem[] = React.useMemo(
    () => [
      {
        title: 'Home',
        href: '/dashboard/home',
        icon: HomeIcon,
      },
      {
        title: 'Clientes',
        href: '/dashboard/customers',
        icon: CustomerIcon,
      },
    ],
    [],
  )
  return (
    <SideBarShad className="border-[#FFFA]/10 bg-transparent w-36">
      <SidebarContent className="bg-[#121214]">
        <SidebarGroup>
          <SidebarGroupLabel>Kuro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-[#fafafaaf] hover:bg-[#1E1E20] hover:text-[#373738] bg-transparent"
                  >
                    <Link href={item.href ?? ''} aria-disabled={item.disabled}>
                      <item.icon />
                      <span className="font-mono font-semibold ">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SideBarShad>
  )
}
