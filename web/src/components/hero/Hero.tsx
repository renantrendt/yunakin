import RockerLaunchIcon from '@/assets/icons/RockerLaunchIcon'
import React from 'react'
import Button from '../button/Button'

export default function Hero() {
    return (
        <section
            className="my-20 flex flex-col md:flex-row justify-center px-5  items-center text-center md:text-left dark:text-white">
            <div className="w-full md:w-7/12 md:mr-8">
                <h1 className="text-5xl font-bold max-w-2xl">Create high-converting funnels in just 60 minutes</h1>
                <p className="text-xl py-6 max-w-2xl">
                    Generate a steady flow of customers or talents with lightning-fast and easy-to-build Perspective Funnels. No design or programming skills required.                </p>
                <div className='flex justify-center md:justify-start gap-8'>
                    <Button
                        variant='primary'
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
                className="relative w-full md:w-6/12 flex flex-col justify-start items-center md:gap-24">
                <RockerLaunchIcon />
            </div>
        </section>

    )
}
