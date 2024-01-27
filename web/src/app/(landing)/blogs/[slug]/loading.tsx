import BlogContent from '@/components/blog/BlogContent'
import React from 'react'

const Loading = () => {
    return (
        <div className='mx-auto  w-full px-4   md:px-28  text-black dark:text-white '>
            <BlogContent data={[]} isLoading={true} />
        </div>
    )
}

export default Loading