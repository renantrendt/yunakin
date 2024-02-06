'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter, useSearchParams } from 'next/navigation'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Image from 'next/image'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import Typography from '@/components/atomic/typography/Typography'
const schema = yup.object({
    password: yup.string().min(6).required()
})

interface FormValues {
    password: string
}
export default function ForgotPasswordPage() {
    const [loading, setIsLoading] = React.useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: any) => {
        // Handle sign up logic here
        setIsLoading(true)
        try {
            // send API call to send email with token
            const queryParams = new URLSearchParams(searchParams);
            const token = queryParams.get('token')
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token,
                    password: data.password,
                })
            })
            if (response.status === 200) {
                customToast.success('Password has been reset successfully')
                return router.push('/login')
            } else {
                const data = await response.json()
                customToast.error(data.error.message)
            }
            // redirect to reset password page
            // show toast message

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex justify-center w-full h-screen items-center dark:bg-gray-800 ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 md:w-2/3 lg:w-1/2 max-w-xl   dark:bg-gray-700 p-8 rounded-xl    shadow-lg  m-auto flex flex-col gap-4">
                <Link href={siteUrls.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
                <div>
                    <Typography type='h4' className='font-bold'>Reset Password</Typography>
                    <Typography type='p' className='font-light'>Enter your new password.</Typography>
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
                            onChange={onChange}
                            value={value}
                            error={errors.password?.message}
                        />
                    )}
                />
                <div>

                    <div className="flex justify-center flex-col gap-4">
                        <Button variant="primary" type="submit" classname="w-full" loading={loading} label='Reset Password' />
                    </div>
                </div>
            </form>
        </div>

    )
}
