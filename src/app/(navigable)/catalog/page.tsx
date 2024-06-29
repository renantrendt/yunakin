import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import OnboardingContainer from '@/components/landing/onboarding/OnboardingContainer';
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string } }) => {
    const session = await auth()

    const benefits = await prisma.memberBenefit.findMany({
        where: {
            NOT: {
                userId: session?.user?.id
            }
        }
    })

    const categories = await prisma.category.findMany()
    return (
        <div className='max-w-[1440px] py-20 w-full mx-auto px-4 md:px-28'>
            <div className='px-4 md:px-0'>
                <PageHeader title='Member Benefit Catalog'
                    description='Here are the member benefits from other companies' />
            </div>
            <OnboardingContainer
                benefits={benefits}
                categories={categories}
            />
        </div>
    )
}

export default MemberbenefitPage

