import AnimatedSection from '@/components/animated/AnimatedSection'
import Typography from '@/components/atomic/typography/Typography'
import { siteCopy } from '@/config/site-config'
import React from 'react'

const Cta = () => {
    return (
        <AnimatedSection>

            <div className=" w-full lg:h-screen  flex-col justify-center items-center gap-0 lg:gap-10 inline-flex text-black dark:text-white">

                <div className=' flex flex-col justify-center items-center gap-5 mb-8'>
                    <Typography type='h1' className='text-center'>{siteCopy.ctaSection.title}</Typography>
                    <Typography type='h6' className='text-neutral-600 text-center max-w-2xl leading-[30px] text-[20px] '>{siteCopy.ctaSection.description}</Typography>
                </div>

                <div className="grid mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 dark:text-white  w-full ">
                    {siteCopy.ctaSection.reasons.map((reason) => (
                        <AnimatedSection key={reason.metric}>
                            <div className=" w-full h-56 rounded-[10px]  shadow-lg border border-neutral-200  flex-col justify-center items-center gap-4 inline-flex">
                                <Typography type='h3' className='text-stone-950   !text-[64px leading-[64px]  !font-black '>{reason.metric}</Typography>
                                <Typography type='p' className=" text-center text-neutral-600  text-[20px] leading-[30px] font-light  l">{reason.description}</Typography>
                            </div>
                        </AnimatedSection>

                    ))}
                </div>
            </div >
        </AnimatedSection>
    )
}

export default Cta