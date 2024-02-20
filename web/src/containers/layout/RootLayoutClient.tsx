'use client'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { initGA, logPageView } from '@/utils/ga-analytics'
import Providers from '@/lib/providers/providers'
import React from 'react'
import { cn } from '@/utils/cn'
const inter = Inter({ preload: false, weight: 'variable', subsets: ['latin'] })

export default function RootLayoutClient({
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
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        const listener = () => {
            // We execute the same script as before
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])
    console.log(params.monaSans.variable)
    return (
        <html lang="en" >
            <body className={cn(inter.className, params.monaSans.variable)}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html >
    )
}
