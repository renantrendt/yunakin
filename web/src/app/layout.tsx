import React from 'react'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import RootLayoutClient from '@/containers/layout/RootLayoutClient'
import localFont from 'next/font/local'
const monaSans = localFont({ src: './fonts/Mona-Sans-Light.otf', variable: "--font-coming-soon" });

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
