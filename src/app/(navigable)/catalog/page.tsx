import React from 'react'
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import CatalogPageContainer from '@/components/catalog/CatalogPageContainer';

//eslint  disable-next-line @@typescript-eslint/no-unused-vars
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string } }) => {
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
        <div className='max-w-[1440px] pb-20 w-full mx-auto px-4 md:px-28'>
            <CatalogPageContainer
                benefits={selectedBenefits}
                categories={categories}
                memberPageConfig={config}
            />
        </div>
    )
}

export default MemberbenefitPage

