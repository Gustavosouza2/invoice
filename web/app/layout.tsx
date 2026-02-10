import type { Metadata } from 'next'

import { Poppins, Inter } from 'next/font/google'
import { Providers } from './layout/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | FiscalOwl',
    default: 'FiscalOwl',
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
      <body className="bg-gradient-to-br from-bg-primary via-bg-default to-bg-primary min-h-dvh w-full overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
