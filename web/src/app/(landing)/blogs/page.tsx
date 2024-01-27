import PageHeader from '@/components/blog/PageHeader';
import { fetchStrapiAPI } from '@/utils/strapi';
import React from 'react'
import BlogCard from '@/components/blog/BlogCard';

export interface BlogsViewModel {
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


const BlogPage = async () => {

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
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
            start: 0,
            limit: 50,
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


    return (
        <div className='mb-24 px-4 md:px-28'>
            <PageHeader />
            {mappedData && mappedData.map((category: BlogsViewModel, index: any) => (
                <BlogCard loading={false} key={index} category={category} />
            ))}
        </div>
    )
}

export default BlogPage