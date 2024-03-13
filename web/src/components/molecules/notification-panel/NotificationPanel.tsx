import Avatar from '@/components/atomic/avatar/Avatar';
import React from 'react'

interface NotificationPanelProps {
    avatar?: React.ReactElement<typeof Avatar> | null;
    title: React.ReactNode;
    description: React.ReactNode;
    children?: React.ReactNode;
}

const NotificationPanel = ({ avatar, title, description, children }: NotificationPanelProps) => {
    return (
        <div className='container rounded-2xl border-[1px] border-grey-100 bg-white dark:bg-card-dark  py-6 px-8 shadow-sm max-w-[540px] h-fit    '>
            <div className='flex justify-start items-center gap-4'>
                {avatar}
                <div className='flex flex-col justify-start'>
                    {title}
                    {description}
                </div>
            </div>
            <div className='mt-2 ml-14'>
                {children}
            </div>
        </div>
    )
}

export default NotificationPanel