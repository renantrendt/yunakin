'use client'
import { signIn, useSession } from 'next-auth/react'
import React, { Suspense } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import siteUrls, { siteCopy } from '@/config/site-config'
import EnvelopeIcon from '@/icons/envelope-icon.svg'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Image from 'next/image'
import Typography from '@/components/atomic/typography/Typography'
import AuthButton from '@/components/molecules/authbutton/AuthButton'
import GoogleIcon from "@/icons/google-icon.svg"
import Checkbox from '@/components/atomic/checkbox/Checkbox'
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    remember: yup.boolean()
})

interface FormValues {
    email: string
    password: string
    remember?: boolean
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

    const loginCopy = siteCopy.loginPage;
    return (
        <Suspense fallback="loading">
            <div className="flex justify-center w-full h-screen items-center  ">
                <form onSubmit={handleSubmit(onSubmit)} className=" w-11/12 md:w-2/3 lg:w-full max-w-[500px] bg-white  rounded-[20px] shadow-form-container     shadow-lg  m-auto flex flex-col  gap-4  lg:gap-8 p-6 lg:p-10 ">
                    <Link href={siteUrls.general.home}>
                        <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                    </Link>
                    <div className='flex flex-col gap-8'>
                        <div>

                            <Typography type='h3' className=''>{loginCopy.title}</Typography>
                            {/* <h3 className="text-2xl text-left font-bold  text-black dark:text-white">Login</h3> */}
                            <Typography type="p" className='mt-2  text-grey-700'>{loginCopy.description}</Typography>
                        </div>

                        <div className='flex flex-col gap-6'>

                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <InputField
                                        label={loginCopy.email}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder={loginCopy.emailPlaceholder}
                                        trailingIcon={<EnvelopeIcon />}
                                        onChange={onChange}
                                        value={value}
                                        error={errors.email?.message}
                                    />
                                )}
                            />
                            <div className='relative '>
                                <div className='text-black absolute right-0 top-1 dark:text-white'>
                                    <Link href={siteUrls.general.forgotPassword} className="text-primary text-sm">{loginCopy.forgotPassword}</Link>
                                </div>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange, value } }) => (
                                        <PasswordInputField
                                            label="Password"
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder={loginCopy.passwordPlaceholder}
                                            onChange={onChange}
                                            value={value}
                                            error={errors.password?.message}
                                        />
                                    )}
                                />
                            </div>
                            <Controller
                                control={control}
                                name='remember'
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox
                                        label='Remember me'
                                        id='remember'
                                        name='remember'
                                        onChange={onChange}
                                        checked={value ? true : false}
                                        key={"remember"}
                                        className='text-sm'
                                    />
                                )}
                            />
                            <div className="flex justify-center flex-col gap-4">
                                <Button variant="primary" type="submit" classname="w-full" label='Sign In' size='md' loading={loading} />

                                <div className=' text-sm'>
                                    {loginCopy.notMember} <Link href={siteUrls.general.register} className="text-primary ">{loginCopy.register}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex  items-center py-3">
                            <div className="flex-grow border-t border-grey-400"></div>
                            <span className="flex-shrink mx-4 text-sm text-grey-400">OR</span>
                            <div className="flex-grow border-t border-grey-400"></div>
                        </div>
                        <div>



                            <div className='flex gap-2 flex-col'>

                                <AuthButton onClick={() => { signIn('google', { callbackUrl: '/dashboard' }) }} content={loginCopy.signWithGoogle} icon={<GoogleIcon />} />

                            </div>

                        </div>
                    </div>

                </form>
            </div>
        </Suspense>

    )
}
