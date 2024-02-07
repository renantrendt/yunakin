import React from 'react'

import ComingSoonIcon from '@/assets/icons/coming-soon/icon.svg'
const ComingSoon = () => {
    return (
        <div className="w-full h-screen coming-soon-linear-gradient px-[170]px"
        >
            <div className="flex flex-col items-center h-screen justify-center px-4">
                <div className='mb-12 lg:mb-14'>
                    <ComingSoonIcon />
                </div>
                <h1 className="uppercase text-center text-white text-4xl lg:text-8xl font-black font-['Uni Sans']">launching soon</h1>
                <p className="text-[#B2AFD0] text-sm  lg:text-2xl text-center mt-3 text-[29px] font-light font-['Mona Sans'] leading-[37.70px]">The Ultimate SaaS Starter Kit with all you need to ship fast.</p>
                <div className='flex lg:flex-col w-full justify-center items-center lg:pt-20 pt-10 gap-0 lg:gap-4 flex-col-reverse'>
                    <p className="text-[#B2AFD0] text-sm lg:text-2xl text-center  text-[29px] font-light font-['Mona Sans'] leading-[37.70px]">Sign up to find out when we launch</p>
                    <div className='relative w-full  lg:w-[600px]'>
                        <input className="w-full h-[67px] pl-8 pr-32 py-2 rounded-[35px] border hover:decoration-neutral outline-none text-white border-violet-500 bg-transparent justify-between items-center inline-flex"
                            type='email'
                            placeholder='email'
                        />
                        <button className=" coming-soon-button-linear-gradient self-stretch px-5 lg:px-8 py-3 bg-gradient-to-b from-violet-600 via-violet-700 to-violet-600 rounded-[40px] border border-neutral-600 justify-center items-center gap-2.5 flex
                        text-white  text-lg lg:text-xl font-normal font-['Mona Sans'] absolute right-2 top-[6px]">
                            submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ComingSoon