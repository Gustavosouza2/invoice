'use client'
import Link from 'next/link'
import Image from 'next/image'

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
} from '../../../components/ui/sidebar'

import Logo from '../../../assets/images/logo.png'

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
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md mb-10 mt-5 flex justify-center tracking-widest">
        <Image src={Logo} alt="logo" height={40} width={40} quality={100} />
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            disabled={item.isDisabled === true}
            className="group/collapsible text-md"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Link href={item.url} prefetch className="cursor-pointer">
                    <div className="flex justify-between items-center gap-2">
                      {item.icon && <item.icon />}
                      <span className="text-[0.9rem] font-mono text-zinc-300">
                        {item.title}
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
