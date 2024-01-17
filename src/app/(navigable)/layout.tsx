'use client'
import AuthProvider from '@/lib/providers/auth-provider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <AuthProvider>{children}</AuthProvider>
  )
}

export default Layout
