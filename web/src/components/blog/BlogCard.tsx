'use client'
import { BlogsViewModel } from '@/app/(landing)/blogs/page'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

interface BlogCardProps {
    key: string
    category: BlogsViewModel
    loading: boolean
}
const BlogCard = ({ key, category, loading }: BlogCardProps) => {

    if (loading) {
        return (
            <div className='category mb-20' key={key} >
                <div className="  px-5 py-1.5 animate-pulse rounded-3xl border justify-start items-start gap-2.5 inline-flex bg-slate-600">
                </div>
                <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 mx-auto gap-y-12 pt-6'>
                    {[0, 1, 2].map((article, index: any) => (
                        <Link key={index} className="card w-full dark:text-white  max-w-lg bg-base-100 dark:bg-gray-700 h-96  col-span-12  md:col-span-6 lg:col-span-4  hover:cursor-pointer 
                        rounded-lg shadow-sm" href={`/`}>
                            <figure className='relative hidden w-64 h-64 bg-slate-700 animate-pulse' ></figure>
                            <div className="card-body pb-4">
                                <h2 className="card-title w-16 bg-slate-700" ></h2>
                                <p className='w-16 bg-slate-700'></p>
                                <div className='flex  items-center justify-start mt-4'>
                                    <div className='avatar'>
                                        <div className="w-10 rounded-full bg-slate-700 ">
                                        </div>
                                    </div>
                                    <p className='ml-2 w-16 bg-slate-700'></p>
                                    <p className='w-16 bg-slate-700'></p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        )
    }
    return (
        <div className='category mb-20' key={key} >
            <div className="  px-5 py-1.5 bg-gray-200 rounded-3xl border justify-start items-start gap-2.5 inline-flex">
                <div className=" text-center text-neutral-600 text-sm font-semibold font-['Inter'] uppercase tracking-wide">{category.name}</div>
            </div>
            <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 mx-auto gap-y-12 pt-6'>
                {category.articles.map((article, index: any) => (
                    <Link key={index} className="card w-full dark:text-white  max-w-lg bg-base-100 dark:bg-gray-700 h-96  col-span-12  md:col-span-6 lg:col-span-4  hover:cursor-pointer 
              rounded-lg shadow-sm" href={`/blogs/${article.slug}`}>
                        <figure className='relative hidden'><Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL ?? ""}${article.imageURL}`} alt="Shoes" width={520} height={360} objectFit='contain' /></figure>
                        <div className="card-body pb-4">
                            <h2 className="card-title">{article.title}</h2>
                            <p>{article.short_description}</p>
                            <div className='flex  items-center justify-start mt-4'>
                                <div className='avatar'>
                                    <div className="w-10 rounded-full ">
                                        <img alt="Author name" src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL ?? ""}${(article.author?.avatar)}`} />
                                    </div>
                                </div>
                                <p className='ml-2 w-16'>{article.author?.name ?? ""}</p>
                                <p>{formatDate(article.publishedAt)}</p>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default BlogCard