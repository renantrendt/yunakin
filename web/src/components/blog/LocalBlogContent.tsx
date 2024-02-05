import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { format, parseISO } from "date-fns"
import React from 'react'
import Link from 'next/link'

interface LocalBlogContentProps {
    post: Post
}
const LocalBlogContent = ({ post }: LocalBlogContentProps) => {

    const MDXContent = useMDXComponent(post.body.code)

    return (
        <article className="prose dark:prose-invert">
            {/* {post.imageURL && (
                <div className="relative mb-12 h-[345px] w-full">
                    <Image
                        className="m-0 w-full rounded-lg object-cover"
                        src={post.imageURL as string}
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )} */}

            <header>
                <h1 className="mb-2">{post.title}</h1>
                {post.description && (
                    <p className="mb-6 mt-0 text-xl text-gray-700 dark:text-gray-200">
                        {post.description}
                    </p>
                )}
                <p className="space-x-1 text-xs text-gray-500">
                    <span>{format(parseISO(post.publishedAt), "MMMM dd, yyyy")}</span>
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
            <MDXContent />
            <div className="mt-12">
                {/* <SharePost title={post.title} slug={post.slug} /> */}
            </div>
        </article>
    )
}

export default LocalBlogContent