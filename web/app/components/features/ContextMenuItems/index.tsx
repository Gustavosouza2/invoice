'use client'

import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { VscKebabVertical } from 'react-icons/vsc'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ContextMenuItemsProps } from './types'

export const ContextMenuItems = ({ items }: ContextMenuItemsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VscKebabVertical className="w-5 h-5 flex items-center" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center justify-center gap-1.5 flex-col bg-[#09090b] rounded overflow-hidden p-0">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="w-full flex items-center gap-2 px-3 py-2 focus:outline-none hover:bg-zinc-900 cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center">{item.icon()}</div>
            <span className="text-sm font-mono font-medium text-zinc-300">
              {item.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
