
import { auth } from '@/auth';
import MemberBenefitsTable from '@/components/organisms/MemberBenefitsTable';
import { prisma } from '@/lib/prisma'
import { MemberBenefitWithImport } from '@/lib/types';
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
    // check if we have other member benefits

    const otherMemberBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    benefits = await prisma.memberBenefit.findMany({
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