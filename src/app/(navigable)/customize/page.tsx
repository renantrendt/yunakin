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
const CustomizePage = async ({ params }: { params: { clientSlug: string } }) => {
    const session = await auth()


    const otherBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: session?.user?.id
        }
    })
    const benefits = await prisma.memberBenefit.findMany({
        where: {
            NOT: {
                userId: session?.user?.id
            }
        }
    })

    const selectedBenefits = benefits.map(b => {
        return {
            ...b,
            selected: otherBenefits.some(ob => ob.memberBenefitId === b.id)
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
        <div className='max-w-[1440px]  w-full bg-landing-background relative '>
            <CustomizePageContainer
                benefits={selectedBenefits}
                categories={categories}
                memberPageConfig={config}
            />
        </div>
    )
}

export default CustomizePage

