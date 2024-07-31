import React from 'react'
import { prisma } from '@/lib/prisma';
import OnboardingContainer from '@/components/landing/onboarding/OnboardingContainer';
import { DealType, MemberBenefitVisibility } from '@/lib/types';
import { auth } from '@/auth';
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string } }) => {
    const benefits = await prisma.memberBenefit.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            visibility: MemberBenefitVisibility.PUBLIC
                        },
                        {
                            visibility: MemberBenefitVisibility.OWNED_PUBLIC,
                        },
                    ]
                },
                {
                    dealType: {
                        not: DealType.PARTNER
                    }
                }
            ]
        }
    })
    const categories = await prisma.category.findMany()
    return (
        <OnboardingContainer
            benefits={benefits}
            categories={categories}
        />
    )
}

export default MemberbenefitPage

