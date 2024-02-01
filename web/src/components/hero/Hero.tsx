import RockerLaunchIcon from '@/assets/icons/RockerLaunchIcon'
import React from 'react'
import Button from '../atomic/button/Button'
import Typography from '../atomic/typography/Typography'

export default function Hero() {
    return (
        <section
            className="my-20 mt-40 flex flex-col md:flex-row justify-center gap-8  items-center text-center md:text-left text-black dark:text-white">
            <div className="w-full flex flex-1 flex-col gap-4 ">
                <Typography type='h1' className='text-5xl leading-[64px] text-stone-950 !font-black '>
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
            <img className='rounded-[32px] flex-1' src='https://s3-alpha-sig.figma.com/img/120e/c241/8f0118fdb790196d933c064ff2113490?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eX9qwXwHonKWPqjJM18Q7nYyr5P-LnvMc9VU4l3KY8rnrSGpcsc1BW3f1a0t5ZQCuzS5VbO6dG4AmzwAS-z9Duh42DuDSoTtuD6Ib4UWErZpoD79P1Hgt3miY6O-NzhVQ60S6tsXjsbSbbURiMNHSkPcxWdf63AO4o1Og~nL6tfo~0LDz5gesR4sXg7azrAdlvAJYghzjrN~RBK8rnIAqDLcSLrru6bR1yzSYJyp5kwFFbxrBpye2ZJg71tfVKSP9y8-aeEcCPIgCw3XEvCgqEQUU~oX4S70ULw57tRoDwwiUj2ZFB~eI32KOJ3ep7QeaPpgMdjfbHQfRHkqCz5tSg__'
                width={495} height={420} />
        </section>

    )
}
