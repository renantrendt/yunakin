import RockerLaunchIcon from '@/assets/icons/RockerLaunchIcon'
import React from 'react'
import Button from '../button/Button'

export default function Hero() {
    return (
        <section
            className="my-20 flex flex-col md:flex-row justify-center items-center text-center md:text-left text-black dark:text-white">
            <div className="w-full ">
                <h1 className="text-5xl leading-[64px] text-stone-950 font-black max-w-2xl">Create high-converting funnels in just 60 minutes</h1>
                <p className="text-xl py-6 leading-[30px] font-normal text-neutral-600">
                    Generate a steady flow of customers or talents with lightning-fast and easy-to-build Perspective Funnels. No design or programming skills required.                </p>
                <div className='flex justify-center md:justify-start gap-8'>
                    <Button
                        variant='primary'
                        classname='py-3 px-4 bg-gradient-to-b from-[#2F80ED] to-[#146EE9] text-white'
                    >
                        Call to action
                    </Button>
                    <Button
                        variant='outline'

                    >
                        Join Crash Course
                    </Button>
                </div>


            </div>
            <div
                className="relative w-full  flex justify-end ">
                <RockerLaunchIcon />
            </div>
        </section>

    )
}
