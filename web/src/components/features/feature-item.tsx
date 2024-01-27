import React from 'react'

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
                <div className="flex-col justify-start items-start gap-5 flex">
                    <div className="FastEditing  text-stone-950  dark:text-white text-5xl font-black  leading-10">{title}</div>
                    <div className=" max-w-3xl    text-neutral-600 dark:text-white text-xl font-light  leading-loose">{description}</div>
                </div>
                <div className=" px-4 py-3 bg-white rounded-md  shadow-inner border border-gray-200 justify-center items-center gap-2.5 inline-flex">
                    <div className="Frame6 justify-center items-center gap-3 flex">
                        <div className="LearnMore text-blue-600 text-base font-medium ">Learn More</div>
                    </div>
                </div>
            </div>
            <img className="md:w-72 md:h-72 lg:w-96 lg:h-96  rounded-3xl" src={image} />
        </div>
    )
}

export default FeatureItem