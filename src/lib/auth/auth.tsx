'use client'
import LoadingIcon from '@/icons/LoadingIcon'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Script from 'next/script'
import React from 'react'

interface AuthProps {
    children: React.ReactNode
}
const Auth = ({ children }: AuthProps) => {
    const { data, status } = useSession()
    const pathname = usePathname()
    const router = useRouter()
    if (status == 'loading') {
        return (
            <div className="flex w-full h-screen m-auto justify-center  items-center">
                <LoadingIcon />{' '}
            </div>
        )
    }
    if (status == 'unauthenticated') {
        router.replace('/login')
        return <></>
    }
    if (status == 'authenticated') {
        if (window.clarity && data?.user) {
            window.clarity("identify", data.user?.email, data.user?.email, pathname, data.user?.clientSlug)
        }
    }
    return <div>
        {children}
    </div>
}

export default Auth
