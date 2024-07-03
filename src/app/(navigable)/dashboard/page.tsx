import React from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlag'
import ChartContainer from '@/components/dashboard/chart/ChartContainer'
import { DashboardCards } from '@/components/dashboard/cards/DashboardCards'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { MemberBenefitClickType } from '@/lib/types'
export default async function Dashboard() {

    const session = await auth()
    if (!session?.user) {
        throw notFound()
    }
    const memberBenefits = await prisma.memberBenefit.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            OtherMemberBenefit: {
                select: {
                    userId: true
                }
            }
        }
    })

    console.log("asdf")

    const memberBenefitIds = memberBenefits.map(benefit => benefit.id)

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
                { id: { in: memberBenefitIds } },
                { id: { in: otherMemberBenefitIds.map(benefit => benefit.memberBenefitId) } }
            ]
        },
        include: {
            clicks: {
                where: {
                    OR: [
                        {
                            memberBenefitId: {
                                in: memberBenefitIds.map(benefit => benefit)

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

        totalClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.SAVE_BENEFIT).length).reduce((a, b) => a + b, 0),
        totalMobileClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os === "iOS" || f.os == "android").length).reduce((a, b) => a + b, 0),
        totalDesktopClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os !== "iOS" && f.os !== "android").length).reduce((a, b) => a + b, 0),
        totalClaims: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.CLAIM_BENEFIT).length).reduce((a, b) => a + b, 0)
    }

    // TODO 
    // get all clicks from other companies
    // that have selected this  as a member benefit
    // and add them to the total clicks



    const chartStats = {
        benefitsClicks: memberBenefitsWithClicks.map(memberBenefit => {
            return {
                title: memberBenefit.title,
                count: memberBenefit.clicks.filter(m => m.event == MemberBenefitClickType.SAVE_BENEFIT).length,
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
        }, {}),
        benefitsClaims: memberBenefitsWithClicks.map(memberBenefit => {
            return {
                title: memberBenefit.title,
                count: memberBenefit.clicks.filter(m => m.event == MemberBenefitClickType.CLAIM_BENEFIT).length,
            }
        })
    }

    return (
        <div>
            <DashboardCards cardStats={cardStats} />
            <ChartContainer benefitClicks={chartStats.benefitsClicks} benefitsByOs={Object.keys(chartStats.benefitsByOs).map(key => {
                return {
                    title: key,
                    count: chartStats.benefitsByOs[key]
                }
            })}

                totalClicks={cardStats.totalClicks}
                totalClaims={cardStats.totalClaims}
                beenfitsClaims={chartStats.benefitsClaims}
            />
        </div>
    )
}
