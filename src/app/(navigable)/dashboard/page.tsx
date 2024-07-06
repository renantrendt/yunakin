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

    const config = await prisma.memberBenefitPageConfig.findFirst({
        where: {
            userId: session.user.id
        }
    })

    let pageViews = 0
    try {
        if (config) {
            const result = await prisma.memberPageViews.aggregate({
                _count: true,
                where: {
                    memberBenefitPageConfigId: config.id
                }
            })
            pageViews = result._count
        }

    } catch (error) {

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


    const memberBenefitIds = memberBenefits.map(benefit => benefit.id)

    const otherMemberBenefitIds = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: session.user.id
        }, select: {
            userId: true,
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
    const otherMemberBenefitClicks = await prisma.memberBenefitClick.findMany({
        where: {
            AND: [
                {
                    memberBenefitId: {
                        in: memberBenefitIds
                    },
                },
                {
                    otherMemberBenefitId: {
                        not: null
                    }
                }
            ]

        },
    });
    const clicksByCompany: {
        [key: string]: any
    } = {};

    const otherMemberBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            id: {
                in: otherMemberBenefitClicks.filter(f => f !== null).map(click => click.otherMemberBenefitId) as string[]
            },

        }, select: {
            userId: true,
            id: true
        }
    })
    const slugs = await prisma.memberBenefitPageConfig.findMany({
        where: {
            userId: {
                in: otherMemberBenefits.map(benefit => benefit.userId)
            }
        },
        select: {
            clientSlug: true,
            userId: true
        }
    })
    otherMemberBenefitClicks.filter(f => f.event == MemberBenefitClickType.SAVE_BENEFIT).forEach(click => {
        const userId = otherMemberBenefits.find(benefit => benefit.id == click.otherMemberBenefitId)?.userId
        const slug = slugs.find(slug => slug.userId == userId)?.clientSlug
        if (slug && slug !== config?.clientSlug) {
            if (clicksByCompany[slug]) {
                clicksByCompany[slug]++
            } else {
                clicksByCompany[slug] = 1
            }
        }
    })
    const cardStats = {
        totalClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.SAVE_BENEFIT).length).reduce((a, b) => a + b, 0),
        totalMobileClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os === "iOS" || f.os == "android").length).reduce((a, b) => a + b, 0),
        totalDesktopClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.
            filter(f => f.os !== "iOS" && f.os !== "android").length).reduce((a, b) => a + b, 0),
        totalClaims: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event != MemberBenefitClickType.SAVE_BENEFIT).length).reduce((a, b) => a + b, 0),
        pageViews
    }
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
                count: memberBenefit.clicks.filter(m => m.event != MemberBenefitClickType.SAVE_BENEFIT).length,
            }
        }),
        otherCompanyClicks: clicksByCompany
    }


    return (
        <div>
            <DashboardCards cardStats={cardStats} />
            <ChartContainer benefitClicks={chartStats.benefitsClicks}
                totalClicks={cardStats.totalClicks}
                totalClaims={cardStats.totalClaims}
                beenfitsClaims={chartStats.benefitsClaims}
                companyClicks={Object.keys(chartStats.otherCompanyClicks).map(key => {
                    return {
                        title: key,
                        count: chartStats.otherCompanyClicks[key]
                    }
                })}
                totalCompanyClicks={Object.keys(chartStats.otherCompanyClicks).map(key => chartStats.otherCompanyClicks[key]).reduce((a, b) => a + b, 0)}

            />
        </div>
    )
}
