import React from 'react'
import Button from '../atomic/button/Button';
import Typography from '../atomic/typography/Typography';
import Image from 'next/image';

interface FeatureItemProps {
    direction?: "ltr" | "rtl" | string
    image?: string
    title: string;
    description: string;
}
const FeatureItem = ({ direction = "ltr", title, description, image }: FeatureItemProps) => {

    return (
        <div className={`grid grid-cols-1  lg:flex justify-center relative  lg:justify-between flex-col lg:flex-row  gap-x-8 gap-y-8  lg:gap-16 w-full items-center text-black dark:text-white   ${direction === "ltr" ? "" : "lg:flex-row-reverse"}`}>
            <div className="flex-col flex-1  justify-start items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-5 flex text-left">
                    <Typography type='h2'>{title}</Typography>
                    <div className="     text-neutral-600 dark:text-white text-xl font-light max-w-[574px] leading-loose">{description}</div>
                </div>
                <Button label='Learn More' variant="outline" size='small' />
            </div>
            <div className='relative w-full  flex-1 h-96'>
                <Image alt='' fill
                    objectFit="cover"
                    src={image ?? ""}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>
        </div>
    )
}

export default FeatureItem