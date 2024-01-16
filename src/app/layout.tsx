'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import { initGA, logPageView } from '@/utils/ga-analytics'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
  params: { session, ...params }
}: {
  children: React.ReactNode,
  params: any
}) {
  useEffect(() => {
    initGA();
    logPageView();
  }, [])
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <SessionProvider session={session} >
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
