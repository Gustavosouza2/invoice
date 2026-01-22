'use client'
import Image from 'next/image'
import Link from 'next/link'

import {
  CollapsibleTrigger,
  Collapsible,
} from '../../../components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
  useSidebar,
} from '../../../components/ui/sidebar'
import Logo from '@/assets/images/logo.png'

export function NavMain({
  items,
}: {
  items: {
    icon?: () => JSX.Element
    isDisabled?: boolean
    isActive?: boolean
    title: string
    url: string
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { state } = useSidebar()
  const isSideBarOpen = state === 'collapsed'

  return (
    <SidebarGroup className={`${isSideBarOpen && 'mt-10'}`}>
      <SidebarGroupLabel className="text-md mb-10 mt-20 flex justify-center tracking-widest">
        <Image alt="Logo" src={Logo} quality={100} height={50} />
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            asChild
            key={item.title}
            defaultOpen={item.isActive}
            disabled={item.isDisabled === true}
            className="group/collapsible text-md"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-text-tertiary bg-transparent transition-all duration-200 group rounded-lg">
                  <Link
                    prefetch
                    href={item.url}
                    className="cursor-pointer w-full"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        <span className="hover:text-text-secondary text-text-tertiary ">
                          <item.icon />
                        </span>
                      )}
                      <span className="text-[1rem] font-inter hover:text-text-secondary font-normal">
                        {item.title.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
