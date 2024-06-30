import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import ChartContainer from '@/components/dashboard/chart/ChartContainer'
import { DashboardCards } from '@/components/dashboard/cards/DashboardCards'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
export default async function Dashboard() {

    const session = await auth()
    if (!session?.user) {
        throw notFound()
    }
    const memberBenefitIds = await prisma.memberBenefit.findMany({
        where: {
            userId: session.user.id
        }, select: {
            id: true
        }
    })
    const otherMemberBenefitIds = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: session.user.id
        }, select: {
            id: true,
            memberBenefitId: true
        }
    })

    const memberBenefitsWithClicks = await prisma.memberBenefit.findMany({
        where: {
            OR: [
                { id: { in: memberBenefitIds.map(benefit => benefit.id) } },
                { id: { in: otherMemberBenefitIds.map(benefit => benefit.memberBenefitId) } }
            ]
        },
        include: {
            clicks: {
                where: {
                    OR: [
                        {
                            memberBenefitId: {
                                in: memberBenefitIds.map(benefit => benefit.id)

                            }
                        },
                        {
                            otherMemberBenefitId: {
                                in: otherMemberBenefitIds.map(benefit => benefit.id)
                            }
                        }
                    ]
                }
            }
        }
    })

    const cardStats = {
        totalClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.length).reduce((a, b) => a + b, 0),
        totalClicksMobile: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os === "iOS" || f.os == "android").length).reduce((a, b) => a + b, 0),
        totalClicksDesktop: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os !== "iOS" && f.os !== "android").length).reduce((a, b) => a + b, 0)
    }
    const chartStats = {
        benefitsClicks: memberBenefitsWithClicks.map(memberBenefit => {
            return {
                title: memberBenefit.title,
                count: memberBenefit.clicks.length,
            }
        }),
        benefitsByOs: memberBenefitsWithClicks.reduce<{
            [key: string]: number
        }>((acc, memberBenefit) => {
            memberBenefit.clicks.forEach(click => {
                if (click.os) {
                    if (acc[click.os]) {
                        acc[click.os]++
                    } else {
                        acc[click.os] = 1
                    }
                }
            })
            return acc;
        }, {})
    }

    return (
        <div>
            <DashboardCards totalClicks={cardStats.totalClicks} totalMobileClicks={cardStats.totalClicksMobile} totalDesktopClicks={cardStats.totalClicksDesktop} />
            <ChartContainer benefitClicks={chartStats.benefitsClicks} benefitsByOs={Object.keys(chartStats.benefitsByOs).map(key => {
                return {
                    title: key,
                    count: chartStats.benefitsByOs[key]
                }
            })}

                totalClicks={cardStats.totalClicks}
            />
        </div>
    )
}
