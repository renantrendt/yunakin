import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import MemberBenefit from "@prisma/client"
import { insertMemberBenefit } from '@/app/actions';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
import { prisma } from '@/lib/prisma';
const MemberbenefitPage = async ({ params }: { params: { clientSlug: string } }) => {

    const config = await prisma.memberBenefitPageConfig.findUnique({
        where: {
            clientSlug: params.clientSlug
        }
    })

    const benefits = await prisma.memberBenefit.findMany()
    const clientSlug = params.clientSlug;


    return (
        <div className='max-w-[1440px] py-20 w-full mx-auto px-4 md:px-28'>
            <div className='px-4 md:px-0'>
                <PageHeader />
                <h1>{clientSlug}</h1>
            </div>

            <div>
                <div className=" 	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                    <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{"Work"}</div>
                </div>
                <div className='flex flex-row gap-3 lg:gap-6 justify-items-center  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>

                    {benefits && benefits.map((benefit: MemberBenefit, index: any) => (
                        // <BlogCard loading={false} key={index} category={category} />
                        <MemberBenefitCard key={index} benefit={benefit} />

                    ))}
                </div>
            </div>
        </div>
    )
}

export default MemberbenefitPage

