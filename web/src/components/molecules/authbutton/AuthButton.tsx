import GoogleCircleIcon from '@/assets/icons/GoogleCircleIcon'
import React from 'react'


interface AuthButtonProps {
    onClick: () => void
    content: string
    icon: React.ReactNode
}

const AuthButton = ({ onClick, content, icon }: AuthButtonProps) => {
    return (
        <button
            className="flex justify-center gap-4 p-3 w-full    border-sleek-gray border-2 rounded-lg bg-white  text-black dark:text-white"
            onClick={onClick}
            type="button"
        >
            {icon}
            <p className='text-black dark:text-white '>{content}</p>
        </button>
    )
}

export default AuthButton;
