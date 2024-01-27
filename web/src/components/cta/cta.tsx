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
        <div className="my-20 w-full flex-col justify-center items-center gap-20 inline-flex text-black dark:text-white">
            <div className=' flex flex-col justify-center items-center gap-5 mb-8'>
                <h1 className='text-5xl font-bold text-center mb-2'>Why you need a Mobile Funnel?</h1>
                <h3 className='text-xl  mb-20 max-w-xl text-center'>Traditional websites and landing pages are neither interactive nor personalized. These sites also load slowly and are not optimized for the mobile world</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 dark:text-white  w-full ">
                {reasons.map((reason) => (
                    <div key={reason.metric} className=" w-full h-56 rounded-lg shadow border border-neutral-200 flex-col justify-center items-center gap-4 inline-flex">
                        <div className="X text-center text-stone-950 dark:text-white  text-6xl font-black font-['Inter'] leading-10">{reason.metric}</div>
                        <div className="FasterImplementation text-center text-neutral-600 dark:text-white text-xl font-light font-['Inter'] leading-loose">{reason.descriptin}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cta