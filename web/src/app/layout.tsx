'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { initGA, logPageView } from '@/utils/ga-analytics'
import Providers from '@/lib/providers/providers'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/Footer'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
