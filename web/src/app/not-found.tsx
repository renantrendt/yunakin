import React from 'react'
import NotFoundSvg from '@/icons/404.svg'
const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 bg-white py-48">
            <div className="flex flex-col">
                <div className="flex flex-col items-center">
                    <NotFoundSvg />
                    <div className=" text-3xl lg:text-3xl md:text-2xl mt-10">
                        Page not found
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage