
import { auth } from '@/auth';
import CategoriesTable from '@/components/organisms/CategoriesTable';
import MemberBenefitsTable from '@/components/organisms/MemberBenefitsTable';
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const MemberBenefitsPage = async () => {
    const session = await auth()


    if (!session) {
        notFound()
        return;
    }

    let benefits = []
    if (session?.user?.role == "ADMIN") {
        benefits = await prisma.memberBenefit.findMany()
    } else {
        benefits = await prisma.memberBenefit.findMany({
            where: {
                id: session?.user?.id ?? ''
            }
        })
    }
    return (
        <MemberBenefitsTable memberBenefits={benefits} />
    )
}

export default MemberBenefitsPage