'use client'

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'

import type { User, UserData } from '@/types/user'

type UserContextProps = {
  handleLogin: (data: { user: User; token: string }) => void
  push: (path: string) => void
  userData: UserData | null
  handleLogout: () => void
  token: string | null
}

export const UserContext = createContext<UserContextProps>({
  handleLogout: () => {},
  handleLogin: () => {},
  push: () => {},
  userData: null,
  token: null,
})

export const UserContextProvider: React.FC<{
  children?: ReactNode
  token?: string
}> = ({ token: tokenCookie = '', children }) => {
  const [userData, setUserData] = useState<UserData | null>(null)

  const { push, replace } = useRouter()
  const [token, setToken] = useState<string | null>(tokenCookie || null)

  const handleLogin = useCallback(
    ({ user, token }: { user: User; token: string }) => {
      setUserData({
        name: user.name,
        email: user.email ?? '',
        id: user.id,
      })
      setToken(token)
    },
    [],
  )

  const handleLogout = useCallback(() => {
    setToken(null)
    setUserData(null)

    replace('/login')
  }, [replace])

  const contextValue = useMemo(
    () => ({
      push,
      token,
      userData,
      handleLogin,
      handleLogout,
    }),
    [token, userData, handleLogin, handleLogout, push],
  )
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
