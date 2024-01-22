'use client'
import BackIcon from '@/assets/icons/BackIcon'
import React from 'react'
import { useRouter } from 'next/navigation';
const blog = {
    "title": "The Future of Renewable Energy: Innovations and Challenges",
    "description": "An in-depth look at the cutting-edge innovations driving the future of renewable energy. Explore the potential solutions to the challenges facing the adoption of solar, wind, and other renewable energy sources. Lorem ipsum dolor sit amet consectetur adipisicing elit.Consectetur magni libero itaque cum tenetur modi omnis dolorum, odit enim quidem voluptatem veniam alias quibusdam error recusandae blanditiis natus facere accusantium sequi laudantium at fugiat aut ratione.Quos unde repudiandae esse officia architecto reiciendis necessitatibus consectetur quo itaque rerum quibusdam perspiciatis quidem enim tempora dolor animi magnam delectus, sit sapiente odit iste maxime minima et numquam? Incidunt vel quo repellat doloremque?",
    "lastUpdated": "2024-01-18",
    "authorName": "Samantha Lee",
    "authorImageUrl": "https://example.com/images/authors/samantha-lee.jpg",
    "blogImageUrl": "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
};
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const SlugPage = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()
    return (
        <div className='mx-auto w-full px-4  md:px-44 '>
            <div className='grid grid-cols-12 mt-16 '>
                <div className=' absolute w-8 h-8 items-center flex justify-center hover:cursor-pointer rounded-full hover:bg-gray-100' onClick={() => { router.back() }}>
                    <BackIcon />
                </div>
                <div className="col-span-12 flex justify-center">
                    <h1 className='text-3xl font-bold max-w-sm lg:max-w-lg text-center'>{blog.title}</h1>
                </div>
            </div>
            <div className="image w-full flex justify-center mt-4 md:mt-16">
                <img src={blog.blogImageUrl} width={1080} height={480} alt="meaningful image" />
            </div>
            <div className="content mx-auto max-w-xl my-8 md:my-16  ">
                <p className='text-center'>{blog.description}</p>
            </div>
        </div>
    )
}

export default SlugPage