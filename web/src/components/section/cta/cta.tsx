import AnimatedSection from '@/components/animated/AnimatedSection'
import Typography from '@/components/atomic/typography/Typography'
import { siteCopy } from '@/config/site-config'
import React from 'react'

const Cta = () => {
    return (
        <AnimatedSection>

            <div className=" w-full my-24  flex-col justify-center items-center gap-0 lg:gap-10 inline-flex text-black dark:text-white">

                <div className=' flex flex-col justify-center items-center gap-5 mb-6'>
                    <Typography type='h1' className='text-left lg:text-center text-white !text-[40px]  lg:text-[40px] !leading-[56px]'>{siteCopy.ctaSection.title}</Typography>
                    <Typography type='h6' className='text-white text-left lg:text-center max-w-2xl leading-[24px] text-[16px] '>{siteCopy.ctaSection.description}</Typography>
                </div>

                <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 dark:text-white  w-full ">
                    {siteCopy.ctaSection.reasons.map((reason) => (
                        <AnimatedSection key={reason.metric}>
                            <div className=" w-full  h-48  lg:h-56 rounded-[10px]  shadow-lg bg-white border border-neutral-200  flex-col justify-center items-center gap-4 inline-flex">
                                <Typography type='h3' className='text-stone-950   !text-[46px] !lg:text-[56px] leading-[64px]  !font-semibold '>{reason.metric}</Typography>
                                <Typography type='p' className=" text-center text-neutral-600  text-[16px]  lg:text-[20px] leading-[30px] font-light  l">{reason.description}</Typography>
                            </div>
                        </AnimatedSection>

                    ))}
                </div>
            </div >
        </AnimatedSection>
    )
}

export default Cta