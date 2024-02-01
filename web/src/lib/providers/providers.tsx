'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import ToastProvider from '@/lib/providers/toast.provider'
import { ThemeProvider } from './theme-provider'
import ClientThemeProvider from './client-theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import getClientSideQueryClient from '@/react-query/client/queryClient'
const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => getClientSideQueryClient())
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ToastProvider>
                    <ThemeProvider attribute='class'>
                        <ClientThemeProvider>
                            {children}
                        </ClientThemeProvider>
                    </ThemeProvider>
                </ToastProvider>
            </QueryClientProvider>

        </SessionProvider>

    )
}

export default Providers
