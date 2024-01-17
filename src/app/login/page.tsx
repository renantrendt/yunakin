'use client'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/input/InputField'
import Button from '@/components/button/Button'
import GoogleButton from '@/components/googlebutton/GoogleButton'
import customToast from '@/components/toast/customToast'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
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
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    if (session) {
        return (
            redirect('/dashboard')
        )
    }

    const onSubmit = async (data: any) => {
        // Handle sign up logic here
        console.log(data)
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            console.log(result)
            if (result?.error) {
                customToast.error(result.error)
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="flex justify-center w-full h-screen items-center ">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg  w-1/3 shadow-md p-8  m-auto flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Email"
                            type="email"
                            id="email"
                            name="email"
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
                        <InputField
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
                        <Button variant="primary" type="submit" classname="w-full">Sign In</Button>
                        <div>
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
