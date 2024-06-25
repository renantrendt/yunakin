'use server'
import { prisma } from "@/lib/prisma"
import MemberBenefitClick from "@prisma/client"

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

export async function upsertMemberBenefitLinkClick(memberBenefitClick: MemberBenefitClick) {
    
    // save the data to database
    const clickAdded = await prisma.memberBenefitClick.create({
        data:{
            ...memberBenefitClick
        }
    })

    return;
}

export async function insertMemberBenefit() {
    const benefits: MemberBenefit[] = 
    [
        {
        title:"LANS",
        userId:"60c8a5d3-9941-4ede-8936-e694df6d6340",
        description:"Discover the perfect co-working space at LANS – Recruiters enjoy 7 days free from on-demand access to call booths, work spots, private meeting, interview rooms and shared spaces also for events, all tailored for your productivity needs. Open 8am to 11pm.",
        imageURL:"/images/memberbenefit/lans.png",
        domain:"www.lans.com",
        link:"https://maps.app.goo.gl/S9ynyJHEzgSD8xWV6",
        location:"3388 17th St, SF, CA 94110",
        code:"LANSING"
        },
        {
        title:"WeCP",
        userId:"60c8a5d3-9941-4ede-8936-e694df6d6340",
        description:"Get free premium for 1 month! Enhance your hiring process with unlimited access to advanced coding tests. skill assessments, and analytics features.",
        imageURL:"/images/memberbenefit/wecp.png",
        domain:"www.wecreateproblems.com",
        link:"",
        location:"",
        code:"WECPWECP"
        }
     ]
    // save the data to database
    benefits.forEach(async memberBenefit => {
     await prisma.memberBenefit.create({
            data:{
                ...memberBenefit
            }
        })
    })
    return;
}

