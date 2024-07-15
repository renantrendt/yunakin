import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { MemberBenefit } from '@prisma/client';
import ContentSection from '@/containers/layout/ContentSection';
import Typography from '@/components/atomic/typography/Typography';
import LinkButton from '@/components/atomic/button/LinkButton';
import PageTracker from '@/components/analytics/pagetracker/PageTracker';
import { MemberBenefitVisibility } from '@/lib/types';
import Script from 'next/script';
const MemberbenefitPage = async ({ params, searchParams }: { params: { clientSlug: string }, searchParams?: { [key: string]: string | string[] | undefined } }) => {
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
                            visibility: MemberBenefitVisibility.OWNED_PRIVATE,
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
                                    visibility: MemberBenefitVisibility.OWNED_PUBLIC,
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

    const image = config.imageURL || "/images/logo.svg"


    return (
        <ContentSection fullWidth style={{
            backgroundColor: config?.backgroundColor as string,
        }}>
            <div className='max-w-full py-20 w-full '>
                <PageTracker config={config} />

                <div className='flex justify-between items-center'>

                    {!searchParams?.embedded && <div className=" w-full text-left ">
                        <Image unoptimized src={image} alt='logo' width={100} height={100} objectFit="contain" className=" min-w-[100px] max-w-[150px]  h-auto w-fit  z-10 " />
                    </div>}
                    <LinkButton variant="tertiary" className='w-fit self-end' label="Add your own Benefit here"
                        href='/onboarding'
                        target='_blank'
                    />
                </div>

                <div className='px-4 md:px-0'>
                    <PageHeader
                        title={config.title}
                        description={config.description}
                        config={config}
                    />
                </div>
                <div>
                    {categories.map(category => (
                        <>
                            <div className=" 	mt-8  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                                <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                            </div>
                            <div className='flex flex-row gap-3 lg:gap-6 justify-items-center items-stretch   pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                {benefits && benefits.filter(b => b.categoryId == category.id).map((benefit: MemberBenefit, index: any) => (
                                    <MemberBenefitCard
                                        otherMemberbenefit={otherBenefits.find(b => b.memberBenefitId == benefit.id)}
                                        key={index}
                                        benefit={benefit}
                                        config={config}
                                    />
                                ))}
                            </div>
                        </>
                    ))}
                </div>

            </div>
            <div className='footer flex justify-center bottom-8 mb-5'>
                <Typography type='p' className='text-center flex gap-2 '
                    style={{
                        color: config?.textColor as string,
                    }}
                >
                    <span> Powered by </span><a href='https://www.yunakin.com/' target='_blank' className='text-blue-500 underline'>Yunakin.com</a>
                </Typography>

                {searchParams?.embedded === 'true' && (
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `
                                 window.parent.postMessage({ type: 'yunakin_iframeHeight', height: document.body.scrollHeight }, '*')
                            `}}
                    />
                )}
            </div>
        </ContentSection>

    )
}

export default MemberbenefitPage

