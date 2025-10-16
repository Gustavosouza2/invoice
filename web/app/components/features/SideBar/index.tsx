import * as React from 'react'

import {
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  Sidebar,
} from '../../../components/ui/sidebar'

import { NavMain } from './NavMain'
import { NavUser } from './NavUser'

type SideBarProps = {
  navItems: {
    icon?: () => React.JSX.Element
    isActive?: boolean
    title: string
    url: string
    items?: {
      title: string
      url: string
    }[]
  }[]

  user: {
    name: string
    email: string
  }

  logout: () => Promise<void>
}
export default function AppSidebar({ navItems, user, logout }: SideBarProps) {
  return (
    <Sidebar collapsible="icon" className="w-52 bg-[#0F0F10]">
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
