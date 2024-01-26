'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import ToastProvider from '@/lib/providers/toast.provider'
import { ThemeProvider } from './theme-provider'
import ClientThemeProvider from './client-theme-provider'
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <ToastProvider>
                <ThemeProvider attribute='class'>
                    <ClientThemeProvider>
                        {children}
                    </ClientThemeProvider>
                </ThemeProvider>
            </ToastProvider>
        </SessionProvider>

    )
}

export default Providers
