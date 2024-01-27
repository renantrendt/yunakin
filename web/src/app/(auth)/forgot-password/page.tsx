'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/input/InputField'
import Button from '@/components/button/Button'
import LoadingIcon from '@/assets/icons/LoadingIcon'
import customToast from '@/components/toast/customToast'
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
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-11/12 md:w-1/3  dark:bg-gray-700 p-8 rounded-xl    shadow-lg  m-auto flex flex-col gap-8">
                <h1 className="text-3xl font-bold text-center text-black dark:text-white">Forgot Password </h1>
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
                <div>

                    <div className="flex justify-center flex-col gap-4">
                        <Button variant="primary" type="submit" classname="w-full">
                            {loading ? <div className='h-6 w-6'><LoadingIcon /> </div> : null} Send Reset Password Link</Button>

                    </div>
                </div>
            </form>
        </div>

    )
}
