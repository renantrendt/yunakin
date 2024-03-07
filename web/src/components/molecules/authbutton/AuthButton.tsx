import React from 'react'


interface AuthButtonProps {
    onClick: () => void
    content: string
    icon: React.ReactNode
}

const AuthButton = ({ onClick, content, icon }: AuthButtonProps) => {
    return (
        <button
            className="flex justify-center items-center duration-150 ease-in-out gap-2 px-5 py-3 w-full    border-[1px] border-grey-300 rounded-lg bg-white  text-black
            
            hover:bg-grey-200
            focus:bg-white
            focus:shadow-focus-primary

            "
            onClick={onClick}
            type="button"
        >
            {icon}
            <p className='text-black text-sm leading-5 font-normal '>{content}</p>
        </button>
    )
}

export default AuthButton;
