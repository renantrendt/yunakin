import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import OnboardingContainer from '@/components/landing/onboarding/OnboardingContainer';
import CatalogPageContainer from '@/components/catalog/CatalogPageContainer';
import CustomizePageContainer from '@/components/customize/CustomizePageContainer';
import { MemberBenefitVisibility } from '@/lib/types';
const CustomizePage = async ({ params }: { params: { clientSlug: string } }) => {
    const session = await auth()

    let otherBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: session?.user?.id,
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
    const benefits = await prisma.memberBenefit.findMany({
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
                        { userId: session?.user?.id }
                    ]
                },
                { id: { in: otherBenefits.map(benefit => benefit.memberBenefitId) } }
            ]
        }
    })





    const categories = await prisma.category.findMany()
    const config = await prisma.memberBenefitPageConfig.findFirst({
        where: {
            userId: session?.user?.id
        }
    })

    if (!config) {
        notFound()
        return;
    }
    return (
        <div className='  w-full bg-landing-background relative  '>
            <CustomizePageContainer
                benefits={benefits}
                categories={categories}
                memberPageConfig={config}
            />
        </div>
    )
}

export default CustomizePage

