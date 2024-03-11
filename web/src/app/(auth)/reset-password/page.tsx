'use client'
import React, { Suspense } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter, useSearchParams } from 'next/navigation'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Image from 'next/image'
import Link from 'next/link'
import siteUrls, { siteCopy } from '@/config/site-config'
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

    const resetPasswordCopy = siteCopy.resetPasswordPage

    return (
        <Suspense fallback="loading">
            <div className="flex justify-center w-full h-screen items-center  ">
                <form onSubmit={handleSubmit(onSubmit)} className=" w-11/12 md:w-2/3 lg:w-full max-w-[500px] bg-white  rounded-[20px] shadow-form-container     shadow-lg  m-auto flex flex-col  gap-4  lg:gap-8 p-6 lg:p-10 ">
                    <Link href={siteUrls.general.home}>
                        <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                    </Link>
                    <div className='flex flex-col gap-8'>
                        <div>

                            <Typography type='h3' className=''>{resetPasswordCopy.title}</Typography>
                            <Typography type="p" className='mt-2  text-grey-700'>{resetPasswordCopy.description}</Typography>
                        </div>

                        <div className='flex flex-col gap-6'>

                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, value } }) => (
                                    <PasswordInputField
                                        label={resetPasswordCopy.password}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder={resetPasswordCopy.passwordPlaceholder}
                                        onChange={onChange}
                                        value={value}
                                        error={errors.password?.message}
                                    />
                                )}
                            />
                            <div className="flex justify-center flex-col gap-4">
                                <Button variant="primary" type="submit" classname="w-full" label={resetPasswordCopy.submit} size='lg' loading={loading} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Suspense>

    )
}
