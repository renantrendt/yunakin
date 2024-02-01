import { fetchStrapiAPI } from '@/utils/strapi';
import BlogContent from '@/components/blog/BlogContent';
import React from 'react';
import platformConfig from '@/config/app-config';

interface SingleBlogViewModel {
    title: string;
    description: string;
    publishedAt: string;
    imageURL: string;
    author: {
        name: string;
        avatar: string;
    }
}
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const SlugPage = async ({ params }: { params: { slug: string } }) => {
    const token = platformConfig.variables.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: {
            slug: {
                $eq: params.slug,
            },
        },
        populate: {
            author: {
                populate: ['avatar', 'name']
            },
            imageURL: { fields: ["url"] }
        }
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchStrapiAPI(path, urlParamsObject, options);


    const mappedData: SingleBlogViewModel = {
        title: responseData.data[0].attributes.title,
        description: responseData.data[0].attributes.description,
        publishedAt: responseData.data[0].attributes.publishedAt,
        imageURL: responseData.data[0].attributes.imageURL.data.attributes.url,
        author: {
            avatar: responseData.data[0].attributes.author.data.attributes.avatar.data.attributes.url,
            name: responseData.data[0].attributes.author.data.attributes.name
        }
    }

    return (
        <div className=' w-full px-4  md:px-28 text-black dark:text-white '>
            {mappedData && (
                <BlogContent data={mappedData} />
            )}
        </div>
    )
}

export default SlugPage