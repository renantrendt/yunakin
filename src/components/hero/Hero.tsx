'use client'
import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'
import Image from 'next/image'
import PlayIcon from '@/icons/PlayIcon.svg'
import AnimatedSection from '../animated/AnimatedSection'
import { AnimatedTooltip } from '../molecules/animated-tooltip/AnimatedTooltip'
import { useTranslation } from '@/lib/i18n/client'
import ContentSection from '@/containers/layout/ContentSection'
import LockIcon from '@/icons/landing/lock-icon.svg'
export default function Hero() {
    const { t } = useTranslation('landing');

    const usedBy = t("heroSection.usedBy", { returnObjects: true }) as { name: string, avatar: string }[];
    return (
        <ContentSection>

            <section
                className="my-20  mt-24 lg:mt-40 lg:mb-0 items-center text-center md:text-left text-black dark:text-white" >
                <div className='grid grid-cols-1   justify-center gap-x-8 gap-y-2'>

                    <div className="w-full flex flex-1 justify-center flex-col py-3 ">
                        <AnimatedSection className='flex justify-center'>

                            <Typography type='h1' className=' text-center break-all leading-[100%] max-w-3xl     mb-4 lg:mb-5 !font-semibold break-words '>
                                {/* <TypewriterEffect words={t("heroSection.title").split(" ").map((word) => ({ text: word }))} /> */}
                                {t("heroSection.title")}
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection className='flex justify-center'>
                            <Typography type='h6' className=' text-center     text-neutral-600 max-w-lg dark:text-sidebar-icon-dark' >
                                {t("heroSection.description")}
                            </Typography>
                        </AnimatedSection>
                        <AnimatedSection type='scroll-opacity' delay={0.1} className='flex justify-center flex-col  w-full items-center  mt-8 lg:mt-14 gap-2 lg:gap-3'>
                            <Button
                                variant='primary'
                                size='lg'
                                className='w-fit'
                                label={t('heroSection.cta')}
                            />
                            <div className='flex justify-center gap-1 items-center'>
                                <LockIcon />
                                <Typography type='p' className='text-[#0F0F0F66]'>{t('heroSection.locked')}</Typography>
                            </div>
                        </AnimatedSection>
                    </div>
                    <AnimatedSection type='scroll-opacity' delay={0.05} className='relative w-full  lg:mt-10 flex-1 h-full  min-h-[630px] '>

                        <Image
                            alt=''
                            fill
                            objectFit="contain"
                            src={"/images/landing/hero-dashboard.svg"}
                            className="w-full min-h-[800px] object-cover rounded-[32px]"
                        />
                    </AnimatedSection>
                </div>
            </section >
        </ContentSection>

    )
}
