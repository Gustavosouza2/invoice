import { ReactNode } from 'react'

import { HeaderLogin } from './Header'

export async function LoginLayoutComponent({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderLogin />
      <main className="flex-1">{children}</main>
    </div>
  )
}
