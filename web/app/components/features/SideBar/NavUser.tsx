'use client'

import { ChevronsUpDown, LogOut } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar'
import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '../../../components/ui/dropdown-menu'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  useSidebar,
} from '../../../components/ui/sidebar'

export const AvatarComponent = () => {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        height={15}
        width={15}
      />
      <AvatarFallback>Admin</AvatarFallback>
    </Avatar>
  )
}

export function NavUser({
  user,
  logout,
}: {
  user: {
    name: string
    email: string
  }
  logout: () => Promise<void>
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu className="rounded">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {AvatarComponent()}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold font-mono text-[#D1D1D2]">
                  {user?.name || 'Admin'}
                </span>
                <span className="text-xs font-mono text-[#D1D1D2]">
                  {user?.email || 'Admin@gmail.com'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded bg-[#0F0F10]"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
            align="end"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {AvatarComponent()}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.name || 'Admin'}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email || 'Admin@gmail.com'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled
              onClick={() => logout()}
              className="cursor-pointer"
            >
              <LogOut />
              Sair (Em breve!)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
