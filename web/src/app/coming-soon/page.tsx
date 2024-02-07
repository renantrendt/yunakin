import React from 'react'

import ComingSoonIcon from '@/assets/icons/coming-soon/icon.svg'
import localFont from 'next/font/local'
import { cn } from '@/utils/cn';

const uniSans = localFont({ src: '../fonts/uni-sans.heavy-caps.otf' });
const monaSans = localFont({ src: '../fonts/Mona-Sans-Light.otf' });
const ComingSoon = () => {
    return (
        <div className={cn("w-full h-screen coming-soon-linear-gradient px-[170]px", monaSans.className)}
        >
            <div className="flex flex-col items-center h-screen justify-center px-4">
                <div className='mb-12 lg:mb-16'>
                    <ComingSoonIcon />
                </div>
                <h1 className={cn("uppercase text-center text-white text-4xl lg:text-8xl font-black", uniSans.className, "font-black")}>launching soon</h1>
                <p className="text-[#B2AFD0] text-sm   text-center mt-3 lg:text-[29px] font-light  leading-[37.70px]">The Ultimate SaaS Starter Kit with all you need to ship fast.</p>
                <div className='flex lg:flex-col w-full justify-center items-center lg:pt-[60px] pt-10 gap-0 lg:gap-4 flex-col-reverse'>
                    <div className='relative w-full  lg:w-[600px]'>
                        <input className="w-full h-[67px] pl-8 pr-32 py-2 rounded-[35px] border hover:decoration-neutral outline-none text-white text-lg lg:text-xl  border-violet-500 bg-transparent justify-between items-center inline-flex"
                            type='email'
                            placeholder='email'
                        />
                        <button className=" coming-soon-button-linear-gradient self-stretch px-5 lg:px-8 py-3 bg-gradient-to-b from-violet-600 via-violet-700 to-violet-600 rounded-[40px] border border-neutral-600 justify-center items-center gap-2.5 flex
                        text-white  text-lg lg:text-xl font-normal  absolute right-2 top-[6px]">
                            submit
                        </button>
                    </div>
                    <p className="text-[#B2AFD0] text-sm  text-center  text-[29px] font-light  leading-[37.70px]">Sign up to find out when we launch</p>

                </div>
            </div>
        </div>
    )
}

export default ComingSoon