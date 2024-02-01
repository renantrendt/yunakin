import React from 'react'
import Button from '../atomic/button/Button';

interface FeatureItemProps {
    direction?: "ltr" | "rtl" | string
    image?: string
    title: string;
    description: string;
}
const FeatureItem = ({ direction = "ltr", title, description, image }: FeatureItemProps) => {

    return (
        <div className={`flex justify-center md:justify-between flex-col md:flex-row  gap-8 md:gap-16 w-full items-center text-black dark:text-white   ${direction === "ltr" ? "" : "flex-col-reverse md:flex-row-reverse"}`}>
            <div className="flex-col  justify-start items-start gap-8 inline-flex">
                <div className="flex-col justify-start items-start gap-5 flex text-left">
                    <div className="FastEditing  text-stone-950  dark:text-white text-5xl font-black  leading-10">{title}</div>
                    <div className="     text-neutral-600 dark:text-white text-xl font-light max-w-[574px] leading-loose">{description}</div>
                </div>
                <Button label='Learn More' variant="outline" size='small' />
            </div>
            <img className="w-72 h-72 lg:w-[495px] lg:h-[420px]  rounded-3xl" src={image} />
        </div>
    )
}

export default FeatureItem