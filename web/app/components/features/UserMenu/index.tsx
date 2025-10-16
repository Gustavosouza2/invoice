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
      <PopoverTrigger
        asChild
        className="md:mr-16 bg-transparent border-1 border-[#FFFA]/10 hover:bg-[#1E1E20] hover:text-[#373738]"
      >
        <Button variant="outline" size="icon" className="hover:bg-transparent">
          <ChevronDown className="text-[#fafafaaf]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex border-[#FFFA]/10 bg-[#0E0E10] mr-10 mt-2 rounded-xl">
        <div className=" flex-col gap-2 justify-end items-center">
          <div className="flex flex-row gap-2">
            <p className="text-[#fafafaaf] text-sm font-mono font-semibold">
              Name:
            </p>
            <p className="text-[#fafafaaf] text-sm font-mono font-light">
              {name}
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <p className="text-[#fafafaaf] text-sm font-mono font-semibold">
              Email:
            </p>
            <p className="text-[#fafafaaf] text-sm font-mono font-light">
              {email}
            </p>
          </div>

          <div className="flex row items-center gap-2 mt-2" aria-disabled>
            <LogOut className="w-4 h-4 text-[#fafafa]" />
            <Link
              href=""
              className="text-[#fafafa] text-sm font-mono font-bold"
            >
              Sair (Em breve!)
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
