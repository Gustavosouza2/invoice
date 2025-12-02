import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserMenu } from '@/components/features/UserMenu'
import { useUserContext } from '@/context/userContext'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export const HeaderDashboard = () => {
  const { toggleSidebar, isMobile } = useSidebar()
  const { userData } = useUserContext()

  const email = userData?.email
  const rawUserName = email?.slice(0, 7)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center h-16 px-4 border-b border-bg-secondary/10 bg-gradient-to-r from-bg-primary to-bg-default shadow-lg">
      {!isMobile && (
        <div className="flex items-center gap-4 mt-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleSidebar}
            className="text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary rounded-xl transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex flex-row items-center gap-3 mt-3">
        <Avatar className="h-8 w-8 border border-bg-secondary/20">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            height={32}
            width={32}
          />
          <AvatarFallback className="bg-bg-tertiary text-text-primary text-xs">
            {rawUserName?.slice(0, 2).toUpperCase() || 'AD'}
          </AvatarFallback>
        </Avatar>
        <UserMenu
          name={rawUserName || 'Admin'}
          email={email || 'Admin@gmail.com'}
        />
      </div>
    </header>
  )
}
