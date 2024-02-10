'use client'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import Button from '@/components/atomic/button/Button'
import GoogleButton from '@/components/molecules/googlebutton/GoogleButton'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import EmailIcon from '@/assets/icons/EmailIcon'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Image from 'next/image'
import Typography from '@/components/atomic/typography/Typography'
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

interface FormValues {
    email: string
    password: string
}
export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setIsLoading] = React.useState(false)
    const searchParams = useSearchParams()
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )


    if (session && new URLSearchParams(searchParams).get('callbackUrl') === null) {
        return (
            router.push('/dashboard')
        )
    }

    const onSubmit = async (data: any) => {
        // Handle sign up logic here
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            if (result?.error) {
                customToast.error(result.error)
            } else {
                const queryParams = new URLSearchParams(searchParams);
                const token = queryParams.get('token')
                if (token !== null) {
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
                            }, 1000)
                        }
                    } else {
                        customToast.error('Something went wrong')
                        return router.push('/')
                    }
                } else {
                    return router.push('/dashboard')
                }
            }
        } catch (error) {
            console.error(error)

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex justify-center w-full h-screen items-center dark:bg-gray-800 ">
            <form onSubmit={handleSubmit(onSubmit)} className=" w-11/12 md:w-2/3 lg:w-1/2 max-w-xl  dark:bg-gray-700 p-8 rounded-[20px]     shadow-lg  m-auto flex flex-col gap-6">
                <Link href={siteUrls.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
                <Typography type='h4' className='font-bold'>Log In</Typography>
                {/* <h3 className="text-2xl text-left font-bold  text-black dark:text-white">Login</h3> */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
                            leadingIcon={<EmailIcon />}
                            onChange={onChange}
                            value={value}
                            error={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <PasswordInputField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            onChange={onChange}
                            value={value}
                            error={errors.password?.message}
                        />
                    )}
                />
                <div>

                    <div className="flex justify-center flex-col gap-4">
                        <Button variant="primary" type="submit" classname="w-full" label='Sign In' size='md' loading={loading} />
                        <div className='text-black dark:text-white'>
                            <Link href={siteUrls.forgotPassword} className="text-primary">Forgot Password?</Link>
                        </div>
                        <div className='text-black dark:text-white'>
                            Don&apos;t have an account ? <Link href={siteUrls.register} className="text-primary">Register</Link>
                        </div>
                    </div>
                    <div className="relative flex  items-center py-3">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">Or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <GoogleButton onClick={() => { signIn('google', { callbackUrl: '/dashboard' }) }} />
                </div>

            </form>
        </div>

    )
}
