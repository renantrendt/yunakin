import PageHeader from '@/components/memberbenefit/PageHeader';
import React from 'react'
import Image from 'next/image';
import { MemberBenefit } from '@/lib/types';
import MemberBenefitCard from '@/components/memberbenefit/MemberBenefitCard';
const MemberbenefitPage = async () => {
   const benefits: MemberBenefit[] = 
   [
   {
    title:"LANS",
    description:"Discover the perfect co-working space with LANS – on-demand access to call booths and work spots, tailored for your productivity needs.",
    imageURL:"/images/memberbenefit/lans.png",
    domain:"www.lans.com",
    link:"https://maps.app.goo.gl/S9ynyJHEzgSD8xWV6",
    location:"3388 17th St, SF, CA 94110",
    code:"LANSWECP"
   },
   {
    title:"WeCP",
    description:"Get free premium for 1 month! Enhance your hiring process with unlimited access to advanced coding tests. skill assessments, and analytics features.",
    imageURL:"/images/memberbenefit/wecp.png",
    domain:"www.wecreateproblems.com",
    link:"",
    location:"",
    code:"WECPWECP"
   }
    ]

    return (
        <div className='max-w-[1440px] py-20 w-full mx-auto px-4 md:px-28'>
            <div className='px-4 md:px-0'>
                <PageHeader />
            </div>
               
            <div>
                <div className=" 	  px-5 py-1.5 bg-category-blog-background rounded-[30px] border-none justify-start items-start gap-2.5 inline-flex dark:bg-card-dark">
                <div className=" text-center text-category-blog-color dark:text-sidebar-icon-dark text-sm font-semibold  uppercase tracking-[0.5px]">{"Workspace"}</div>
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