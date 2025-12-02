import * as React from 'react'

import type { SideBarProps } from './type'
import { NavMain } from './NavMain'
import {
  SidebarContent,
  SidebarRail,
  Sidebar,
} from '../../../components/ui/sidebar'

export default function AppSidebar({ navItems }: SideBarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="w-52 border-bg-secondary/10 bg-transparent"
    >
      <SidebarContent className="bg-gradient-to-b from-bg-primary to-bg-default">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
