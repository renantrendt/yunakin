import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import ChartContainer from '@/components/dashboard/chart/ChartContainer'
import { DashboardCards } from '@/components/dashboard/cards/DashboardCards'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
export default async function Dashboard() {

    const session = await auth()
    if(!session?.user) {
        throw notFound()
    }
    const memberBenefitsWithClicks = await prisma.memberBenefit.findMany({
        where: {
            userId: session?.user.id,
        },
        include: {
            clicks: true
        }
    })


    const cardStats =  {
        totalClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.length).reduce((a,b) =>  a+b, 0),
        totalClicksMobile: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os ==="iOS" || f.os =="android").length).reduce((a,b) =>  a+b, 0),
            totalClicksDesktop: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
                filter(f => f.os !=="iOS" && f.os !=="android").length).reduce((a,b) =>   a+b, 0)
    }


    return (
        <div>
            <DashboardCards totalClicks={cardStats.totalClicks} totalMobileClicks={cardStats.totalClicksMobile} totalDesktopClicks={cardStats.totalClicksDesktop} />
            <ChartContainer />
        </div>
    )
}
