import React from "react";

export default function PageHeader() {
    return (
        <div className=' my-16 flex flex-col justify-center items-center gap-5 mb-8'>
            <h1 className='text-5xl font-bold font-black text-center mb-2 dark:text-white'>Blogs</h1>
            <h3 className='text-xl  mb-16 max-w-xl text-center  text-neutral-600 font-normal dark:text-white leading-loose'>Read about the latest topics</h3>
        </div >
    );
}