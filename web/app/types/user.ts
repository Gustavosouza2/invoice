export interface User {
  image: string | null | undefined
  emailVerified: boolean
  updatedAt: Date
  createdAt: Date
  email: string
  name: string
  id: string
}

export type UserData = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified' | 'image'
>
