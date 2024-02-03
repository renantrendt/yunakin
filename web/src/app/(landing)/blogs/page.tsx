import PageHeader from '@/components/blog/PageHeader';
import React from 'react'
import BlogCard from '@/components/blog/BlogCard';
import getServerSideQueryClient from '@/react-query/server/queryClient';
import { blogPostsWithCategoryQueryKey } from '@/react-query/queryKeys';
import blogPostsWithCategoriesQueryFn from '@/react-query/server/queries/blogPostsWithCategories';
import { platform } from 'os';
import platformConfig from '@/config/app-config';
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
    const queryClient = await getServerSideQueryClient();

    await queryClient.prefetchQuery(
        {
            queryKey: blogPostsWithCategoryQueryKey(),
            queryFn: blogPostsWithCategoriesQueryFn,
        }
    )

    const mappedData = await queryClient.getQueryData<BlogsViewModel[]>(
        blogPostsWithCategoryQueryKey()
    )

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