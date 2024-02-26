import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'
import Image from 'next/image'
import PlayIcon from '@/icons/PlayIcon.svg'
import { siteCopy } from '@/config/site-config'
import AnimatedSection from '../animated/AnimatedSection'
export default function Hero() {
    return (
        <section
            className="my-20  mt-20 lg:mt-40   items-center text-center md:text-left text-black dark:text-white">
            <AnimatedSection>
                <div className='grid grid-cols-1 lg:grid-cols-7 justify-center gap-x-8 gap-y-8'>

                    <div className="w-full flex flex-1 lg:col-span-4 flex-col py-3 ">
                        <Typography type='h1' className=' text-left break-keep  text-stone-950  lg:mb-5 !font-semibold '>
                            {siteCopy.heroSection.title}
                        </Typography>
                        <Typography type='h6' className='text-left text-neutral-600 max-w-lg' >
                            {siteCopy.heroSection.description}
                        </Typography>
                        <div className='flex justify-center flex-col lg:flex-row lg:justify-start lg:mt-14 gap-4 lg:gap-8'>
                            <Button
                                variant='primary'
                                classname='py-3 px-4 '
                                label="Learn More"
                            />
                            <Button
                                variant='secondary'
                                label='Join Crash Course'
                                icon={
                                    <div className='text-primary'>

                                        <PlayIcon />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <div className='relative w-full  flex-1 h-96 lg:col-span-3'>
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
