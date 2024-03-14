import TwitterIcon from '@/icons/TwitterIcon.svg'
import React from 'react'

interface TwitterButtonProps {
    onClick: () => void
}

const TwitterButton = ({ onClick }: TwitterButtonProps) => {
    return (
        <button
            className="flex justify-center gap-4 p-3 w-full    border-sleek-gray border-2 rounded-lg bg-white  text-black dark:text-white"
            onClick={onClick}
            type="button"
        >
            <TwitterIcon />
            <p className='text-black dark:text-white '>Sign In with Twitter </p>
        </button>
    )
}

export default TwitterButton
