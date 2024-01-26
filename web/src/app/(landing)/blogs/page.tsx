"use client"
import PageHeader from '@/components/blog/PageHeader';
import { fetchStrapiAPI } from '@/utils/strapi';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    };
}

const BlogPage = () => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [meta, setMeta] = useState<Meta | undefined>();
    const [data, setData] = useState<any>([]);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setLoading] = useState(true);
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchData = useCallback(async (start: number, limit: number) => {
        setLoading(true);
        try {
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            const path = `/articles`;
            const categorypath = '/categories';

            // const urlParamsObject = {
            //     sort: { createdAt: "desc" },
            //     populate: {
            //         imageURL: { fields: ["url"] },
            //         category: { populate: "*" },
            //         author: {
            //             populate: "*",
            //         },
            //     },
            //     pagination: {
            //         start: start,
            //         limit: limit,
            //     },
            // };
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
                    articles: item.attributes.articles.data,
                })),
            ]
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
            {data && data.map((category: any, index: any) => (
                <div className='category px-4 ' key={index}>
                    <div className="  ml-5 px-5 py-1.5 bg-gray-200 rounded-3xl border justify-start items-start gap-2.5 inline-flex">
                        <div className=" text-center text-neutral-600 text-sm font-semibold font-['Inter'] uppercase tracking-wide">{category.name}</div>
                    </div>
                    <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 mx-auto gap-y-12 pt-6'>
                        {category.articles.map((article: any, index: any) => (
                            <Link key={index} className="card w-full  max-w-lg bg-base-100 h-96 shadow-xl col-span-12  md:col-span-6 lg:col-span-4 hover:scale-110 hover:cursor-pointer 
                               transition duration-150 rounded-lg shadow-sm" href={`/blogs/${article.attributes.title.replaceAll(" ", "-")}`}>
                                <figure className='relative hidden'><Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL ?? ""}${article.attributes.imageURL.data?.attributes.url ?? ""}`} alt="Shoes" width={520} height={360} objectFit='contain' /></figure>
                                <div className="card-body pb-4">
                                    <h2 className="card-title">{article.attributes.title}</h2>
                                    <p>{article.attributes.description[0].children[0].text}</p>
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