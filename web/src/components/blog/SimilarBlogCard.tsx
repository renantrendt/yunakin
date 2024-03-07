'use client'
import { BlogsViewModel } from '@/app/(landing)/blogs/page'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { PostWithAuthor } from '@/app/(landing)/blogs/[slug]/page'
import Typography from '../atomic/typography/Typography'

interface SimilarBlogCardProps {
    articles: PostWithAuthor[]
    loading?: boolean
}
const SimilarBlogCard = ({ articles, loading }: SimilarBlogCardProps) => {

    if (loading) {
        return (
            <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 mx-auto gap-y-12 pt-6'>
                {[0, 1, 2].map((article, index: any) => (
                    <Link key={index} className="card w-full dark:text-white  max-w-lg bg-base-100 dark:bg-gray-700 h-full  col-span-12  md:col-span-6 lg:col-span-4  hover:cursor-pointer 
                        rounded-lg shadow-sm" href={`/`}>
                        <figure className='relative hidden max-h-[176px] bg-slate-700 animate-pulse w-full' ></figure>
                        <div className="card-body animate-pulse pb-4">
                            <h2 className="card-title w-16  bg-slate-700" ></h2>
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
        )
    }
    return (
        <div className='category mt-20' >
            <Typography type='h3' className='text-center !font-semibold text-[20px] leading-[30px] !text-stone-950'>Read about similiar topics</Typography>
            <div className='flex flex-row gap-3 lg:gap-6 justify-items-center  pt-6 overflow-x-scroll max-w-[100vw]  no-scrollbar '>
                {articles.map((article, index: any) => (
                    <Link key={index} className="card w-full dark:text-white min-w-[324px]    overflow-hidden max-w-lg  bg-base-100 last:mr-4 lg:last:mr-0 dark:bg-gray-700 h-96  col-span-4  hover:cursor-pointer 
            rounded-[10px] shadow-sm" href={`/blogs/${article.slug}`}>
                        <figure className='relative hidden'><Image src={`${article.imageURL}`} alt="Shoes" width={520} height={360} objectFit='contain' /></figure>
                        <div className="px-6 pt-6 pb-2">
                            <h2 className="card-title text-2xl font-bold mb-2">{article.title}</h2>
                            <p className='text-neutral-600 text-base'>{article.short_description}</p>
                            <div className='flex  items-center justify-start my-4 text-category-card-autor text-xs'>
                                <div className='avatar'>
                                    <div className="w-6 rounded-full ">
                                        <img alt="Author name" src={`${(article.authorProps.avatar)}`} />
                                    </div>
                                </div>
                                <div className='flex justify-start gap-4'>
                                    <p className='ml-2 '>{article.authorProps?.name ?? ""}</p>
                                    <p>{formatDate(article.publishedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SimilarBlogCard;