'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import siteUrls from '@/config/site-config'

import Image from 'next/image'
import Typography from '@/components/atomic/typography/Typography'
import FormContainer from '@/components/form/FormContainer'
import { useTranslation } from '@/lib/i18n/client'
import MagicLinkForm from '@/components/login/MagicLinkForm'


enum AuthType {
    MAGICLINK = 'magiclink',
    EMAIL = 'email'
}
// const appendParams = (searchParams: URLSearchParams) => {
//     const callbackUrl = searchParams.get('callbackUrl')
//     if (callbackUrl) {
//         return `?callbackUrl=${callbackUrl}`
//     }
//     return ''
// }

export default function LoginPage() {
    const { t } = useTranslation('auth')
    const { data: session } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedAuth] = React.useState<AuthType>(AuthType.MAGICLINK)

    if (session && new URLSearchParams(searchParams).get('callbackUrl') === null) {
        return (
            router.push('/analytics')
        )
    }

    return (
        <FormContainer>

            <Link href={siteUrls.general.home}>
                <Image src="/images/logo.svg" alt="logo" width={150} height={50} className='dark:hidden' />
                <Image src="/images/logo-dark.svg" alt="logo" width={150} height={50} className='hidden dark:block' />
            </Link>
            <div className='flex flex-col gap-8'>
                <div>

                    <Typography type='h3' className=''>{t("loginPage.title")}</Typography>
                    {/* <h3 className="text-2xl text-left font-bold  text-black dark:text-white">Login</h3> */}
                    <Typography type="p" className='mt-2  text-grey-700 !dark:text-placeholder-dark '>{t("loginPage.description")}</Typography>
                </div>

                {/* <div className='flex justify-around'>
                    <TabItem label='Magic Link' onClick={() => setSelectedAuth(AuthType.MAGICLINK)} selected={selectedAuth === AuthType.MAGICLINK} />
                    <TabItem label='Email' onClick={() => setSelectedAuth(AuthType.EMAIL)} selected={selectedAuth === AuthType.EMAIL} />
                </div> */}

                {selectedAuth == AuthType.MAGICLINK && <MagicLinkForm />}
                {/* {selectedAuth == AuthType.EMAIL && <SignInForm />} */}
                {/* <div className="relative flex  items-center py-3">
                    <div className="flex-grow border-t border-grey-400 dark:border-line-dark"></div>
                    <span className="flex-shrink mx-4 text-sm text-grey-400 dark:text-placeholder-dark">OR</span>
                    <div className="flex-grow border-t border-grey-400 dark:border-line-dark"></div>
                </div>
                <div>
                    <div className='flex gap-2 flex-col'>
                        <AuthButton onClick={() => { signIn('google', { callbackUrl: `/dashboard${appendParams(searchParams)}` }) }} content={t("loginPage.signWithGoogle")} icon={<GoogleIcon />} />
                    </div>
                </div> */}
            </div>
        </FormContainer>

    )
}
