import React from 'react'

import ComingSoonIcon from '@/assets/icons/coming-soon/icon'
import localFont from 'next/font/local'
import { cn } from '@/utils/cn';

const uniSans = localFont({ src: '../fonts/uni-sans.heavy-caps.otf' });
const monaSans = localFont({ src: '../fonts/Mona-Sans-Light.otf' });
const ComingSoon = () => {
    return (
        <div className={cn("w-full h-screen coming-soon-linear-gradient ", monaSans.className)}
        >
            <div className="flex flex-col items-center h-screen justify-center px-6">
                <div className='mb-12 lg:mb-16'>
                    <ComingSoonIcon classname='w-[110px] h-[59px] lg:w-[306px] lg:h-[119px]' />
                </div>
                <h1 className={cn("uppercase text-center text-white text-[38px] lg:text-8xl font-black", uniSans.className, "font-black")}>launching soon</h1>
                <p className="text-[#B2AFD0] text-xs   text-center lg:mt-3 lg:text-[29px] font-light ">The Ultimate SaaS Starter Kit with all you need to ship fast.</p>
                <div className='flex flex-col w-full justify-center items-center lg:pt-[60px] pt-10 gap-0 lg:gap-5 '>
                    <div className='relative flex  items-center w-10/12 sm:w-7/12 md:w-5/12  lg:w-[600px]'>
                        <input className="w-full  h-[50px] lg:h-[67px] text-sm  pl-5 lg:pl-8 pr-32 py-2 rounded-[35px] border hover:decoration-neutral outline-none text-white  lg:text-xl  border-violet-500 bg-transparent justify-between items-center inline-flex"
                            type='email'
                            placeholder='email'
                        />
                        <button className=" coming-soon-button-linear-gradient self-stretch px-5 lg:px-8 py-[10px] lg:py-3 bg-gradient-to-b from-violet-600 via-violet-700 to-violet-600 rounded-[40px] border border-neutral-600 justify-center items-center gap-2.5 flex
                        text-white  text-sm leading-[14px] lg:text-xl font-normal  absolute top-[7px] lg:top-[6px] right-2">
                            submit
                        </button>
                    </div>
                    <p className="text-[#B2AFD0E5] text-[10px] leading-[13px] pt-3 lg:pt-0  text-center  lg:text-lg font-light ">Sign up to find out when we launch</p>

                </div>
            </div>
        </div>
    )
}

export default ComingSoon