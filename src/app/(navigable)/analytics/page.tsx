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
import { DateRangePicker } from '@/components/date-range/date-range-input'
import AnalyticsPageContainer from '@/components/analytics/AnalyticsPageContainer'
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
                    userId: true,
                    memberBenefit: {
                        select: {
                            id: true,
                            pageConfigId: true
                        }
                    }
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
    const clicksByCompany: {
        [key: string]: any
    } = {};
    const savesByCompany: {
        [key: string]: any
    } = {};
    const claimsByCompany: {
        [key: string]: any
    } = {};
    otherMemberBenefitClicks.forEach(click => {

        const userId = otherMemberBenefits.find(benefit => benefit.id == click.otherMemberBenefitId)?.userId
        const slug = slugs.find(slug => slug.userId == userId)?.clientSlug
        if (slug && slug !== config?.clientSlug) {
            if (click.event == MemberBenefitClickType.CLAIM_BENEFIT) {
                if (claimsByCompany[slug]) {
                    claimsByCompany[slug]++
                } else {
                    claimsByCompany[slug] = 1
                }
            } else if (click.event == MemberBenefitClickType.SAVE_BENEFIT) {
                if (savesByCompany[slug]) {
                    savesByCompany[slug]++
                } else {
                    savesByCompany[slug] = 1
                }
            } else if (click.event == MemberBenefitClickType.WEBSITE_CLICK) {
                if (clicksByCompany[slug]) {
                    clicksByCompany[slug]++
                } else {
                    clicksByCompany[slug] = 1
                }
            }
        }
    })

    // partner stats

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
        totalSaves: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.SAVE_BENEFIT).length).reduce((a, b) => a + b, 0),
        totalClicks: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.WEBSITE_CLICK).length).reduce((a, b) => a + b, 0),
        totalClaims: memberBenefitsWithClicks.map(memberBenefitWithClick => memberBenefitWithClick.clicks.filter(c => c.event == MemberBenefitClickType.CLAIM_BENEFIT).length).reduce((a, b) => a + b, 0),
        pageViews,
        totalBenefits: memberBenefits.length,
        totalWaitingBenefits: memberBenefits.filter(benefit => benefit.partnershipTypes?.includes(PartnershipType.NEEDS_APPROVAL)).length,
    }
    const chartStats = {
        benefitsClicks: memberBenefitsWithClicks.filter(c => c.clicks.length > 0).map(memberBenefit => {
            return {
                title: memberBenefit.title,
                count: memberBenefit.clicks.filter(m => m.event == MemberBenefitClickType.WEBSITE_CLICK).length,
            }
        }),
        benefitsSaves: memberBenefitsWithClicks.filter(c => c.clicks.length > 0).map(memberBenefit => {
            return {
                title: memberBenefit.title,
                count: memberBenefit.clicks.filter(m => m.event == MemberBenefitClickType.SAVE_BENEFIT).length,
            }
        }),
        benefitClaims: memberBenefitsWithClicks.filter(c => c.clicks.length > 0).map(memberBenefit => {
            return {
                title: memberBenefit.title,
                count: memberBenefit.clicks.filter(m => m.event == MemberBenefitClickType.CLAIM_BENEFIT).length,
            }
        }),
        benefitAds: [] as {
            title: string,
            count: number
        }[],
    }



    const partnerStats = {
        pageViews: partnerPageViews.length,
        totalPartners: _.keys(clicksByCompany).length,
        totalWaitingPartners: 0,
        totalPageViews: partnerPageViews.length,
        totalSaves: _.reduce(savesByCompany, (acc, value) => acc + value, 0),
        totalClicks: _.reduce(clicksByCompany, (acc, value) => acc + value, 0),
        totalClaims: _.reduce(claimsByCompany, (acc, value) => acc + value, 0)
    }
    const partnerPageViewsReduced = partnerPageViews.reduce<{
        [key: string]: number
    }>((acc, partnerPageView) => {
        if (acc[partnerPageView.pageConfig.clientSlug]) {
            acc[partnerPageView.pageConfig.clientSlug]++
        } else {
            acc[partnerPageView.pageConfig.clientSlug] = 1
        }
        return acc
    }, {})

    const partnerChartStats = {
        partnerPageViews: _.keys(partnerPageViewsReduced).map(key => ({
            title: key,
            count: partnerPageViewsReduced[key]
        })
        ),
        clicksByDeal: _.keys(clicksByCompany).map(key => ({
            title: key,
            count: clicksByCompany[key]
        }),
        ),
        claimsByDeal: _.keys(claimsByCompany).map(key => ({
            title: key,
            count: claimsByCompany[key]
        })),
        savesByDeal: _.keys(savesByCompany).map(key => ({
            title: key,
            count: savesByCompany[key]
        })),
        revenueFromAds: [] as {
            title: string,
            count: number
        }[],
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
        _.keys(partnerStats).forEach(key => {
            if (partnerStats[key as keyof typeof partnerStats] > 0) {
                hasData = true
            }
        })
    }

    if (!hasData) {
        _.keys(chartStats).forEach(key => {
            if (chartStats[key as keyof typeof chartStats].length > 0) {
                hasData = true
            }
        })
    }
    if (!hasData) {
        _.keys(partnerChartStats).forEach(key => {
            if (partnerChartStats[key as keyof typeof partnerChartStats].length > 0) {
                hasData = true
            }
        })
    }

    // if no data randomize the values for the demo
    if (!hasData) {
        console.log('randomizing')
        // randomize the values
        _.keys(cardStats).forEach(key => {
            cardStats[key as keyof typeof cardStats] = Math.floor(Math.random() * 100)
        })
        _.keys(chartStats).forEach((key, index) => {
            chartStats[key as keyof typeof chartStats] = _.times(5, () => {
                return {
                    title: `Deal ${Math.floor(Math.random() * 5 + 1)}`,
                    count: Math.floor(Math.random() * 100)
                }
            })
        })
        _.keys(partnerStats).forEach((key) => {
            partnerStats[key as keyof typeof partnerStats] = Math.floor(Math.random() * 100)
        })
        _.keys(partnerChartStats).forEach((key, index) => {
            partnerChartStats[key as keyof typeof partnerChartStats] = _.times(5, () => {
                return {
                    title: `Partner ${Math.floor(Math.random() * 5 + 1)}`,
                    count: Math.floor(Math.random() * 100)
                }
            })
        })
    }


    return (
        <AnalyticsPageContainer
            hasData={hasData}
            cardStats={cardStats}
            chartStats={{
                totalSaves: cardStats.totalSaves,
                totalClicks: cardStats.totalClicks,
                totalClaims: cardStats.totalClaims,
                benefitsClicks: chartStats.benefitsClicks,
                benefitsClaims: chartStats.benefitClaims,
                benefitsSaves: chartStats.benefitsSaves,
                benefitsLiveAds: chartStats.benefitAds
            }}
            partnerCardStats={partnerStats}
            partnerStats={{
                partnerPageViews: partnerChartStats.partnerPageViews,
                clicksByDeal: partnerChartStats.clicksByDeal,
                claimsByDeal: partnerChartStats.claimsByDeal,
                savesByDeal: partnerChartStats.savesByDeal,
                revenueByAds: partnerChartStats.revenueFromAds,
                totalPageViews: partnerStats.totalPageViews,
                totalClicks: partnerStats.totalClicks,
                totalClaims: partnerStats.totalClaims,
                totalSaves: partnerStats.totalSaves
            }}
        />
    )
}
