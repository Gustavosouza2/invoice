import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '../../ui/button'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface UserMenuProps {
  name: string | null
  email: string | null
}
export const UserMenu = ({ email, name }: UserMenuProps) => {
  return (
    <Popover>
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
        className="flex border-bg-secondary/40 bg-gradient-to-br from-bg-default to-bg-primary mr-10 mt-2 rounded-xl shadow-xl w-64"
        align="end"
      >
        <div className="flex flex-col gap-3 py-2">
          <div className="flex flex-row items-center gap-1">
            <p className="text-text-primary text-sm font-inter font-semibold">
              Nome:
            </p>
            <p className="text-text-tertiary text-sm font-inter font-medium">
              {name || 'Admin'}
            </p>
          </div>

          <div className="flex flex-row items-center gap-1 pb-2 border-b border-bg-secondary/20">
            <p className="text-text-primary text-sm font-inter font-semibold">
              Email:
            </p>
            <p className="text-text-tertiary text-sm font-inter font-medium">
              {email || 'Admin'}
            </p>
          </div>

          <div
            className="flex items-center gap-2 cursor-not-allowed opacity-60"
            aria-disabled
          >
            <LogOut className="w-4 h-4 text-text-tertiary" />
            <Link
              href=""
              className="text-text-tertiary text-sm font-inter font-medium"
            >
              Sair (Em breve!)
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
