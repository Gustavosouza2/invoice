import { useCallback } from 'react'
import { Menu } from 'lucide-react'
import axios from 'axios'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconButton } from '@/components/features/Button/IconButton'
import { UserMenu } from '@/components/features/UserMenu'
import { useUserContext } from '@/context/userContext'
import { useSidebar } from '@/components/ui/sidebar'
import { Toast } from '@/components/features/Toast'
import { getSessionToken } from '@/services/token'

export const HeaderDashboard = () => {
  const { toggleSidebar, isMobile } = useSidebar()
  const { userData, handleLogout } = useUserContext()

  const handleSubmitLogout = useCallback(async () => {
    const sessionToken = getSessionToken()

    await axios
      .post(
        '/api/auth/logout',
        { token: sessionToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => handleLogout())
      .catch(() =>
        Toast({
          type: 'error',
          message: 'Falha ao sair',
        }),
      )
  }, [handleLogout])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center h-16 px-4 border-b border-bg-secondary/10 bg-gradient-to-r from-bg-primary to-bg-default shadow-lg">
      {!isMobile && (
        <div className="flex items-center gap-4 mt-3">
          <IconButton
            Icon={<Menu className="h-5 w-5" />}
            onClick={toggleSidebar}
          />
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
            {userData?.name?.slice(0, 2).toUpperCase() || 'AD'}
          </AvatarFallback>
        </Avatar>
        <UserMenu
          name={userData?.name || 'Admin'}
          handleLogout={handleSubmitLogout}
          email={userData?.email || 'Admin@gmail.com'}
        />
      </div>
    </header>
  )
}
