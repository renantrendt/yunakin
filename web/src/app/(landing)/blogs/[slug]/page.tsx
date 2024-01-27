'use client'
import BackIcon from '@/assets/icons/BackIcon'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { fetchStrapiAPI } from '@/utils/strapi';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';


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
    const [data, setData] = useState<any>(null);

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

            } catch (error) {
                console.error(error);
            }
        })()

    }, []);
    return (
        <div className='mx-auto w-full px-4  md:px-44 text-black dark:text-white '>
            {data && (
                <>
                    <div className='flex mt-16 relative '>
                        <div className=' absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-gray-100' onClick={() => { router.back() }}>
                            <BackIcon />
                        </div>
                        <div className="flex flex-1 justify-center">
                            <h1 className='text-3xl font-bold max-w-sm lg:max-w-lg text-center'>{data.title}</h1>
                        </div>
                    </div>
                    <div className="image flex justify-center mt-4 md:mt-16 relative w-full h-96 rounded-md">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL_LOCAL ?? ""}${data.imageURL}`} layout="fill"
                            objectFit="cover"
                            alt='image'
                            className='rounded-lg'
                        />
                    </div>
                    <div className="content mx-auto max-w-3xl my-8 md:my-16  ">
                        <Markdown remarkPlugins={[remarkGfm]} className={'prose'} >
                            {data.description}
                        </Markdown>
                    </div>
                </>
            )}

        </div>
    )
}

export default SlugPage