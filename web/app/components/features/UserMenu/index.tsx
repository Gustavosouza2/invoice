import { ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Button } from '../../ui/button'

type UserMenuProps = {
  name: string | null
  email: string | null
  handleLogout: () => void
}

export const UserMenu = ({ email, name, handleLogout }: UserMenuProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setOpen(false)
    handleLogout()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary transition-all duration-200 rounded-xl"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex border-bg-secondary/40 bg-gradient-to-br from-bg-default to-bg-primary
        mr-10 mt-2 rounded-xl shadow-xl w-auto"
        align="end"
      >
        <div className="flex flex-col gap-3 py-2">
          <div className="flex items-center gap-1">
            <p className="text-text-primary text-sm font-inter font-semibold">
              Nome:
            </p>
            <p className="text-text-tertiary text-sm font-inter font-medium">
              {name || 'Admin'}
            </p>
          </div>

          <div className="flex items-center gap-1 pb-5">
            <p className="text-text-primary text-sm font-inter font-semibold">
              Email:
            </p>
            <p className="text-text-tertiary text-sm font-inter font-medium">
              {email || 'Admin'}
            </p>
          </div>

          <button
            className="flex justify-end items-center gap-2 mt-1 cursor-pointer hover:opacity-80 transition-opacity w-full"
            onClick={handleLogoutClick}
            type="button"
          >
            <span className="text-text-secondary text-sm font-inter font-medium">
              Sair
            </span>
            <LogOut className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
