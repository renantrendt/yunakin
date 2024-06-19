"use client"
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputField from '../atomic/input/InputField'
import { useTranslation } from '@/lib/i18n/client'
import * as yup from 'yup'
import Button from '../atomic/button/Button'
import customToast from '../atomic/toast/customToast'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import EnvelopeIcon from '@/icons/envelope-icon.svg'
import PasswordInputField from '@/components/atomic/input/PasswordInputField'
import Checkbox from '@/components/atomic/checkbox/Checkbox'

interface FormValues {
    email: string
    password: string
    remember?: boolean
}


const SignInForm = () => {
    const { t } = useTranslation('auth')
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setIsLoading] = React.useState(false)

    const schema = yup.object({
        email: yup.string().email(t("error.invalidEmail")).required(t("error.missingEmail")),
        password: yup.string().min(6, t("error.weakPassword")).required(t("error.missingPassword")),
        remember: yup.boolean()
    })

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )
    const onSubmit = async (data: any) => {
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
                            customToast.success(t("loginPage.emailVerified"))
                            setTimeout(() => {
                                router.push('/dashboard')
                            }, 1000)
                        }
                    } else {
                        customToast.error(t("loginPage.somethingWentWrong"))
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
    return <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
                <InputField
                    label={t("loginPage.email")}
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("loginPage.emailPlaceholder")}
                    trailingIcon={<span className='text-grey-400 dark:text-placeholder-dark'><EnvelopeIcon /> </span>}
                    onChange={onChange}
                    value={value}
                    error={errors.email?.message}
                />
            )}
        />
        <div className='relative '>
            <div className='text-black absolute right-0 top-1 dark:text-white'>
                <Link href={siteUrls.general.forgotPassword} className="text-primary text-sm">{t("loginPage.forgotPassword")}</Link>
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
                        placeholder={t("loginPage.passwordPlaceholder")}
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
                    label={t("loginPage.rememberMe")}
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
            <Button variant="primary" type="submit" className="w-full" label={t("loginPage.signIn")} size='lg' loading={loading} />

            <div className=' text-sm dark:text-white'>
                {t("loginPage.notMember")} <Link href={siteUrls.general.register} className="text-primary ">{t("loginPage.register")}</Link>
            </div>
        </div>
    </form>
}

export default SignInForm