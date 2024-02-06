'use client'
import BackIcon from '@/assets/icons/BackIcon'
import platformConfig from '@/config/app-config'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'

interface BlogContentProps {
    data: any
    isLoading?: boolean
    content?: React.ReactNode
}

const BlogContent = ({ data, isLoading, content }: BlogContentProps) => {
    const router = useRouter()
    // Parse the MDX file via the useMDXComponent hook.
    if (isLoading) return (
        <>
            <div className='flex mt-16 relative animate-pulse  '>
                <div className=' absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-gray-100' onClick={() => { router.back() }}>
                    <BackIcon />
                </div>
                <div className="flex flex-1 justify-center ">
                    <h1 className='text-3xl font-bold max-w-sm lg:max-w-lg  bg-slate-700 text-center w-64 rounded-full h-8 '></h1>
                </div>
            </div>
            <div className="image flex justify-center mt-4 md:mt-16    animate-pulse relative w-full h-96 rounded-md bg-slate-700">

            </div>
            <div className="content mx-auto max-w-4xl my-8 md:my-16 h-[50vh] w-full  animate-pulse bg-slate-700 ">
            </div>
        </>
    )
    return (
        <>
            <div className='flex mt-16 relative  '>
                <div className=' absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-gray-100' onClick={() => { router.back() }}>
                    <BackIcon />
                </div>
                <div className="flex flex-1 justify-center">
                    <h1 className='text-3xl font-bold max-w-sm lg:max-w-lg text-center'>{data.title}</h1>
                </div>
            </div>
            <div className="image flex justify-center mt-4 md:mt-16 relative w-full h-96 rounded-md">
                <Image
                    src={`${data.imageURL}`} layout="fill"
                    objectFit="cover"
                    alt='image'
                    className='rounded-lg'
                />
            </div>
            <div className="content mx-auto max-w-3xl my-8 md:my-16  ">
                {content}
            </div>
        </>
    )
}

export default BlogContent