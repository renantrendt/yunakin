'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/input/InputField'
import Button from '@/components/button/Button'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import customToast from '@/components/toast/customToast'
import { useRouter } from 'next/navigation'
import EmailIcon from '@/assets/icons/EmailIcon'
import AccountIcon from '@/assets/icons/AccountIcon'
import PasswordInputField from '@/components/input/PasswordInputField'
const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    name: yup.string().required()
})

interface FormValues {
    email: string
    password: string
    name: string
}
export default function RegisterPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    if (session) {
        return (
            <div>
                <p>You are already signed in.</p>
            </div>
        )
    }

    const onSubmit = async (data: any) => {
        const register = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        })

        if (register.status === 200) {
            // router.push(`/auth/verify-request?email=${values.email}`);
            customToast.success('Registration successful, a confirmation email has been sent to your email address.')
            router.push('/login')
        } else {
            customToast.error('Something went wrong')
        }
    }
    return (
        <div className="flex justify-center w-full h-screen items-center dark:bg-gray-800  ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 md:w-2/3 lg:w-1/2 max-w-xl  dark:bg-gray-700 rounded-xl    shadow-lg p-8  m-auto flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-center  text-black dark:text-white">Register</h1>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            leadingIcon={<AccountIcon />}
                            label="Name"
                            type="text"
                            id="name"
                            name="name"
                            onChange={onChange}
                            value={value}
                            error={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            leadingIcon={<EmailIcon />}
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
                <div className="flex justify-center">
                    <Button variant="primary" type="submit" classname="w-full">Register</Button>
                </div>
                <div className='text-black dark:text-white'>
                    Already have an account ? <Link href={siteUrls.login} className="text-primary">Login</Link>
                </div>
            </form>
        </div>

    )
}
