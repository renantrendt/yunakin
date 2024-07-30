import React from 'react'


interface TooltipProps {
    trigger: React.ReactNode
    content: string
}
const Tooltip = ({ trigger, content }: TooltipProps) => {
    const [show, setShow] = React.useState(false)
    return (
        <div className=' relative cursor-pointer '  >

            {show && <div className='px-1 text-center absolute duration-300 ease-in-out  right-0  mx-auto bottom-4 text-xs min-w-[100px] max-w-[200px] text-grey-600 border-grey-300 bg-grey-100 dark:border-none dark:bg-[#B0B0B0] dark:text-[rgba(245, 245, 245, 0.1)] border rounded-lg '>{content}</div>}
            <div className='trigger' onClick={() => {
                setShow(true)
            }} onMouseLeave={() => {
                setShow(false)
            }} onTouchStart={() => {
                setShow(true)
            }} onTouchEnd={() => {
                setShow(false)
            }}  >
                {trigger}
            </div>
        </div>
    )
}

export default Tooltip