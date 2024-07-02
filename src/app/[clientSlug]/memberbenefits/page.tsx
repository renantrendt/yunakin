import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { MemberBenefit } from '@prisma/client';
import ContentSection from '@/containers/layout/ContentSection';
import { cn } from '@/utils/cn';
import Avatar from '@/components/atomic/avatar/Avatar';
import { Avatar3xl } from '@/components/atomic/avatar/Avatar.stories';
import Typography from '@/components/atomic/typography/Typography';
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string } }) => {
    const session = await auth()

    if (!session) {
        notFound()
        return;
    }
    const config = await prisma.memberBenefitPageConfig.findUnique({
        where: {
            clientSlug: params.clientSlug
        }
    })

    if (!config) {
        notFound()
        return;
    }
    let benefits: MemberBenefit[] = []

    if (!config.userId) {
        notFound()
        return;
    }
    const otherBenefits = await prisma.otherMemberBenefit.findMany({
        where: {
            userId: config.userId
        }
    })

    benefits = await prisma.memberBenefit.findMany({
        where: {
            OR: [
                { userId: config.userId },
                { id: { in: otherBenefits.map(benefit => benefit.memberBenefitId) } }
            ]
        }
    })
    const categories = await prisma.category.findMany({
        where: {
            id: {
                in: benefits.map(benefit => benefit.categoryId)
            }
        }
    })

    return (
        <>
            <div className='max-w-[1440px] py-20 w-full mx-auto px-4 md:px-28'>
                <div className="navbar-start w-full text-left ">
                    <Avatar name='avatar' size={"3xl"} image={config.imageURL} className='dark:hidden' />
                </div>
                <div className='px-4 md:px-0'>
                    <PageHeader
                        title={config.title}
                        description={config.description}
                    />
                </div>
                <div>
                    {categories.map(category => (
                        <>
                            <div className=" 	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                                <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{category.name}</div>
                            </div>
                            <div className='flex flex-row gap-3 lg:gap-6 justify-items-center  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                                {benefits && benefits.filter(b => b.categoryId == category.id).map((benefit: MemberBenefit, index: any) => (
                                    <MemberBenefitCard
                                        otherMemberbenefit={otherBenefits.find(b => b.memberBenefitId == benefit.id)}
                                        key={index}
                                        benefit={benefit}
                                    />
                                ))}
                            </div>
                        </>
                    ))}
                </div>

            </div>
            <div className='footer flex justify-center bottom-8 mb-5'>
                <Typography type='p' className='text-center flex gap-2 '>
                    <span> Powered by </span><a href='https://www.yunakin.com/' target='_blank' className='text-blue-500 underline'>Yunakin.com</a>
                </Typography>
            </div>
        </>

    )
}

export default MemberbenefitPage

