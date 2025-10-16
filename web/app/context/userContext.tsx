'use client'

import { LoginResponseSuccess } from '@/types/login'
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { useRouter } from 'next/navigation'
import { UserData } from '@/types/user'

type UserContextProps = {
  handleLogin: (e: LoginResponseSuccess) => void
  userData: UserData | null
  handleLogout: () => void
  token: string | null
  push: (path: string) => void
}

export const UserContext = createContext<UserContextProps>({
  handleLogout: () => {},
  handleLogin: () => {},
  userData: null,
  token: null,
  push: () => {},
})

export const UserContextProvider: React.FC<{
  children?: ReactNode
  user: UserData
  token: string
}> = ({ token: tokenCookie, user, children }) => {
  const [userData, setUserData] = useState<UserContextProps['userData']>(
    user ?? null,
  )

  const { push, replace } = useRouter()

  const [token, setToken] = useState<string | null>(tokenCookie)

  useEffect(() => {
    if (!userData && user) setUserData(user)
  }, [userData, user])

  const handleLogin = useMemo(
    () =>
      ({ user, session }: LoginResponseSuccess) => {
        setUserData({ userName: user.phone, email: user.email, id: user.id })
        setToken(session.access_token)
        return push('/dashboard/home')
      },
    [push],
  )

  const handleLogout = useMemo(
    () => () => {
      setToken(null)
      setUserData(null)
      replace('/login')
    },
    [replace],
  )

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
