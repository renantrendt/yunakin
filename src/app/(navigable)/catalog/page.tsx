import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import OnboardingContainer from '@/components/landing/onboarding/OnboardingContainer';
import CatalogPageContainer from '@/components/catalog/CatalogPageContainer';
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
        <div className='max-w-[1440px] pb-20 w-full mx-auto px-4 md:px-28'>
            <CatalogPageContainer
                benefits={benefits}
                categories={categories}
                memberPageConfig={config}
            />
        </div>
    )
}

export default MemberbenefitPage

