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

const blogs = [
    {
        "title": "Exploring the World of Coffee: A Journey from Bean to Cup",
        "description": "Dive into the fascinating journey of coffee, exploring its origins, the art of roasting, and the craft of brewing the perfect cup. Discover the diverse cultures and traditions that surround coffee consumption around the globe.",
        "lastUpdated": "2024-01-20",
        "authorName": "Alex Johnson",
        "authorImageUrl": "https://example.com/images/authors/alex-johnson.jpg",
        "blogImageUrl": "https://example.com/images/blogs/coffee-journey.jpg"
    },
    {
        "title": "The Future of Renewable Energy: Innovations and Challenges",
        "description": "An in-depth look at the cutting-edge innovations driving the future of renewable energy. Explore the potential solutions to the challenges facing the adoption of solar, wind, and other renewable energy sources.",
        "lastUpdated": "2024-01-18",
        "authorName": "Samantha Lee",
        "authorImageUrl": "https://example.com/images/authors/samantha-lee.jpg",
        "blogImageUrl": "https://example.com/images/blogs/renewable-energy-future.jpg"
    },
    {
        "title": "A Guide to Sustainable Living: Simple Steps for a Greener Lifestyle",
        "description": "Embark on a journey towards sustainability with practical tips for reducing your environmental footprint. From eco-friendly home practices to sustainable travel, learn how you can make a difference.",
        "lastUpdated": "2024-01-15",
        "authorName": "Michael Brown",
        "authorImageUrl": "https://example.com/images/authors/michael-brown.jpg",
        "blogImageUrl": "https://example.com/images/blogs/sustainable-living-guide.jpg"
    },
    {
        "title": "The Evolution of Digital Art: From Pixels to Masterpieces",
        "description": "Discover the fascinating evolution of digital art, tracing its history from early pixel art to contemporary digital masterpieces. Learn about the tools and technologies that have shaped this dynamic form of expression.",
        "lastUpdated": "2024-01-10",
        "authorName": "Emily Carter",
        "authorImageUrl": "https://example.com/images/authors/emily-carter.jpg",
        "blogImageUrl": "https://example.com/images/blogs/digital-art-evolution.jpg"
    },
    {
        "title": "A Guide to Sustainable Living: Simple Steps for a Greener Lifestyle",
        "description": "Embark on a journey towards sustainability with practical tips for reducing your environmental footprint. From eco-friendly home practices to sustainable travel, learn how you can make a difference.",
        "lastUpdated": "2024-01-15",
        "authorName": "Michael Brown",
        "authorImageUrl": "https://example.com/images/authors/michael-brown.jpg",
        "blogImageUrl": "https://example.com/images/blogs/sustainable-living-guide.jpg"
    },
    {
        "title": "The Evolution of Digital Art: From Pixels to Masterpieces",
        "description": "Discover the fascinating evolution of digital art, tracing its history from early pixel art to contemporary digital masterpieces. Learn about the tools and technologies that have shaped this dynamic form of expression.",
        "lastUpdated": "2024-01-10",
        "authorName": "Emily Carter",
        "authorImageUrl": "https://example.com/images/authors/emily-carter.jpg",
        "blogImageUrl": "https://example.com/images/blogs/digital-art-evolution.jpg"
    }, {
        "title": "A Guide to Sustainable Living: Simple Steps for a Greener Lifestyle",
        "description": "Embark on a journey towards sustainability with practical tips for reducing your environmental footprint. From eco-friendly home practices to sustainable travel, learn how you can make a difference.",
        "lastUpdated": "2024-01-15",
        "authorName": "Michael Brown",
        "authorImageUrl": "https://example.com/images/authors/michael-brown.jpg",
        "blogImageUrl": "https://example.com/images/blogs/sustainable-living-guide.jpg"
    },
    {
        "title": "The Evolution of Digital Art: From Pixels to Masterpieces",
        "description": "Discover the fascinating evolution of digital art, tracing its history from early pixel art to contemporary digital masterpieces. Learn about the tools and technologies that have shaped this dynamic form of expression.",
        "lastUpdated": "2024-01-10",
        "authorName": "Emily Carter",
        "authorImageUrl": "https://example.com/images/authors/emily-carter.jpg",
        "blogImageUrl": "https://example.com/images/blogs/digital-art-evolution.jpg"
    }
]

const BlogPage = () => {
    const [meta, setMeta] = useState<Meta | undefined>();
    const [data, setData] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
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
                    authorsBio: {
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
            <div className='grid grid-cols-12 justify-items-center w-full mx-auto gap-y-12'>

                {blogs.map((blog, index) => (
                    <Link className="card w-full  max-w-lg bg-base-100 shadow-xl col-span-4 hover:scale-110 hover:cursor-pointer 
                    transition duration-150" href={`/blogs/${blog.title.replaceAll(" ", "-")}`}>
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div className="card-body pb-4">
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.description}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default BlogPage