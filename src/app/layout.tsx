'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { initGA, logPageView } from '@/utils/ga-analytics'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initGA();
    logPageView();
  }, [])
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
