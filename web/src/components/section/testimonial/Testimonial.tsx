import React from 'react'
import Image from 'next/image'

const testimonials = [
    {
        "name": "John Doe",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum., Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "role": "Product Manager",
        "avatar": "https://s3-alpha-sig.figma.com/img/fd74/0791/c0eda28c846f98c39e7926aea7c79a95?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ca9dQ6mz7qoeazaRy6i7RI6RQeb4Nijs01TBU-siNz5BhpLPFUDzSRfDWrtowkLVeLswD7AMsErIvBM7uV2QVFW57cNbK~FJztr6PzZk5zCEZPAVI635D~6NgNgfa2D6n7c2IYemDg5QqnekMctv6rIPy0q78cFlqI3oz5oROw736blogcRaaaD~IF0t62GVzXhaNaZV2t1BL4Xo2yTZdRRhdu9dUgR7h~XIpA7SKhoWwKrbcI8uH7VCkuIuoSFE9lrEBPp-pjASPCywQiGtlz9bCRHdXL4mMJoWGBjPDSLtr680vB3zanW-Zgx3-7I~hfMyjSiWmmWNKveR96AivQ__"
    },
    {
        "name": "John Doe",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum., Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "role": "Product Manager",
        "avatar": "https://s3-alpha-sig.figma.com/img/fd74/0791/c0eda28c846f98c39e7926aea7c79a95?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ca9dQ6mz7qoeazaRy6i7RI6RQeb4Nijs01TBU-siNz5BhpLPFUDzSRfDWrtowkLVeLswD7AMsErIvBM7uV2QVFW57cNbK~FJztr6PzZk5zCEZPAVI635D~6NgNgfa2D6n7c2IYemDg5QqnekMctv6rIPy0q78cFlqI3oz5oROw736blogcRaaaD~IF0t62GVzXhaNaZV2t1BL4Xo2yTZdRRhdu9dUgR7h~XIpA7SKhoWwKrbcI8uH7VCkuIuoSFE9lrEBPp-pjASPCywQiGtlz9bCRHdXL4mMJoWGBjPDSLtr680vB3zanW-Zgx3-7I~hfMyjSiWmmWNKveR96AivQ__"
    },
    {
        "name": "John Doe",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum., Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "role": "Product Manager",
        "avatar": "https://s3-alpha-sig.figma.com/img/fd74/0791/c0eda28c846f98c39e7926aea7c79a95?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ca9dQ6mz7qoeazaRy6i7RI6RQeb4Nijs01TBU-siNz5BhpLPFUDzSRfDWrtowkLVeLswD7AMsErIvBM7uV2QVFW57cNbK~FJztr6PzZk5zCEZPAVI635D~6NgNgfa2D6n7c2IYemDg5QqnekMctv6rIPy0q78cFlqI3oz5oROw736blogcRaaaD~IF0t62GVzXhaNaZV2t1BL4Xo2yTZdRRhdu9dUgR7h~XIpA7SKhoWwKrbcI8uH7VCkuIuoSFE9lrEBPp-pjASPCywQiGtlz9bCRHdXL4mMJoWGBjPDSLtr680vB3zanW-Zgx3-7I~hfMyjSiWmmWNKveR96AivQ__"
    }
]
const Testimonial = () => {
    // Generate fake testimonials array


    return (
        <div className='my-20 w-full  dark:text-white'>
            <h1 className='text-4xl text-stone-950 font-black text-center mb-2'>Testimonials</h1>
            <h3 className='text-xl text-center  text-neutral-600  mb-20'>Read what people say about us</h3>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 justify-center '>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className='card dark:bg-gray-700 shadow border  border-neutral-200 flex-col    h-full p-5 '>
                        <div className='card-body flex py-8  px-0 border-justify-center items-center '>
                            <p className=' w-10/12 text-neutral-600 dark:text-white text-base leading-[26px] text-center font-light'>{testimonial.content}</p>
                            <Image src={testimonial.avatar} alt={testimonial.name} width={100} height={100} className='rounded-full w-20 h-20' />
                            <h4 className='text-lg text-stone-950 font-black'>{testimonial.name}</h4>
                            <p className='role text-base font-light text-stone-950'>{testimonial.role}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Testimonial;
