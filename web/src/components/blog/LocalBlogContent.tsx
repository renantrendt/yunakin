import { useMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'
import BlogContent from './BlogContent'
import renderSchematags from '@/lib/seo/structured-data'
import { PostWithAuthor } from '@/app/(landing)/blogs/[slug]/page'
import SimilarBlogCard from './SimilarBlogCard'

interface LocalBlogContentProps {
    post: PostWithAuthor
}
const LocalBlogContent = ({ post }: LocalBlogContentProps) => {
    const MDXContent = useMDXComponent(post.body.code)

    return (
        <div className='max-w-[1440px] w-full mx-auto px-4 md:px-28'>
            {renderSchematags('Article', {
                title: post.title,
                datePublished: post.publishedAt,
                dateModified: post.publishedAt,
                imageURL: post.imageURL ?? "",
                slug: post.slug,
                author: {
                    name: post.authorProps.name,
                    avatar: post.authorProps.avatar
                }
            })}
            <BlogContent data={post} content={<MDXContent />} />
            <SimilarBlogCard articles={post.otherPosts} loading={false} />
        </div>
    )
}

export default LocalBlogContent