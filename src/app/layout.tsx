'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { initGA, logPageView } from '@/utils/ga-analytics'
import Providers from '@/lib/providers/providers'
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({
  children,
  params: { session, ...params }
}: {
  children: React.ReactNode
  params: any
}) {
  useEffect(() => {
    initGA()
    logPageView()
  }, [])
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
