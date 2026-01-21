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
      <DropdownMenuTrigger className="outline-none focus:outline-none p-1 hover:opacity-80 transition-opacity">
        <VscKebabVertical className="w-5 h-5 text-gray-400 hover:text-gray-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex items-center justify-center gap-1.5 flex-col
        border border-accent/20
        bg-gradient-to-br from-bg to-bg-primary rounded-xl overflow-hidden p-0"
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="w-full flex items-center gap-2 px-3 py-2 focus:outline-none cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center hover:text-text-secondary">
              {item.icon()}
            </div>
            <span className="text-sm font-inter font-medium text-text-tertiary hover:text-text-secondary">
              {item.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
