'use client'
import customToast from '@/components/toast/customToast'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const VerifyPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    useEffect(() => {
        (async function () {
            const queryParams = new URLSearchParams(searchParams);
            const token = queryParams.get('token')
            try {
                const result = await fetch('/api/auth/verify', {
                    method: 'POST',
                    body: JSON.stringify({
                        token
                    })
                })

                if (result?.status === 200) {
                    const data = await result.json() as any
                    if (data?.error) {
                        customToast.error(data.error)
                    } else {
                        customToast.success('Email verified, redirecting to dashboard')
                        setTimeout(() => {
                            router.push('/dashboard')
                        }, 10000)
                    }
                } else {
                    customToast.error('Something went wrong')
                    return router.push('/')
                }

            } catch (error) {
                console.error(error)
            } finally {
            }
        })()
    }, []);
    return (
        <div className='flex min-h-full flex-col justify-center mt-10 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                Verifying token...
            </div>
        </div>
    )
}

export default VerifyPage