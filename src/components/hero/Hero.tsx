'use client'
import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'
import Image from 'next/image'
import PlayIcon from '@/icons/PlayIcon.svg'
import { siteCopy } from '@/config/site-config'
import AnimatedSection from '../animated/AnimatedSection'
import { TypewriterEffect } from '../typewriter/TypeWriter'
import { AnimatedTooltip } from '../molecules/animated-tooltip/AnimatedTooltip'
import { useTranslation } from '@/lib/i18n/client'
export default function Hero() {
    const { t } = useTranslation('landing');
    return (
        <section
            className="my-20  mt-24 lg:mt-40  items-center text-center md:text-left text-black dark:text-white">
            <AnimatedSection>
                <div className='grid grid-cols-1 lg:grid-cols-8 justify-center gap-x-8 gap-y-8'>

                    <div className="w-full flex flex-1 lg:col-span-4 flex-col py-3 ">
                        <Typography type='h1' className=' text-left break-all  text-stone-950  min-h-[128px]  mb-4 lg:mb-5 !font-semibold '>
                            <TypewriterEffect words={t("heroSection.title").split(" ").map((word) => ({ text: word }))} />
                        </Typography>
                        <Typography type='h6' className='text-left text-neutral-600 max-w-lg dark:text-sidebar-icon-dark' >
                            {t(siteCopy.heroSection.description)}
                        </Typography>

                        <div className='flex justify-center flex-col lg:flex-row lg:justify-start mt-8 lg:mt-14 gap-2 lg:gap-3'>
                            <Button
                                variant='primary'
                                size='lg'
                                label="Start 14-Day Free Trial"
                            />
                            <Button
                                variant='secondary'
                                label='Join Crash Course'
                                size='lg'
                                icon={
                                    <div className='text-primary'>

                                        <PlayIcon />
                                    </div>
                                }
                            />
                        </div>
                        <div className='flex mt-16 items-center gap-8'>
                            <div className='flex flex-row items-center justify-center'>
                                <AnimatedTooltip
                                    key={"animated-tooltip"}
                                    items={siteCopy.heroSection.usedBy.map((item, idx) => ({ ...item, image: item.avatar, designation: item.name, id: idx }))}
                                />
                            </div>
                            <p className='text-sm' dangerouslySetInnerHTML={{ __html: siteCopy.heroSection.usedByCopy }}></p>
                        </div>
                    </div>
                    <div className='relative w-full  flex-1 h-full  min-h-[283px] lg:col-span-4'>

                        <Image
                            alt=''
                            fill
                            objectFit="cover"
                            src={siteCopy.heroSection.image}
                            className="w-full h-full object-cover rounded-[32px]"
                        />
                    </div>
                </div>
            </AnimatedSection>
        </section >
    )
}
