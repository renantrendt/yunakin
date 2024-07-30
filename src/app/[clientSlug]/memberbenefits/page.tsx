import React from 'react'
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MemberBenefit } from '@prisma/client';
import { MemberBenefitVisibility } from '@/lib/types';
import MemberBenefitsPageContainer from '@/components/landing/memberbenefits/MemberBenefitsPageContainer';
import { createTranslation, getLocale } from '@/lib/i18n/server';
import getSeoMetadata from '@/lib/seo/metadata';
import { Metadata } from 'next';
import platformConfig from '@/config/app-config';
export async function generateMetadata(props: any): Promise<Metadata> {

    const slug = props.params.clientSlug;
    const config = await prisma.memberBenefitPageConfig.findUnique({
        where: {
            clientSlug: slug
        }
    })
    console.log(config)
    const { t } = await createTranslation('landing', props.searchParams.locale);
    const siteMetadata = {
        title: config?.title,
        description: config?.description,
        openGraph: {
            title: config?.title,
            description: config?.description,
            locale: props.searchParams.locale ?? getLocale(),
            siteName: 'Youakin',
            url: 'www.youakin.com',
            images: [config?.imageURL ?? `${platformConfig.variables.NEXT_URL}/images/og-image.png`],

        },
        twitter: {
            description: config?.description,
            title: config?.title,
            locale: props.searchParams.locale ?? getLocale(),
            images: [config?.imageURL ?? `${platformConfig.variables.NEXT_URL}/images/og-image.png`],
        },
    }
    return getSeoMetadata(siteMetadata);
}
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string }, searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const config = await prisma.memberBenefitPageConfig.findUnique({
        where: {
            clientSlug: params.clientSlug
        }
    })
    if (!config) {
        notFound()
        return;
    }
    let benefits: MemberBenefit[] = []

    if (!config.userId) {
        notFound()
        return;
    }
    let otherBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: config.userId,
        },
        include: {
            memberBenefit: {
                select: {
                    id: true,
                    pageConfigId: true,
                }
            }
        }
    })
    const publicOtherBenefitsIds = await prisma.memberBenefit.findMany({
        where: {
            AND: [
                {
                    id: {
                        in: otherBenefits.map(benefit => benefit.memberBenefitId) as string[]
                    },
                },
                {
                    OR: [
                        {
                            visibility: MemberBenefitVisibility.PUBLIC,
                        },
                        {
                            visibility: MemberBenefitVisibility.OWNED_PUBLIC,
                        }
                    ]
                }
            ]
        },
        select: {
            id: true,
        }
    })
    otherBenefits = otherBenefits.filter(benefit => publicOtherBenefitsIds.some(b => b.id === benefit.memberBenefitId))
    benefits = await prisma.memberBenefit.findMany({
        where: {
            OR: [
                {
                    AND: [
                        {
                            OR: [
                                {
                                    visibility: MemberBenefitVisibility.PUBLIC,
                                },
                                {
                                    visibility: MemberBenefitVisibility.OWNED_PRIVATE,
                                }
                            ],
                        },
                        { userId: config.userId }
                    ]
                },
                { id: { in: otherBenefits.map(benefit => benefit.memberBenefitId) } }
            ]
        }
    })
    const categories = await prisma.category.findMany({
        where: {
            id: {
                in: benefits.map(benefit => benefit.categoryId) as string[]
            }
        }
    })



    return (
        <MemberBenefitsPageContainer
            benefits={benefits}
            categories={categories}
            config={config}
            otherBenefits={otherBenefits}
        />
    )
}

export default MemberbenefitPage

