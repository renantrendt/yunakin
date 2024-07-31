import React from 'react'
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import CustomizePageContainer from '@/components/customize/CustomizePageContainer';
import { MemberBenefitVisibility, MemberBenefitWithImport } from '@/lib/types';
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

    const orderBenefits: MemberBenefitWithImport[] = benefits.map(b => {
        const otherBenefit = otherBenefits.find(ob => ob.memberBenefitId === b.id)
        if (otherBenefit) {
            return {
                ...b,
                order: otherBenefit.order,
                import: true,
                otherMemberBenefitId: otherBenefit.id
            }
        }
        return b
    })

    orderBenefits.sort((a, b) => {
        return a.order - b.order
    })

    console.log(orderBenefits)

    return (
        <div className='  w-full bg-landing-background relative  '>
            <CustomizePageContainer
                benefits={orderBenefits}
                categories={categories}
                memberPageConfig={config}
            />
        </div>
    )
}

export default CustomizePage

