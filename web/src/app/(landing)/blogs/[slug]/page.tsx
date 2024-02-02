import { fetchStrapiAPI } from '@/utils/strapi';
import BlogContent from '@/components/blog/BlogContent';
import React from 'react';
import platformConfig from '@/config/app-config';
import { allPosts } from "contentlayer/generated"
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format, parseISO } from "date-fns"
import { Metadata } from 'next';
import Link from 'next/link';

interface PostProps {
    params: {
        slug: string
    }
}

function getPostFromParams(params: PostProps["params"]) {
    const slug = params?.slug
    const post = allPosts.find((post: any) => post.slugAsParams === slug)

    if (!post) {
        null
    }

    return post
}

export async function generateMetadata({
    params,
}: PostProps): Promise<Metadata> {
    const post = getPostFromParams(params)

    if (!post) {
        return {}
    }

    return {
        title: post.title,
        description: post.description,
    }
}
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
    if (!platformConfig.features.blog.strapi_enabled) {
        const post = await getPostFromParams(params)

        if (!post) {
            notFound()
        }

        return (
            <article className="prose dark:prose-invert">
                {post.image && (
                    <div className="relative mb-12 h-[345px] w-full">
                        <Image
                            className="m-0 w-full rounded-lg object-cover"
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                <header>
                    <h1 className="mb-2">{post.title}</h1>
                    {post.description && (
                        <p className="mb-6 mt-0 text-xl text-gray-700 dark:text-gray-200">
                            {post.description}
                        </p>
                    )}
                    <p className="space-x-1 text-xs text-gray-500">
                        <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
                        <span>{` • `}</span>
                        <span>{post.readingTime.text}</span>
                        <span>{` • `}</span>
                        <span>
                            <Link
                                href={`/categories/${encodeURIComponent(
                                    post.category.toLowerCase()
                                )}`}
                            >
                                {post.category}
                            </Link>
                        </span>
                    </p>
                </header>
                <hr className="my-6" />
                {/* <Mdx code={post.body.code} /> */}
                <div className="mt-12">
                    {/* <SharePost title={post.title} slug={post.slug} /> */}
                </div>
            </article>
        )
    }
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