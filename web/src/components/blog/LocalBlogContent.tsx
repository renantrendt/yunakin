import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { format, parseISO } from "date-fns"
import React from 'react'
import Link from 'next/link'
import BlogContent from './BlogContent'

interface LocalBlogContentProps {
    post: Post
}
const LocalBlogContent = ({ post }: LocalBlogContentProps) => {

    const MDXContent = useMDXComponent(post.body.code)

    return (
        <div className=' w-full px-4  md:px-28 text-black dark:text-white '>
            <BlogContent data={post} content={<MDXContent />} />
        </div>
    )
}

export default LocalBlogContent