import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Çalışma Mekanları',
  description: 'Şehrinizdeki çalışma mekanlarını gösteren web uygulaması',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={`${inter.className} bg-brown-dark`}>{children}</body>
    </html>
  )
}
