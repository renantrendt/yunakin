import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { MemberBenefit } from '@prisma/client';
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
        <div className='max-w-[1440px] py-20 w-full mx-auto px-4 md:px-28'>
            <div className='px-4 md:px-0'>
                <PageHeader
                    title='Member Benefits'
                    description='This is the page for member benefits'
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
                                // <BlogCard loading={false} key={index} category={category} />
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
    )
}

export default MemberbenefitPage

