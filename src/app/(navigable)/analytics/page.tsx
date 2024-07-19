import React from 'react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { MemberBenefitClickType, PartnershipType } from '@/lib/types'
import Typography from '@/components/atomic/typography/Typography'
import WarningIcon from "@/icons/toast/warning-icon.svg"
import _ from 'lodash'
import DealBookChartContainer from '@/components/dashboard/chart/DealbookChartContainer'
import DealBookAnalyticsSection from '@/components/analytics/section/DealBookAnalyticsSection'
import { DealbookDashboardCards } from '@/components/dashboard/cards/DealbookDashboardCards'
import PartnerDealBookAnalyticsSection from '@/components/analytics/section/PartnerDealBookAnalyticsSection'
import { t } from 'i18next'
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
        // silent catch
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

    const partnerPageViews = await prisma.partnerPageViews.findMany({
        where: {
            partnerPageConfigId: config?.id
        },
        include: {
            pageConfig: {
                select: {
                    clientSlug: true
                }
            }
        }
    })

    const cardStats = {
        totalClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.SAVE_BENEFIT).length).reduce((a, b) => a + b, 0),
        totalClaims: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event != MemberBenefitClickType.SAVE_BENEFIT).length).reduce((a, b) => a + b, 0),
        pageViews,
        totalBenefits: memberBenefits.length,
        totalWaitingBenefits: memberBenefits.filter(benefit => benefit.partnershipTypes?.includes(PartnershipType.NEEDS_APPROVAL)).length,
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



    const partnerStats = {
        pageViews: partnerPageViews.length,
        totalPartners: 0,
        totalWaitingPartners: 0
    }

    const partnerChartStats = {
        partnerPageViews: partnerPageViews.reduce<{
            [key: string]: number
        }>((acc, partnerPageView) => {
            if (acc[partnerPageView.pageConfig.clientSlug]) {
                acc[partnerPageView.pageConfig.clientSlug]++
            } else {
                acc[partnerPageView.pageConfig.clientSlug] = 1
            }
            return acc
        }
            , {}),
        clicksByDeal: [{
            title: 'Deal 1',
            count: 0
        }],
        claimsByDeal: [
            {
                title: 'Deal 1',
                count: 0
            }
        ],
        totalPageViews: partnerPageViews.length,
        totalClicks: 0,
        totalClaims: 0
    }
    // partner dealbook



    // check if no clicks yet
    let hasData = false
    _.keys(cardStats).forEach(key => {
        if (cardStats[key as keyof typeof cardStats] > 0) {
            hasData = true

        }
    })
    if (!hasData) {
        chartStats.benefitsClicks.forEach(click => {
            if (click.count > 0) {
                hasData = true
            }
        })
        if (!hasData) {
            chartStats.benefitsClaims.forEach(click => {
                if (click.count > 0) {
                    hasData = true
                }
            })
        }
        if (!hasData) {
            _.keys(chartStats.otherCompanyClicks).forEach(key => {
                if (chartStats.otherCompanyClicks[key] > 0) {
                    hasData = true
                }
            })
        }
    }

    // if no data randomize the values for the demo
    if (!hasData) {
        cardStats.totalClicks = Math.floor(Math.random() * 1000)
        cardStats.totalClaims = Math.floor(Math.random() * 1000)
        cardStats.pageViews = Math.floor(Math.random() * 10000)
        cardStats.totalBenefits = Math.floor(Math.random() * 100)
        cardStats.totalWaitingBenefits = Math.floor(Math.random() * 100)
        chartStats.benefitsClicks = Array.from({ length: 5 }, (_, k) => ({
            title: 'Benefit ' + (k + 1),
            count: Math.floor(Math.random() * 100)
        })
        )
        chartStats.benefitsClaims = Array.from({ length: 5 }, () => ({
            title: 'Benefit',
            count: Math.floor(Math.random() * 100)
        })
        )
        chartStats.otherCompanyClicks = {
            'Company 1': Math.floor(Math.random() * 100),
            'Company 2': Math.floor(Math.random() * 100),
            'Company 3': Math.floor(Math.random() * 100),
            'Company 4': Math.floor(Math.random() * 100),
            'Company 5': Math.floor(Math.random() * 100),
        }
    }



    return (
        <div className=' px-5 py-4   lg:px-12'>
            {!hasData && <div className='warning bg-white py-3 px-4 flex gap-2 flex-row items-center mb-7'>
                <WarningIcon />
                <Typography type='p' className='text-black font-semibold font-satoshiBlack text-sm leading-normal'>This is a demo screen. The analytics on this page are not real. It will be updated after you start receiving the first click.</Typography>
            </div>
            }

            <DealBookAnalyticsSection
                cardStats={cardStats}
                chartStats={chartStats}
            />
            <PartnerDealBookAnalyticsSection
                cardStats={partnerStats}
                stats={partnerChartStats}
            />
        </div>
    )
}
