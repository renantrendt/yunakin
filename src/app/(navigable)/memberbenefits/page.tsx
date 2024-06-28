
import { auth } from '@/auth';
import CategoriesTable from '@/components/organisms/CategoriesTable';
import MemberBenefitsTable from '@/components/organisms/MemberBenefitsTable';
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const MemberBenefitsPage = async () => {
    const session = await auth()


    console.log(session?.user)
    if (!session?.user) {
        notFound()
        return;
    }

    let benefits = []
    if (session?.user?.role == "ADMIN") {
        benefits = await prisma.memberBenefit.findMany()
    } else {
        benefits = await prisma.memberBenefit.findMany({
            where: {
                userId: session?.user?.id ?? ''
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
    }

    const categories = await prisma.category.findMany()
    return (
        <MemberBenefitsTable memberBenefits={benefits} categories={categories} />
    )
}

export default MemberBenefitsPage