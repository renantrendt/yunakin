import React from 'react'
import Image from 'next/image'

const testimonials = [
    {
        "name": "John Doe",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum., Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "role": "Product Manager",
        "avatar": "/images/testimonial-avatar.jpeg"
    },
    {
        "name": "John Doe",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum., Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "role": "Product Manager",
        "avatar": "/images/testimonial-avatar.jpeg"
    },
    {
        "name": "John Doe",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum., Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "role": "Product Manager",
        "avatar": "/images/testimonial-avatar.jpeg"
    }
]
const Testimonial = () => {
    // Generate fake testimonials array


    return (
        <div className='my-20 w-full'>
            <h1 className='text-4xl font-bold text-center mb-2'>Testimonials</h1>
            <h3 className='text-2xl text-center mb-20'>Read what people say about us</h3>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6  justify-center '>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className='card    h-full p-5 '>
                        <div className='card-body flex justify-center items-center shadow-lg'>
                            <p className='max-w-[316px] text-center mb-8'>{testimonial.content}</p>
                            <Image src={testimonial.avatar} alt={testimonial.name} width={100} height={100} className='rounded-full' />
                            <h4 className='text-lg font-bold'>{testimonial.name}</h4>
                            <p className='role'>{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Testimonial;
