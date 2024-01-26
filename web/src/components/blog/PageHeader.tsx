import React from "react";
interface PageHeaderProps {
    heading: string,
    text?: string,
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
    return (
        <div className=' my-16 flex flex-col justify-center items-center gap-5 mb-8'>
            <h1 className='text-5xl font-bold font-black text-center mb-2'>Blogs</h1>
            <h3 className='text-xl  mb-16 max-w-xl text-center  text-neutral-600 font-normal leading-loose'>Read about the latest topics</h3>
        </div >
    );
}