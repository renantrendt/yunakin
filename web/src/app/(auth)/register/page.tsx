'use client'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '@/components/atomic/input/InputField'
import Button from '@/components/atomic/button/Button'
import Link from 'next/link'
import siteUrls, { siteCopy } from '@/config/site-config'
import customToast from '@/components/atomic/toast/customToast'
import { useRouter } from 'next/navigation'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Image from 'next/image'
import Typography from '@/components/atomic/typography/Typography'
import AuthButton from '@/components/molecules/authbutton/AuthButton'
import Checkbox from '@/components/atomic/checkbox/Checkbox'
import GoogleIcon from "@/icons/google-icon.svg"
import EnvelopeIcon from '@/icons/envelope-icon.svg'
import FormContainer from '@/components/form/FormContainer'

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    name: yup.string().required(),
    remember: yup.boolean()
})

interface FormValues {
    email: string
    password: string
    name: string
    remember?: boolean
}
export default function RegisterPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [loading, setIsLoading] = useState(false)
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
        setIsLoading(true);
        try {
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
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }

    }
    const registerCopy = siteCopy.registerPage
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Link href={siteUrls.general.home}>
                <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' />
            </Link>
            <div className='flex flex-col gap-8'>
                <div>

                    <Typography type='h3' className=''>{registerCopy.title}</Typography>
                    {/* <h3 className="text-2xl text-left font-bold  text-black dark:text-white">Login</h3> */}
                    <Typography type="p" className='mt-2  text-grey-700'>{registerCopy.description}</Typography>
                </div>

                <div className='flex flex-col gap-6'>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Name"
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Enter your name'
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
                                label={registerCopy.email}
                                type="email"
                                id="email"
                                name="email"
                                placeholder={registerCopy.emailPlaceholder}
                                trailingIcon={<span className='text-grey-400'><EnvelopeIcon /> </span>}
                                onChange={onChange}
                                value={value}
                                error={errors.email?.message}
                            />
                        )}
                    />
                    <div className='relative '>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <PasswordInputField
                                    label={registerCopy.password}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder={registerCopy.passwordPlaceholder}
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
                        <Button variant="primary" type="submit" classname="w-full" label={registerCopy.createAccount} size='lg' loading={loading} />
                    </div>
                </div>
                <div className="relative flex  items-center py-3">
                    <div className="flex-grow border-t border-grey-400"></div>
                    <span className="flex-shrink mx-4 text-sm text-grey-400">OR</span>
                    <div className="flex-grow border-t border-grey-400"></div>
                </div>
                <div>



                    <div className='flex gap-2 flex-col'>

                        <AuthButton onClick={() => { signIn('google', { callbackUrl: '/dashboard' }) }} content={registerCopy.signWithGoogle} icon={<GoogleIcon />} />

                    </div>

                </div>
            </div>

        </FormContainer>

    )
}
