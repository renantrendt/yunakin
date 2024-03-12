import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react'

interface NavigationItemProps {
    title: string;
    link: string;
    icon?: React.ReactNode;
    selected?: boolean;
}

const NavigationItem = ({ title, link, icon, selected }: NavigationItemProps) => {
    return (
        <Link href={link} >
            <li tabIndex={1} className='focus:shadow-focus-primary rounded-lg' >

                <div className={cn('flex flex-row  gap-2 justify-start items-center p-2 !text-grey-600  hover:bg-grey-200 dark:hover:bg-input-dark  dark:text-sidebar-icon-dark ', selected ? "bg-grey-200 dark:bg-input-dark " : "")}>
                    {icon}
                    <p className='text-sm font-normal leading-[20px] '>{title}</p>
                </div>
            </li>
        </Link>
    )
}

export default NavigationItem