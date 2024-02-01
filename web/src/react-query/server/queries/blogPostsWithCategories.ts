import { BlogsViewModel } from "@/app/(landing)/blogs/page";
import platformConfig from "@/config/app-config";
import { fetchStrapiAPI } from "@/utils/strapi";


/**
 * @function blogPostsWithCategoriesQueryFn
 * @description A function that returns a promise of the blog posts with categories
 * @returns {Promise<BlogsViewModel[]>} A promise of the blog posts with categories
 * @example
 * import { useQuery } from "react-query";
 * import { blogPostsWithCategoriesQueryFn } from "@/react-query/server/queries";
 *  
 */

const blogPostsWithCategoriesQueryFn = async () => {
    const token = platformConfig.variables.NEXT_PUBLIC_STRAPI_API_TOKEN;
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

    return mappedData;
}


export default blogPostsWithCategoriesQueryFn;