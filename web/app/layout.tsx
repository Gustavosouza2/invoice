import type { Metadata } from 'next'

import ClientLayoutRoot from './layout/ClientLayoutRoot'
import './styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Kuro',
    default: 'Kuro',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayoutRoot>{children}</ClientLayoutRoot>
}
