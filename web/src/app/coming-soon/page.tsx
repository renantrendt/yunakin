'use client'
import React from 'react'

import ComingSoonIcon from '@/assets/icons/coming-soon/icon'
import localFont from 'next/font/local'
import { cn } from '@/utils/cn';

const uniSans = localFont({ src: '../fonts/uni-sans.heavy-caps.otf' });
const monaSans = localFont({ src: '../fonts/Mona-Sans-Light.otf' });

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import customToast from '@/components/atomic/toast/customToast';
import LoadingIcon from '@/assets/icons/LoadingIcon';
import { Meteors } from '@/components/atomic/meteor/Meteor';

const schema = yup.object({
    email: yup.string().email().required(),
})

interface FormValues {
    email: string
}
const customToastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const ComingSoon = () => {

    const addEmailToWaitinListMutation = useMutation({
        mutationFn: async (email: string) => {
            const response = await fetch('/api/waiting-list', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache'
            })
            if (!response.ok) {
                if (response.status === 400) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
                throw new Error('Something bad happened')
            }
            return response.json()
        },
        onSuccess: () => {
            customToast.success("Successfully added to waiting list. We'll notify you when we launch", customToastConfig)
        },
        onError: (error) => {
            customToast.error(error.message, customToastConfig)
        }
    })
    const { handleSubmit, control } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = async (data: any) => {
        await addEmailToWaitinListMutation.mutateAsync(data.email);
    }
    return (
        <div className={cn("w-full h-screen coming-soon-linear-gradient relative ", monaSans.className)}
        >
            <div className="flex flex-col items-center h-screen justify-center px-6 relative overflow-y-hidden">
                <Meteors number={20} />

                <div className='mb-12 lg:mb-16'>
                    <ComingSoonIcon classname='w-[110px] h-[59px] lg:w-[306px] lg:h-[119px]' />
                </div>
                <h1 className={cn("uppercase text-center text-white text-[38px] lg:text-8xl font-black", uniSans.className, "font-black")}>launching soon</h1>
                <p className="text-[#B2AFD0] text-xs   text-center lg:mt-5 lg:text-[29px] font-light ">Ready to accelerate your development process?</p>

                <form className='flex flex-col w-full justify-center items-center lg:pt-[60px] pt-10 gap-0 lg:gap-5 ' onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative min-w-[280px] lg:w-full max-w-[530px]'>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <input className="w-full  h-[50px] lg:h-[67px] text-sm   pl-5 lg:pl-8 pr-32 py-2 rounded-[35px] border hover:decoration-neutral outline-none text-white  lg:text-xl  border-violet-500 bg-transparent justify-between items-center inline-flex
                                
                                focus:border-[1.5px] focus:border-[#9A6DFE] hover:border-[1.5px] hover:border-[#9A6DFE] coming-soon-input-shadow"
                                    type='email'
                                    placeholder='email'
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <button className=" coming-soon-button-linear-gradient self-stretch px-5 lg:px-8 py-[10px] lg:py-3 bg-gradient-to-b from-violet-600 via-violet-700 to-violet-600 rounded-[40px] border border-neutral-600 justify-center items-center gap-2.5 flex
                        text-white  text-sm leading-[14px] lg:text-xl font-normal  absolute top-[7px] lg:top-[6px] right-2  " type='submit'>
                            {addEmailToWaitinListMutation.isPending ? <LoadingIcon /> : null} <span> submit </span>
                        </button>
                    </div>
                    <p className="text-[#B2AFD0E5] text-[10px] leading-[13px] pt-3 lg:pt-0  text-center  lg:text-lg font-light ">Sign up to find out when we launch</p>

                </form>
            </div>
        </div>
    )
}

export default ComingSoon