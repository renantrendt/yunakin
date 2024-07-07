'use client'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import ComingSoonIcon from '@/icons/coming-soon/icon'
import { cn } from '@/utils/cn';



import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import customToast from '@/components/atomic/toast/customToast';
import Meteors from '@/components/atomic/meteor/Meteor';
import { NextFont } from 'next/dist/compiled/@next/font'
import Image from 'next/image';
import InputField from '../atomic/input/InputField';
import Button from '../atomic/button/Button';
import { error } from 'console';
import Typography from '../atomic/typography/Typography';

const schema = yup.object({
    email: yup.string().email().required(),
})

interface FormValues {
    email: string
}
const customToastConfig = {
    position: "top-center",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
}

interface ComingSoonClientProps {
    uniSans: NextFont;
    monaSans: NextFont;
}
const ComingSoonClient = ({ monaSans }: ComingSoonClientProps) => {
    const outerDivRef = React.useRef<HTMLDivElement>(null)
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
                if (response.status === 400 || response.status === 429) {
                    const data = await response.json()
                    throw new Error(data.message)
                }
            }
            return response.json()
        },
        onSuccess: () => {
            customToast.success("Email successfully subscribed", customToastConfig)
        },
        onError: (error) => {
            customToast.warn(error.message, customToastConfig)
        }
    })
    const { handleSubmit, formState: { errors }, control } = useForm<FormValues>(
        {
            resolver: yupResolver(schema)
        }
    )

    useEffect(() => {
        (document.querySelector("body") as any).addEventListener('mousemove', mouse_shadow)
        return () => {
            (document.querySelector("body") as any).removeEventListener('mousemove', mouse_shadow)
        }
    }, [])
    const onSubmit = async (data: any) => {
        await addEmailToWaitinListMutation.mutateAsync(data.email);
    }
    const mouse_shadow = function (event: any) {
        if (!outerDivRef.current) return
        console.log(event.pageX, event.pageY)
        outerDivRef.current.style.top = event.pageY + 'px';
        outerDivRef.current.style.left = event.pageX + 'px';
    }
    return (
        <div className={cn("w-full   relative   no-scrollbar coming-soon-container", monaSans.className)}
        >
            <div
                id='shadow'
                ref={outerDivRef}
            >

            </div>
            <div className="flex flex-col items-center  min-h-[calc(100%)] h-[calc(100%)] overflow-hidden  justify-center   px-6 relative overflow-x-hidden overflow-y-hidden">

                {/* <Meteors number={4} /> */}

                <div className='mb-8'>
                    <Image src="/images/logo.svg" alt="logo" width={306} height={59} className='dark:hidden w-32 lg:w-40' />
                </div>
                <div className='flex flex-col gap-5'>
                    <Typography type='h1' className='max-w-full text-[44px] w-full text-center'>Coming Soon...</Typography>
                    <Typography type='h6' className='text-[18px] font-medium leading-[150%]  max-w-lg text-center text-[#757575]' >Offer perks for companies to use in their customer retention strategies.</Typography>

                </div>

                <form className='flex flex-col w-full items-center lg:pt-[40px] pt-10 gap-0 lg:gap-5 ' onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative  w-full max-w-[530px] font-satoshi'>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={value}
                                    onChange={onChange}
                                    className='w-full lg:w-full px-6 pr-2 py-5 rounded-[12px] text-base leading-[150%]'
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <Button disabled={addEmailToWaitinListMutation.isPending} size={"lg"} className="  
                          absolute top-[10px] right-2 " type='submit' >
                            <span> Submit </span>
                        </Button>
                    </div>
                    <Typography type='p' className='text-[#757575] mt-4' >Sign up to stay updated when we launch</Typography>

                </form>
            </div>
        </div >
    )
}

export default ComingSoonClient