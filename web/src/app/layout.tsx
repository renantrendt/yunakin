'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { initGA, logPageView } from '@/utils/ga-analytics'
import Providers from '@/lib/providers/providers'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { cn } from '@/utils/cn'
import Head from 'next/head'
const inter = Inter({ preload: false, weight: 'variable', subsets: ['latin'] })

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
    <html lang="en" >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={cn(inter.className, "min-h-screen", "h-screen")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  )
}
