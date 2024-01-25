import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (

        <div className="flex items-center justify-center min-h-screen bg-white py-48">
            <div className="flex flex-col">
                <div className="flex flex-col items-center">
                    <div className="text-black font-bold text-5xl md:text-[200px] underline  decoration-8 underline-offset-0	    	">
                        404
                    </div>

                    <div className=" text-3xl lg:text-3xl md:text-2xl mt-10">
                        Page not found
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage