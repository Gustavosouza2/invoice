import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserMenu } from '@/components/features/UserMenu'
import { useUserContext } from '@/context/userContext'

export const HeaderDashboard = () => {
  const { userData } = useUserContext()

  const email = userData?.email
  const rawUserName = email?.slice(0, 7)

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-end items-center h-16 px-4 border-[#FFFA]/10 bg-[#0F0F10] border-b-2 ">
      <div className="flex flex-row gap-2">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            height={15}
            width={15}
          />
          <AvatarFallback>GS</AvatarFallback>
        </Avatar>
        <UserMenu
          name={rawUserName || 'Admin'}
          email={email || 'Admin@gmail.com'}
        />
      </div>
    </header>
  )
}
