'use server'
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { MemberBenefitLinkClickDto, MemberBenefitPageConfigDto, MemberPageViewDto } from "@/lib/types"
import { Category, MemberBenefit, MemberBenefitClick, MemberBenefitPageConfig } from "@prisma/client"
import exp from "constants"

export async function getChat(id: string, userId: string) {
    const chat = await prisma.chat.findFirst({
        where: {
            id: id
        },
        include: {
            messages: true
        }
    })

    if (!chat || (userId && chat.userId !== userId)) {
        return null
    }
    return chat
}

export async function getChats(userId: string) {
    const chats = await prisma.chat.findMany({
        where: {
            userId: userId
        },
    })
    return chats;
}

export async function deleteChat(id: string) {
    await prisma.message.deleteMany({
        where: {
            chatId: id
        }
    });
    const chats = await prisma.chat.delete({
        where: {
            id: id
        }
    })
    return chats;
}


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
    const clickAdded = await prisma.memberBenefitClick.create({
        data: {
            ...memberBenefitClick
        }
    })

    return;
}

export async function upsertMemberPageView(pageView: MemberPageViewDto) {
    // save the data to database
    const clickAdded = await prisma.memberPageViews.create({
        data: {
            device: pageView.device,
            browser: pageView.browser,
            os: pageView.os,
            memberBenefitPageConfigId: pageView.memberBenefitPageConfigId,
        }
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
    return updatedMemberBenefit
}
export async function deleteMemberBenefit(id: string) {
    await prisma.memberBenefit.delete({
        where: {
            id: id
        }
    })
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
            const onboardingMemberBenefits = await prisma.onboardingMemberBenefits.createMany({
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
            font: config.font
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