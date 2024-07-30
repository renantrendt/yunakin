
import { auth } from '@/auth';
import MemberBenefitsTable from '@/components/organisms/MemberBenefitsTable';
import { prisma } from '@/lib/prisma'
import { DealType, MemberBenefitVisibility, MemberBenefitWithImport } from '@/lib/types';
import { notFound } from 'next/navigation';
import React from 'react'

const MemberBenefitsPage = async () => {
    const session = await auth()


    console.log(session?.user)
    if (!session?.user) {
        notFound()
        return;
    }

    let benefits = []
    // check if we have other deals

    const otherMemberBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    benefits = await prisma.memberBenefit.findMany({
        where: {
            OR: [
                {
                    AND: [
                        {
                            dealType: {
                                not: DealType.PARTNER
                            },
                        },
                        {
                            OR: [
                                {
                                    visibility: MemberBenefitVisibility.PUBLIC,
                                },
                                {
                                    visibility: MemberBenefitVisibility.OWNED_PUBLIC
                                },
                                {
                                    AND: [
                                        {
                                            visibility: MemberBenefitVisibility.OWNED_PRIVATE
                                        },
                                        {
                                            userId: session?.user?.id
                                        }
                                    ],

                                },
                                {
                                    AND: [
                                        {
                                            visibility: MemberBenefitVisibility.PRIVATE
                                        },
                                        {
                                            userId: session?.user?.id
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    AND: [
                        {
                            dealType: DealType.PARTNER
                        },
                        {
                            userId: session?.user?.id
                        },

                    ]
                },

            ]

        }
    })

    const importedBenefits: MemberBenefitWithImport[] = benefits.map(b => {
        return {
            ...b,
            import: otherMemberBenefits.some(ob => ob.memberBenefitId === b.id)
        }
    }).sort((a, b) => {
        if (a.userId == session?.user?.id && b.userId != session?.user?.id) {
            return -1
        }
        if (a.userId != session?.user?.id && b.userId == session?.user?.id) {
            return 1
        }
        return 0
    })

    const categories = await prisma.category.findMany()

    const config = await prisma.memberBenefitPageConfig.findFirst({
        where: {
            userId: session?.user?.id
        }
    })
    return (
        <MemberBenefitsTable
            memberBenefits={importedBenefits}
            categories={categories}
        />
    )
}

export default MemberBenefitsPage