import React from 'react'

import getSeoMetadata from '@/lib/seo/metadata'
import { Metadata } from 'next'
import LandingPageContainer from '@/components/organisms/LandingPageContainer';
import { createTranslation, getLocale } from '@/lib/i18n/server';
import platformConfig from '@/config/app-config';
export async function generateMetadata(props: any): Promise<Metadata> {

  const { t } = await createTranslation('landing', props.searchParams.locale);
  const siteMetadata = {
    title: t('heroSection.title'),
    description: t('heroSection.description'),
    openGraph: {
      title: t('heroSection.title'),
      description: t('heroSection.description'),
      locale: props.searchParams.locale ?? getLocale(),
      siteName: 'Yunakin',
      url: 'www.yunakin.com',
      images: [`${platformConfig.variables.NEXT_URL}/images/landing/performance.svg`],

    },
    twitter: {
      description: t('heroSection.description'),
      title: t('heroSection.title'),
      locale: props.searchParams.locale ?? getLocale(),
      images: [`${platformConfig.variables.NEXT_URL}/images/landing/performance.svg`],
    },
  }
  return getSeoMetadata(siteMetadata);
}

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col w-full ">
      <LandingPageContainer />
    </main>
  )
}
