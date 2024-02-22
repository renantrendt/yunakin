'use client'
import LoadingIcon from '@/icons/LoadingIcon'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AuthProps {
    children: React.ReactNode
}
const Auth = ({ children }: AuthProps) => {
    const { status } = useSession()
    const router = useRouter()
    if (status == 'loading') {
        return (
            <div className="flex w-full h-screen m-auto justify-center bg-neutral text-black items-center">
                <div className='w-4 h-4'>
                    <LoadingIcon />{' '}
                </div>
                <p className='ml-2'>Loading...</p>
            </div>
        )
    }
    if (status == 'unauthenticated') {
        router.replace('/login')
        return <></>
    }
    return <div>{children}</div>
}

export default Auth
