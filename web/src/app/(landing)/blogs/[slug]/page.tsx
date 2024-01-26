'use client'
import BackIcon from '@/assets/icons/BackIcon'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { fetchStrapiAPI } from '@/utils/strapi';
const blog = {
    "title": "The Future of Renewable Energy: Innovations and Challenges",
    "description": "An in-depth look at the cutting-edge innovations driving the future of renewable energy. Explore the potential solutions to the challenges facing the adoption of solar, wind, and other renewable energy sources. Lorem ipsum dolor sit amet consectetur adipisicing elit.Consectetur magni libero itaque cum tenetur modi omnis dolorum, odit enim quidem voluptatem veniam alias quibusdam error recusandae blanditiis natus facere accusantium sequi laudantium at fugiat aut ratione.Quos unde repudiandae esse officia architecto reiciendis necessitatibus consectetur quo itaque rerum quibusdam perspiciatis quidem enim tempora dolor animi magnam delectus, sit sapiente odit iste maxime minima et numquam? Incidunt vel quo repellat doloremque?",
    "lastUpdated": "2024-01-18",
    "authorName": "Samantha Lee",
    "authorImageUrl": "https://example.com/images/authors/samantha-lee.jpg",
    "blogImageUrl": "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
};

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
const SlugPage = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    const [data, setData] = useState<any>([]);

    useEffect(() => {

        (async function () {
            try {
                const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
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
                setData(mappedData);
                // const mappedData = [
                //     ...responseData.data.map((item: any) => ({
                //         id: item.id,
                //         name: item.attributes.name,
                //         slug: item.attributes.slug,
                //         articles: item.attributes.articles.data.map((article: any) => {
                //             return {
                //                 id: article.id,
                //                 title: article.attributes.title,
                //                 description: article.attributes.description,
                //                 publishedAt: article.attributes.publishedAt,
                //                 slug: article.attributes.slug,
                //                 imageURL: article.attributes.imageURL.data.attributes.url ?? "",
                //                 author: {
                //                     id: article.attributes.author.data.id,
                //                     name: article.attributes.author.data.attributes.name,
                //                     avatar: article.attributes.author.data.attributes.avatar.data.attributes.url ?? "",
                //                 }
                //             }
                //         }),
                //     })),
                // ] as SingleBlogViewModel;

                console.log(responseData)

            } catch (error) {
                console.error(error);
            }
        })()

    }, []);
    return (
        <div className='mx-auto w-full px-4  md:px-44 '>
            {data && (
                <>
                    <div className='grid grid-cols-12 mt-16 '>
                        <div className=' absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-gray-100' onClick={() => { router.back() }}>
                            <BackIcon />
                        </div>
                        <div className="col-span-12 flex justify-center">
                            <h1 className='text-3xl font-bold max-w-sm lg:max-w-lg text-center'>{data.title}</h1>
                        </div>
                    </div>
                    <div className="image w-full flex justify-center mt-4 md:mt-16">
                        <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL ?? ""}${data.imageURL}`} width={1080} height={480} alt="meaningful image" />
                    </div>
                    <div className="content mx-auto max-w-xl my-8 md:my-16  ">
                        <p className='text-center'>{JSON.stringify(data.description)}</p>
                    </div>
                </>
            )}

        </div>
    )
}

export default SlugPage