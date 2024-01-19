"use client"
import PageHeader from '@/components/blog/PageHeader';
import { fetchStrapiAPI } from '@/utils/strapi';
import React, { useCallback, useEffect, useState } from 'react'

interface Meta {
    pagination: {
        start: number;
        limit: number;
        total: number;
    };
}
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
        <div>
            <PageHeader heading="Our Blog" text="Checkout Something Cool" />
            {isLoading ? JSON.stringify(data) : JSON.stringify(meta)}
        </div>
    )
}

export default BlogPage