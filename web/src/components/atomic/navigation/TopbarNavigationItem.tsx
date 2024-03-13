import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react'

interface TopbarNavigationItemProps {
    title: string;
    link: string;
    icon?: React.ReactNode;
    selected?: boolean;
}

const TopbarNavigationItem = ({ title, link, icon, selected }: TopbarNavigationItemProps) => {
    return (
        <Link href={link} >
            <li tabIndex={1} className='focus:shadow-focus-primary rounded-lg' >

                <div className={cn('flex flex-row  gap-2 justify-start items-center px-4 py-[10px] !text-grey-600  hover:bg-grey-200 dark:hover:bg-input-dark ', selected ? "bg-grey-200" : "")}>
                    {icon}
                    <p className={cn('text-sm font-medium leading-[20px] ', selected ? "!text-black" : "")}>{title}</p>
                </div>
            </li>
        </Link>
    )
}

export default TopbarNavigationItem