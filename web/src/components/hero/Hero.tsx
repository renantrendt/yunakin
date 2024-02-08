import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'
import Image from 'next/image'
import PlayIcon from '@/assets/icons/PlayIcon.svg'
import { siteCopy } from '@/config/site-config'
import { motion } from 'framer-motion'
export default function Hero() {
    return (
        <section
            className="my-20  mt-20 lg:mt-40   items-center text-center md:text-left text-black dark:text-white">
            <motion.div className='grid grid-cols-1 lg:grid-cols-2 justify-center gap-x-8 gap-y-8'
                initial={
                    {
                        opacity: 0,
                        y: 100,
                    }
                }
                animate={{
                    opacity: 1,
                    y: 0,

                }}
                transition={
                    {
                        duration: 0.6,
                        ease: 'easeOut'
                    }
                }
            >
                <div className="w-full flex flex-1 flex-col gap-4 ">
                    <Typography type='h1' className=' text-left  text-stone-950 !font-black '>
                        {siteCopy.heroSection.title}
                    </Typography>
                    <Typography type='p' className='text-left text-xl py-6 leading-[30px] font-normal text-neutral-600' >
                        {siteCopy.heroSection.description}
                    </Typography>
                    <div className='flex justify-center flex-col lg:flex-row lg:justify-start gap-4 lg:gap-8'>
                        <Button
                            variant='primary'
                            classname='py-3 px-4 bg-gradient-to-b  text-white'
                            label='Call to action'
                        />
                        <Button
                            variant='outline'
                            label='Join Crash Course'
                            icon={
                                <div className='text-primary'>

                                    <PlayIcon />
                                </div>
                            }
                        />
                    </div>
                </div>
                <div className='relative w-full  flex-1 h-96'>
                    <Image
                        alt=''
                        fill
                        objectFit="cover"
                        src={siteCopy.heroSection.image}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>
            </motion.div>

        </section >

    )
}
