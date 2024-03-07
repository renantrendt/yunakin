import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'
import Image from 'next/image'
import PlayIcon from '@/icons/PlayIcon.svg'
import { siteCopy } from '@/config/site-config'
import AnimatedSection from '../animated/AnimatedSection'
import { TypewriterEffect } from '../typewriter/TypeWriter'
import Avatar from '../atomic/avatar/Avatar'
export default function Hero() {
    return (
        <section
            className="my-20  mt-12 lg:mt-28  items-center text-center md:text-left text-black dark:text-white">
            <AnimatedSection>
                <div className='grid grid-cols-1 lg:grid-cols-7 justify-center gap-x-8 gap-y-8'>

                    <div className="w-full flex flex-1 lg:col-span-4 flex-col py-3 ">
                        <Typography type='h1' className=' text-left break-all  text-stone-950  min-h-[128px]  mb-4 lg:mb-5 !font-semibold '>
                            <TypewriterEffect words={siteCopy.heroSection.title.split(" ").map((word) => ({ text: word }))} />
                        </Typography>
                        <Typography type='h6' className='text-left text-neutral-600 max-w-lg' >
                            {siteCopy.heroSection.description}
                        </Typography>
                        
                        <div className='flex justify-center flex-col lg:flex-row lg:justify-start mt-8 lg:mt-14 gap-2 lg:gap-4'>
                            <Button
                                variant='primary'
                                classname='py-3 px-4 '
                                label="Start 14-Day Free Trial"
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
                        <div className='flex mt-12 items-center gap-5'>
                            <div className='flex gap-0'>
                                {siteCopy.heroSection.usedBy.map((user, index) =>
                                    <div className='-mr-2 ' key={index} >

                                        <Avatar
                                            image={user.avatar}
                                            name={user.name}
                                        />
                                    </div>

                                )}
                            </div>
                            <p className='text-sm' dangerouslySetInnerHTML={{ __html: siteCopy.heroSection.usedByCopy }}></p>
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
