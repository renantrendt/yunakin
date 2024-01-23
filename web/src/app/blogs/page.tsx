"use client"
import PageHeader from '@/components/blog/PageHeader';
import { fetchStrapiAPI } from '@/utils/strapi';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'

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
            const urlParamsObject = {
                sort: { createdAt: "desc" },
                populate: {
                    cover: { fields: ["url"] },
                    category: { populate: "*" },
                    author: {
                        populate: "*",
                    },
                },
                pagination: {
                    start: start,
                    limit: limit,
                },
            };
            const options = { headers: { Authorization: `Bearer ${token}` } };
            const responseData = await fetchStrapiAPI(path, urlParamsObject, options);

            if (start === 0) {
                setData(responseData.data);
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
            <div className='grid grid-cols-12 justify-items-center w-full gap-x-4 px-4 mx-auto gap-y-12'>
                {data && data.map((blog: any, index: any) => (
                    <Link key={index} className="card w-full  max-w-lg bg-base-100 shadow-xl col-span-12  md:col-span-6 lg:col-span-4 hover:scale-110 hover:cursor-pointer 
                    transition duration-150" href={`/blogs/${blog.attributes.title.replaceAll(" ", "-")}`}>
                        <figure><img src={"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"} alt="Shoes" /></figure>
                        <div className="card-body pb-4">
                            <h2 className="card-title">{blog.attributes.title}</h2>
                            <p>{blog.attributes.description[0].children[0].text}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogPage