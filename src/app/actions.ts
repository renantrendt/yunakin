'use server'
import { auth } from "@/auth"
import siteUrls from "@/config/site-config"
import { prisma } from "@/lib/prisma"
import { AnalyticsResponse, MemberBenefitClickType, MemberBenefitLinkClickDto, MemberBenefitPageConfigDto, MemberPageViewDto, PartnershipType } from "@/lib/types"
import { MemberBenefit, MemberBenefitPageConfig } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import _ from 'lodash'
import { cookies } from "next/headers"

export async function checkUserExists(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    return user
}

export async function upsertMemberBenefitLinkClick(memberBenefitClick: MemberBenefitLinkClickDto) {

    // save the data to database
    await prisma.memberBenefitClick.create({
        data: {
            ...memberBenefitClick
        }
    })

    return;
}

export async function upsertMemberPageView(pageView: MemberPageViewDto) {
    // save the data to database
    await prisma.memberPageViews.create({
        data: {
            device: pageView.device,
            browser: pageView.browser,
            os: pageView.os,
            memberBenefitPageConfigId: pageView.memberBenefitPageConfigId,
        }
    })

    return;
}
export async function upsertPartnerPageView(pageView: MemberPageViewDto) {
    // save the data to database
    if (!pageView.partnerPageConfigIds || pageView.partnerPageConfigIds.length === 0) {
        return
    }
    await prisma.partnerPageViews.createMany({
        data: pageView.partnerPageConfigIds.map(id => {
            return {
                device: pageView.device,
                browser: pageView.browser,
                os: pageView.os,
                pageConfigId: pageView.memberBenefitPageConfigId,
                partnerPageConfigId: id
            }
        })
    })

    return;
}
// export async function insertMemberBenefit() {
//     const benefits: MemberBenefit[] =
//         [
//             {
//                 title: "LANS",
//                 userId: "60c8a5d3-9941-4ede-8936-e694df6d6340",
//                 description: "Discover the perfect co-working space at LANS – Recruiters enjoy 7 days free from on-demand access to call booths, work spots, private meeting, interview rooms and shared spaces also for events, all tailored for your productivity needs. Open 8am to 11pm.",
//                 imageURL: "/images/memberbenefit/lans.png",
//                 domain: "www.lans.com",
//                 link: "https://maps.app.goo.gl/S9ynyJHEzgSD8xWV6",
//                 location: "3388 17th St, SF, CA 94110",
//                 code: "LANSING"
//             },
//             {
//                 title: "WeCP",
//                 userId: "60c8a5d3-9941-4ede-8936-e694df6d6340",
//                 description: "Get free premium for 1 month! Enhance your hiring process with unlimited access to advanced coding tests. skill assessments, and analytics features.",
//                 imageURL: "/images/memberbenefit/wecp.png",
//                 domain: "www.wecreateproblems.com",
//                 link: "",
//                 location: "",
//                 code: "WECPWECP"
//             }
//         ]
//     // save the data to database
//     benefits.forEach(async memberBenefit => {
//         await prisma.memberBenefit.create({
//             data: {
//                 ...memberBenefit
//             }
//         })
//     })
//     return;
// }



export async function createCategory(name: string) {
    const newCategory = await prisma.category.create({
        data: {
            name
        }
    })
    return newCategory
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({
        where: {
            id: id
        }
    })
}

export async function createMemberBenefit(memberBenefit: MemberBenefit) {
    const newMemberBenefit = await prisma.memberBenefit.create({
        data: {
            ...memberBenefit
        }
    })
    revalidatePath(siteUrls.general.customize)
    return newMemberBenefit
}
export async function updateMemberBenefit(memberBenefit: MemberBenefit) {
    const updatedMemberBenefit = await prisma.memberBenefit.update({
        where: {
            id: memberBenefit.id
        },
        data: {
            ...memberBenefit
        }
    })
    revalidatePath(siteUrls.general.customize)
    return updatedMemberBenefit
}
export async function deleteMemberBenefit(id: string) {
    await prisma.memberBenefit.delete({
        where: {
            id: id
        }
    })
    revalidatePath(siteUrls.general.customize)
}


export async function createMemberPageConfigWithoutUser(memberPageConfig: MemberBenefitPageConfigDto, memberBenefitIds: string[]) {
    try {
        const newMemberPageConfig = await prisma.memberBenefitPageConfig.create({
            data: {
                title: memberPageConfig.title,
                description: memberPageConfig.description,
                imageURL: memberPageConfig.imageURL,
                userId: memberPageConfig.userId,
                clientSlug: memberPageConfig.clientSlug
            },
            include: {
                onboardingMemberBenefits: true
            }
        })
        if (newMemberPageConfig) {
            await prisma.onboardingMemberBenefits.createMany({
                data:
                    memberBenefitIds.map(id => {
                        return {
                            memberBenefitId: id,
                            memberBenefitPageConfigId: newMemberPageConfig.id
                        }
                    })
            })
            // newMemberPageConfig.onboardingMemberBenefits = onboardingMemberBenefits
        }
        return newMemberPageConfig
    } catch (error) {
        console.log(error)
        return null;
    }
}
export async function getMemberPageConfigByClientSlug(clientSlug: string) {
    const memberPageConfig = await prisma.memberBenefitPageConfig.findFirst({
        where: {
            clientSlug: clientSlug
        }
    })
    return memberPageConfig
}



export async function deleteOtherMemberBenefit(memberBenefitId: string, userId: string) {
    const otherMemberBenefitId = await prisma.otherMemberBenefit.findFirst({
        where: {
            memberBenefitId,
            userId
        },
        select: {
            id: true
        }
    })
    if (!otherMemberBenefitId) {
        throw new Error("Other Member Benefit Not Found");
    }
    await prisma.otherMemberBenefit.delete({
        where: {
            id: otherMemberBenefitId.id
        }
    })
    revalidatePath(siteUrls.general.customize)
}


export async function updateMemberPageConfig(config: MemberBenefitPageConfig) {
    console.log(config)
    const updatedConfig = await prisma.memberBenefitPageConfig.update({
        where: {
            id: config.id
        },
        data: {
            title: config.title,
            description: config.description,
            imageURL: config.imageURL,
            clientSlug: config.clientSlug,
            backgroundColor: config.backgroundColor,
            buttonColor: config.buttonColor,
            textColor: config.textColor,
            primaryFont: config.primaryFont,
            secondaryFont: config.secondaryFont,
            cardBackgroundColor: config.cardBackgroundColor,
            suggestDeal: config.suggestDeal,
        }
    })
    return updatedConfig
}


export async function updateOtherMemberBenefits(toBeCreatedOtherMemberBenefits: string[], toBeDeletedOtherMemberBenefits: string[]) {
    const session = await auth()

    const userId = session?.user?.id
    if (!userId) {
        return false
    }

    console.log('user', userId)

    try {
        await prisma.otherMemberBenefit.deleteMany({
            where: {
                memberBenefitId: {
                    in: toBeDeletedOtherMemberBenefits
                },
                userId
            }
        })

        console.log('deleted')
        // create the other member benefits
        console.log(toBeCreatedOtherMemberBenefits)
        await prisma.otherMemberBenefit.createMany({
            data: toBeCreatedOtherMemberBenefits.map(id => {
                return {
                    memberBenefitId: id,
                    userId
                }
            })
        })
        console.log('created')
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }


}

export async function updateSlug(configId: string, newSlug: string) {
    try {
        const updatedConfig = await prisma.memberBenefitPageConfig.update({
            where: {
                id: configId
            },
            data: {
                clientSlug: newSlug
            }
        })
        try {
            if (updatedConfig) {
                await prisma.user.update({
                    where: {
                        id: updatedConfig.userId as string
                    },
                    data: {
                        name: newSlug
                    }
                })
            }
        } catch (e) {
            console.error(e)
        }

        return updatedConfig
    } catch (error) {
        console.log(error)
        return null;
    }
}
export async function importBenefit(memberBenefitId: string, imported: boolean) {
    const session = await auth()

    const userId = session?.user?.id
    if (!userId) {
        return null
    }

    if (imported) {
        const otherMemberBenefit = await prisma.otherMemberBenefit.create({
            data: {
                memberBenefitId,
                userId
            }
        })
        revalidatePath(siteUrls.general.customize)
        return otherMemberBenefit
    }
    else {
        const otherMemberBenefit = await prisma.otherMemberBenefit.findFirst({
            where: {
                memberBenefitId,
                userId
            }
        })
        if (otherMemberBenefit) {
            await prisma.otherMemberBenefit.delete({
                where: {
                    id: otherMemberBenefit.id
                }
            })
        }
        revalidatePath(siteUrls.general.customize)
        return null
    }
}

export async function fetchAnalyticsData(values?: { from: Date, to: Date }) {

    const initialDateFrom = values?.from || new Date(new Date().setDate(new Date().getDate() - 7))
    const initialDateTo = values?.to || new Date()
    console.log(initialDateFrom, initialDateTo)
    const session = await auth()
    if (!session?.user) {
        redirect(siteUrls.general.login)
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
                    AND: [
                        {
                            createdAt: {
                                gte: initialDateFrom
                            }
                        },
                        {
                            createdAt: {
                                lte: initialDateTo
                            }
                        },
                        {
                            memberBenefitPageConfigId: config.id
                        }
                    ]
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
                    AND: [
                        {
                            createdAt: {
                                gte: initialDateFrom
                            }
                        },
                        {
                            createdAt: {
                                lte: initialDateTo
                            }
                        },
                        {
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
            AND: [
                {
                    createdAt: {
                        gte: initialDateFrom
                    }
                },
                {
                    createdAt: {
                        lte: initialDateTo
                    }
                },
                {
                    partnerPageConfigId: config?.id
                }
            ]
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



    const partnerCardStats = {
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
    const analytics: AnalyticsResponse = {
        cardStats,
        chartStats: {

            benefitsClicks: chartStats.benefitsClicks,
            benefitsClaims: chartStats.benefitClaims,
            benefitsSaves: chartStats.benefitsSaves,
            benefitsLiveAds: chartStats.benefitAds
        },
        chartNumberStats: {
            totalSaves: cardStats.totalSaves,
            totalClicks: cardStats.totalClicks,
            totalClaims: cardStats.totalClaims,
        },
        partnerChartStats: {
            partnerPageViews: partnerChartStats.partnerPageViews,
            clicksByDeal: partnerChartStats.clicksByDeal,
            claimsByDeal: partnerChartStats.claimsByDeal,
            savesByDeal: partnerChartStats.savesByDeal,
            revenueByAds: partnerChartStats.revenueFromAds,
        },
        partnerChartNumberStats: {
            totalPageViews: partnerCardStats.totalPageViews,
            totalClicks: partnerCardStats.totalClicks,
            totalClaims: partnerCardStats.totalClaims,
            totalSaves: partnerCardStats.totalSaves
        },
        partnerCardStats: partnerCardStats
    }
    return analytics;
}