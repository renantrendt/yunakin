'use client'
import React from 'react'
import Button from '../atomic/button/Button';
import Typography from '../atomic/typography/Typography';
import Image from 'next/image';
import ArrowRightIcon from "@/icons/arrow-right.svg";
import AnimatedSection from '../animated/AnimatedSection';
import siteUrls from '@/config/site-config';
import { useTranslation } from '@/lib/i18n/client';
interface FeatureItemProps {
    direction?: "ltr" | "rtl" | string
    image?: string
    title: string;
    description: string;
}
const FeatureItem = ({ direction = "ltr", title, description, image }: FeatureItemProps) => {
    const { t } = useTranslation('landing')

    return (
        <AnimatedSection className={`grid grid-cols-1  auto-rows-fr   lg:flex items-start justify-start relative  lg:justify-between flex-col lg:flex-row lg:items-center  gap-x-8 gap-y-8  lg:gap-16 w-full  text-black dark:text-white   ${direction === "ltr" ? "" : "lg:flex-row-reverse"}`} >
            <div className="flex-col flex-1  justify-center items-start gap-0  h-full">
                <div className="flex-col justify-start items-start gap-5 flex text-left max-w-lg">
                    <Typography type='h1' className='text-[32px]  lg:!text-[40px] font-semibold !leading-normal lg:!leading-normal  '>{title}</Typography>
                    <Typography type='p' className="">{description}</Typography>
                </div>
                <Button label={t("features.learn-more")} className=' mt-4 lg:mt-10 ' variant="secondary" size='lg' icon={
                    <span className='text-[#E0C200]'>
                        <ArrowRightIcon />
                    </span>
                } trailing onClick={() => {
                    window.open(siteUrls.general.comingSoon, "_blank")
                }} />
            </div>
            <div className='relative w-full row-start-1  flex-1 h-full lg:h-96'>
                <Image alt=''
                    fill
                    objectFit="contain"
                    src={image ?? ""}
                    quality={100}
                    className="w-full h-full bg-cover rounded-2xl"
                />
            </div>
        </AnimatedSection >

    )
}

export default FeatureItem