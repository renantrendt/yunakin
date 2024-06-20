"use client"
import { useTranslation } from '@/lib/i18n/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from '../atomic/input/InputField'
import Button from '../atomic/button/Button'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import EnvelopeIcon from '@/icons/envelope-icon.svg'
import { signIn } from 'next-auth/react'

const MagicLinkForm = () => {
    const { t } = useTranslation('auth')
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setIsLoading] = React.useState(false)

    const schema = yup.object({
        email: yup.string().email(t("error.invalidEmail")).required(t("error.missingEmail")),
    })

    const { handleSubmit, control, formState: { errors } } = useForm<{ email: string }>(
        {
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = async (data: any) => {
        await signIn('resend', {
            email: data.email,
            callbackUrl: siteUrls.general.dashboard
        })
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
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
            <div className="flex justify-center flex-col gap-4">
                <Button variant="primary" type="submit" className="w-full" label={t("loginPage.sendMagicLink")} size='lg' loading={loading} />
                <div className=' text-sm dark:text-white'>
                    {t("loginPage.notMember")} <Link href={siteUrls.general.register} className="text-primary ">{t("loginPage.register")}</Link>
                </div>
            </div>
        </form>
    )
}

export default MagicLinkForm