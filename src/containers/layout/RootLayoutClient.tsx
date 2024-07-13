'use client'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { initGA, logPageView } from '@/utils/ga-analytics'
import Providers from '@/lib/providers/providers'
import React from 'react'
import { cn } from '@/utils/cn'
import Script from 'next/script'
const inter = Inter({ preload: false, weight: 'variable', subsets: ['latin'] })
import { Open_Sans, Roboto, Poppins, Fraunces } from "next/font/google"


const open_sans = Open_Sans({ subsets: ['latin'], variable: "--font-open-sans" });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'], variable: "--font-roboto" });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500'], variable: "--font-poppins" });
const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '500'], variable: "--font-fraunces" });

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
    return (
        <html lang={params.locale}>
            <head>
                <Script id='clarity-script' type="text/javascript">
                    {`(function(c,l,a,r,i,t,y){
                        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "n2h394ndxk");`}
                </Script>
            </head>
            <body >
                <Providers>
                    <div className={cn(inter.className, params.gelica.variable, params.monaSans.variable, params.satoshi.variable, params.satoshiBlack.variable,
                        open_sans.variable,
                        roboto.variable,
                        poppins.variable,
                        fraunces.variable
                        , "bg-landing-background  dark:bg-landing-dark-background  ")}>
                        {children}
                    </div>
                </Providers>
                {/* <GoogleTagManager gtmId={platformConfig.variables.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} /> */}
            </body>
        </html>
    )
}
