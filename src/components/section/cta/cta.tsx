import AnimatedSection from '@/components/animated/AnimatedSection'
import Avatar from '@/components/atomic/avatar/Avatar'
import Typography from '@/components/atomic/typography/Typography'
import ContentSection from '@/containers/layout/ContentSection'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Cta = () => {
    const { t } = useTranslation('landing');

    const reasons = t("ctaSection.reasons", { returnObjects: true }) as { metric: string, description: string }[];
    return (
        <ContentSection
        >
            <div className=" w-full mt-20 lg:mt-32  flex-col justify-center items-center gap-0 lg:gap-10 inline-flex text-black ">
                <AnimatedSection className=' flex flex-col justify-center max-w-3xl items-center gap-5 mb-6'>
                    <Typography type='h1' className='text-center !text-5xl leading-[133%]' >{t("ctaSection.title")}</Typography>
                    <Typography type='h6' className='text-center max-w-2xl !text-[18px]' >{t("ctaSection.description")}</Typography>
                </AnimatedSection>
                <AnimatedSection className=' hidden md:flex justify-between  w-full gap-4 items-center'>
                    <div className='flex flex-col h-full justify-between gap-10'>

                        <div className='avatars flex'>
                            <Avatar size={"xl"} image='/images/landing/avatars/first.png' name='avatar' className='relative top-1 left-2' />
                            <Avatar size={"xl"} image='/images/landing/avatars/second.png' name='avatar' className='relative top-10' />
                            <Avatar size={"xl"} image='/images/landing/avatars/third.png' name='avatar' className='relative bottom-4 right-6' />
                        </div>
                        <div>
                            <Typography type='h5' className='text-center  !text-black !font-bold max-w-2xl !text-[18px]' >{t("ctaSection.mycompany")}</Typography>
                            <Typography type='h6' className='text-center max-w-2xl lg:!text-[20px] ' >{t("ctaSection.clients")}</Typography>
                        </div>
                    </div>

                    <div className='relative max-w-[500px] w-full  flex-1 h-full  min-h-[300px] lg:min-h-[500px] '>
                        <Image
                            alt=''
                            fill
                            objectFit="contain"
                            src={"/images/landing/performance.svg"}
                            className="w-full z-10 object-cover rounded-[32px]"
                        />
                        <Typography type='p' className='absolute bottom-16   !text-[#0F0F0F66] !text-xs left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>{t("ctaSection.compliance")}</Typography>
                        <div className='absolute top-1/2   w-full flex gap-4  lg:w-[800px]  left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            {
                                Array(20).fill(0).map((_, index) => (
                                    <div key={index} className={cn("w-8 h-1 bg-[#D6D6D6] rounded-full", { "w-5": index == 0 || index == 19 })}></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col h-full justify-between gap-10'>
                        <div className='avatars flex '>
                            <Avatar size={"xl"} image='/images/landing/avatars/fourth.png' name='avatar' className='relative top-1 left-2' />
                            <Avatar size={"xl"} image='/images/landing/avatars/fifth.png' name='avatar' className='relative top-10' />
                            <Avatar size={"xl"} image='/images/landing/avatars/sixth.png' name='avatar' className='relative bottom-4 right-6' />
                        </div>
                        <div>
                            <Typography type='h5' className='text-center  !text-black !font-bold max-w-2xl !text-[18px]' >{t("ctaSection.othercompany")}</Typography>
                            <Typography type='h6' className='text-center max-w-2xl lg:!text-[20px] ' >{t("ctaSection.clients")}</Typography>
                        </div>
                    </div>
                </AnimatedSection>
                <AnimatedSection className='  md:hidden flex  justify-start mt-10  w-full gap-0 items-center'>
                    <div className='flex flex-col flex-1  h-full justify-center gap-0'>

                        <div className='avatars flex'>
                            <Avatar size={"xs"} image='/images/landing/avatars/first.png' name='avatar' className='relative top-1 left-2' />
                            <Avatar size={"xs"} image='/images/landing/avatars/second.png' name='avatar' className='relative top-5' />
                            <Avatar size={"xs"} image='/images/landing/avatars/third.png' name='avatar' className='relative bottom-1 right-4' />
                        </div>
                        <div className='pt-4'>
                            <Typography type='h5' className='text-center  !text-black !leading-[100%]  !font-bold max-w-2xl !text-[10px]' >{t("ctaSection.mycompany")}</Typography>
                            <Typography type='h6' className='text-center max-w-2xl !text-[8px] ' >{t("ctaSection.clients")}</Typography>
                        </div>
                    </div>
                    <div className='relative max-w-[500px] w-full  h-full  min-h-[150px]  '>
                        <Image
                            alt=''
                            fill
                            objectFit="contain"
                            src={"/images/landing/performance-mobile.svg"}
                            className="w-full z-10 object-cover rounded-[32px]"
                        />
                        <Typography type='p' className='absolute -bottom-2 text-[8px] w-full  !text-[#0F0F0F66] text-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>{t("ctaSection.compliance")}</Typography>
                        <div className='absolute top-1/2  w-[110%] flex gap-1   lg:w-[800px]  left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            {
                                Array(12).fill(0).map((_, index) => (
                                    <div key={index} className={cn("w-6  h-1 bg-[#D6D6D6] rounded-full", { "w-3": index == 0 || index == 11 })}></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col h-full flex-1 justify-center gap-0'>
                        <div className='avatars flex '>
                            <Avatar size={"xs"} image='/images/landing/avatars/fourth.png' name='avatar' className='relative top-1 left-2' />
                            <Avatar size={"xs"} image='/images/landing/avatars/fifth.png' name='avatar' className='relative top-5' />
                            <Avatar size={"xs"} image='/images/landing/avatars/sixth.png' name='avatar' className='relative bottom-1 right-4' />
                        </div>
                        <div className='pt-4'>
                            <Typography type='h5' className='text-center  !text-black leading-[130%] !font-bold max-w-2xl !text-[10px]' >{t("ctaSection.othercompany")}</Typography>
                            <Typography type='h6' className='text-center max-w-2xl !text-[8px] ' >{t("ctaSection.clients")}</Typography>
                        </div>
                    </div>
                </AnimatedSection>
            </div >
        </ContentSection>
    )
}

export default Cta