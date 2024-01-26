"use client"
import PageHeader from '@/components/blog/PageHeader';
import { fetchStrapiAPI } from '@/utils/strapi';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import { formatDate } from '@/utils/format';
interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    };
}

interface BlogsViewModel {
    name: string;
    slug: string;
    articles: [
        {
            title: string;
            description: any;
            publishedAt: string;
            imageURL: string;
            short_description: string;
            slug: string;
            author: {
                name: string;
                avatar: string;
            };
        }
    ]
}


const BlogPage = () => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [meta, setMeta] = useState<Meta | undefined>();
    const [data, setData] = useState<any>([]);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setLoading] = useState(true);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);
        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = `/articles`;
            const categorypath = '/categories';

            const urlParamsObject = {
                sort: { createdAt: "desc" },
                populate: {
                    articles: {
                        populate: {
                            author: {
                                populate: "*",
                            },
                            imageURL: { fields: ["url"] }
                        }
                    },
                },
                pagination: {
                    start: start,
                    limit: limit,
                },
            };
            const options = { headers: { Authorization: `Bearer ${token}` } };
            const responseData = await fetchStrapiAPI(categorypath, urlParamsObject, options);

            const mappedData = [
                ...responseData.data.map((item: any) => ({
                    id: item.id,
                    name: item.attributes.name,
                    slug: item.attributes.slug,
                    articles: item.attributes.articles.data.map((article: any) => {
                        return {
                            id: article.id,
                            title: article.attributes.title,
                            description: article.attributes.description,
                            short_description: article.attributes.short_description,
                            publishedAt: article.attributes.publishedAt,
                            slug: article.attributes.slug,
                            imageURL: article.attributes.imageURL.data.attributes.url ?? "",
                            author: {
                                id: article.attributes.author.data.id,
                                name: article.attributes.author.data.attributes.name,
                                avatar: article.attributes.author.data.attributes.avatar.data.attributes.url ?? "",
                            }
                        }
                    }),
                })),
            ] as BlogsViewModel[];
            console.log(mappedData)
            if (start === 0) {
                setData(mappedData);
            } else {
                setData((prevData: any[]) => [...prevData, ...responseData.data]);
            }


            setMeta(responseData.meta);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
    }, [fetchData]);



    return (
        <div className='mb-24'>
            <PageHeader heading="Our Blog" text="Checkout Something Cool" />
            {data && data.map((category: BlogsViewModel, index: any) => (
                <div className='category px-4 ' key={index}>
                    <div className="  ml-5 px-5 py-1.5 bg-gray-200 rounded-3xl border justify-start items-start gap-2.5 inline-flex">
                        <div className=" text-center text-neutral-600 text-sm font-semibold font-['Inter'] uppercase tracking-wide">{category.name}</div>
                    </div>
                    <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 mx-auto gap-y-12 pt-6'>
                        {category.articles.map((article, index: any) => (
                            <Link key={index} className="card w-full  max-w-lg bg-base-100 h-96  col-span-12  md:col-span-6 lg:col-span-4 hover:scale-105 hover:cursor-pointer 
                               transition duration-150 rounded-lg shadow-sm" href={`/blogs/${article.slug}`}>
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

            ))}
        </div>
    )
}

export default BlogPage