import LoadingIcon from '@/icons/LoadingIcon'
import React from 'react'

const Loading = () => {
    return (
        <div className='flex w-full h-[calc(100vh-20%)] justify-center items-center'>
            <LoadingIcon />
        </div>
    )
}

export default Loading