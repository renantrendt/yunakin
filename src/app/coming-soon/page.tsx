
import localFont from 'next/font/local'

import ComingSoonClient from "@/components/client/ComingSoonClient";
import getSeoMetadata from "@/lib/seo/metadata";
import { Metadata } from "next";
import React from 'react'
import platformConfig from '@/config/app-config';
import { createTranslation, getLocale } from '@/lib/i18n/server';

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
            images: [`${platformConfig.variables.NEXT_URL}/images/og-image.png`],

        },
        twitter: {
            description: t('heroSection.description'),
            title: t('heroSection.title'),
            locale: props.searchParams.locale ?? getLocale(),
            images: [`${platformConfig.variables.NEXT_URL}/images/og-image.png`],
        },
    }
    return getSeoMetadata(siteMetadata);
}
const uniSans = localFont({ src: '../fonts/uni-sans.heavy-caps.otf' });
const monaSans = localFont({ src: '../fonts/Mona-Sans-Light.otf' });
const ComingSoon = () => {
    return <ComingSoonClient uniSans={uniSans} monaSans={monaSans} />;
}

export default ComingSoon
