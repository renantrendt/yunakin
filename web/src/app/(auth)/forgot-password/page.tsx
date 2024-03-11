'use client'
import React, { Suspense } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import Button from '@/components/atomic/button/Button'
import customToast from '@/components/atomic/toast/customToast'
import EnvelopeIcon from '@/icons/envelope-icon.svg'
import Link from 'next/link'
import Image from 'next/image'
import siteUrls, { siteCopy } from '@/config/site-config'
import Typography from '@/components/atomic/typography/Typography'
const schema = yup.object({
    email: yup.string().email().required(),
})

interface FormValues {
    email: string
}
export default function ForgotPasswordPage() {
    const [loading, setIsLoading] = React.useState(false)
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
            const response = await fetch('/api/auth/send-password-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                })
            })
            if (response.status === 200) {
                customToast.success('A reset password link has been sent to this email address')
            } else {
                const data = await response.json()
                customToast.error(data.message)
            }
            // redirect to reset password page
            // show toast message

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const forgotPasswordCopy = siteCopy.forgotPasswordPage

    return (
        <Suspense fallback="loading">
            <div className="flex justify-center w-full h-screen items-center  ">
                <form onSubmit={handleSubmit(onSubmit)} className=" w-11/12 md:w-2/3 lg:w-full max-w-[500px] bg-white  rounded-[20px] shadow-form-container     shadow-lg  m-auto flex flex-col  gap-4  lg:gap-8 p-6 lg:p-10 ">
                    <Link href={siteUrls.general.home}>
                        <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                    </Link>
                    <div className='flex flex-col gap-8'>
                        <div>

                            <Typography type='h3' className=''>{forgotPasswordCopy.title}</Typography>
                            {/* <h3 className="text-2xl text-left font-bold  text-black dark:text-white">Login</h3> */}
                            <Typography type="p" className='mt-2  text-grey-700'>{forgotPasswordCopy.description}</Typography>
                        </div>

                        <div className='flex flex-col gap-6'>

                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <InputField
                                        label={forgotPasswordCopy.email}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder={forgotPasswordCopy.emailPlaceholder}
                                        trailingIcon={<span className='text-grey-400'><EnvelopeIcon /> </span>}
                                        onChange={onChange}
                                        value={value}
                                        error={errors.email?.message}
                                    />
                                )}
                            />
                            <div className="flex justify-center flex-col gap-4">
                                <Button variant="primary" type="submit" classname="w-full" label={forgotPasswordCopy.submit} size='lg' loading={loading} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Suspense>

    )
}
