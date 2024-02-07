import React from 'react'

import ComingSoonIcon from '@/assets/icons/coming-soon/icon.svg'
const ComingSoon = () => {
    return (
        <div className="w-full h-screen coming-soon-linear-gradient px-[170]px"
        >
            <div className="flex flex-col items-center h-screen justify-center">
                <div className='mb-14'>
                    <ComingSoonIcon />

                </div>
                <h1 className="uppercase text-center text-white text-8xl font-black font-['Uni Sans']">launching soon</h1>
                <p className="text-[#B2AFD0] text-2xl text-center mt-3 text-[29px] font-light font-['Mona Sans'] leading-[37.70px]">The Ultimate SaaS Starter Kit with all you need to ship fast.</p>
                <div className='flex flex-col justify-center items-center pt-20 gap-4'>
                    <p className="text-[#B2AFD0] text-2xl text-center mt-3 text-[29px] font-light font-['Mona Sans'] leading-[37.70px]">Sign up to find out when we launch</p>
                    <div className='relative'>
                        <input className="w-[606px] h-[67px] pl-8 pr-2 py-2 rounded-[35px] border hover:decoration-neutral outline-none text-white border-violet-500 bg-transparent justify-between items-center inline-flex"
                            type='email'
                            placeholder='Enter your email address'
                        />
                        <button className="w-[130px] self-stretch px-8 py-3 bg-gradient-to-b from-violet-600 via-violet-700 to-violet-600 rounded-[40px] border border-neutral-600 justify-center items-center gap-2.5 flex
                        text-white text-xl font-normal font-['Mona Sans'] absolute right-2 top-[6px]">
                            submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ComingSoon