import type { Metadata } from 'next'

import ClientLayoutRoot from './layout/ClientLayoutRoot'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Kuro',
    default: 'Kuro',
  },
}

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: true,
})

const inter = Inter({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  fallback: ['sans-serif'],
  subsets: ['latin'],
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.className} ${inter.className}`}>
      <body className="bg-bg-default flex w-screen h-screen overflow-hidden">
        <ClientLayoutRoot>{children}</ClientLayoutRoot>
      </body>
    </html>
  )
}
