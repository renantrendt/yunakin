import RockerLaunchIcon from '@/assets/icons/RockerLaunchIcon'
import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'

export default function Hero() {
    return (
        <section
            className="my-20 flex flex-col md:flex-row justify-center items-center text-center md:text-left text-black dark:text-white">
            <div className="w-full ">
                <Typography type='h1' className='text-5xl leading-[64px] text-stone-950 font-bold max-w-2xl'>
                    Create high-converting funnels in just 60 minutes
                </Typography>
                <Typography type='p' className='text-xl py-6 leading-[30px] font-normal text-neutral-600' >
                    Generate a steady flow of customers or talents with lightning-fast and easy-to-build Perspective Funnels. No design or programming skills required.
                </Typography>
                <div className='flex justify-center md:justify-start gap-8'>
                    <Button
                        variant='primary'
                        classname='py-3 px-4 bg-gradient-to-b from-[#2F80ED] to-[#146EE9] text-white'
                        label='Call to action'
                    />
                    <Button
                        variant='outline'
                        label='Join Crash Course'
                    />
                </div>
            </div>
            <div
                className="relative w-full  flex justify-end ">
                <RockerLaunchIcon />
            </div>
        </section>

    )
}
