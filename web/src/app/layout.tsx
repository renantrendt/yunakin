import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import RootLayoutClient from '@/containers/layout/RootLayoutClient'
import localFont from 'next/font/local'
const monaSans = localFont({ src: './fonts/Mona-Sans-Light.otf', variable: "--font-coming-soon" });
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
export default function RootLayout({
  children,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { session, ...params }
}: {
  children: React.ReactNode
  params: any
}) {
  return (
    <RootLayoutClient params={{ ...params, monaSans }}>
      {children}
    </RootLayoutClient>
  )
}
