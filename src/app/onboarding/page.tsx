import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import OnboardingContainer from '@/components/landing/onboarding/OnboardingContainer';
import { MemberBenefitVisibility } from '@/lib/types';
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string } }) => {
    const session = await auth()

    const benefits = await prisma.memberBenefit.findMany({
        where: {
            OR: [
                {
                    visibility: MemberBenefitVisibility.PUBLIC
                },
                {
                    visibility: MemberBenefitVisibility.OWNED_PRIVATE,
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

