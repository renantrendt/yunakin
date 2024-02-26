import React from 'react'
import Image from 'next/image'
import Typography from '@/components/atomic/typography/Typography';
import AnimatedSection from '@/components/animated/AnimatedSection';

import { siteCopy } from '@/config/site-config';

const Testimonial = () => {
    // Generate fake testimonials array


    return (
        <AnimatedSection>

            <div className='pt-20 w-full dark:text-white'>
                <Typography type='h1' className=' text-stone-950 !font-black text-center pb-4'>Testimonials</Typography>
                <h3 className='text-xl text-center  text-neutral-600  mb-20'>Read what people say about us</h3>
                <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 justify-center '>
                    {siteCopy.testimonialsSection.testimonials.map((testimonial, index) => (
                        <AnimatedSection key={index}>
                            <div key={index} className='card dark:bg-gray-700 shadow border  border-neutral-200 flex-col    h-full p-5 '>
                                <div className='card-body flex   px-0 border-justify-cent  flex-col justify-between   items-center  '>
                                    <p className=' w-10/12 text-neutral-600 dark:text-white text-base leading-[26px] text-center font-light'>{testimonial.content}</p>
                                    <div className='relative  w-20 h-20  mt-6'>
                                        <Image src={testimonial.avatar} alt={testimonial.name} fill objectFit='cover' className='rounded-full w-20 h-20' />
                                    </div>
                                    <div className='text-center'>
                                        <Typography type='p' className='text-lg text-stone-950 font-black mt-3'>
                                            {testimonial.name}
                                        </Typography>
                                        <p className='role text-base font-light text-stone-950'>{testimonial.role}</p>
                                    </div>

                                </div>
                            </div>
                        </AnimatedSection >
                    ))
                    }
                </section >
            </div >
        </AnimatedSection>
    );
};

export default Testimonial;
