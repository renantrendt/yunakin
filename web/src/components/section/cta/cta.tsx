import Typography from '@/components/atomic/typography/Typography'
import React from 'react'

const reasons = [
    {
        metric: "7x",
        descriptin: "higher conversion rate",
    },
    {
        metric: "42x",
        descriptin: "faster implementation",
    },
    {
        metric: "300%",
        descriptin: "higher lead quality",
    },
]
const Cta = () => {
    return (
        <div className=" w-full lg:h-screen  flex-col justify-center items-center gap-0 lg:gap-10 inline-flex text-black dark:text-white">
            <div className=' flex flex-col justify-center items-center gap-5 mb-8'>
                <Typography type='h2' className='text-center'>Why you need a Mobile Funnel?</Typography>
                <h3 className='text-xl  mb-20  max-w-2xl text-center text-neutral-600 font-normal leading-loose dark:text-white '>Traditional websites and landing pages are neither interactive nor personalized. These sites also load slowly and are not optimized for the mobile world</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 dark:text-white  w-full ">
                {reasons.map((reason) => (
                    <div key={reason.metric} className=" w-full h-56 rounded-lg  shadow border border-neutral-200 flex-col justify-center items-center gap-4 inline-flex">
                        <Typography type='h3' className='text-stone-950 dark:text-white  !text-6xl  !font-black  !leading-10 '>{reason.metric}</Typography>
                        <div className=" text-center text-neutral-600 dark:text-white text-xl font-light  leading-loose">{reason.descriptin}</div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Cta