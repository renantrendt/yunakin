import { cn } from '@/utils/cn';
import React from 'react'
interface BadgeProps {
    size?: 'sm' | 'md' | 'xs';
    children: React.ReactNode;
    type: 'outline' | 'filled' | 'clear';
    color: 'primary' | 'grey' | 'red' | 'green' | 'orange' | 'white';
    includeClose?: boolean;
}


const Badge = ({ size = "md", children, type, color }: BadgeProps) => {
    const sizeStyle = size === 'md' ? 'px-2 py-1.5' : size === 'sm' ? 'px-1.5 py-0.5' : 'px-1 py-0.5';
    const typeStyle = type === 'outline' ? ` border-[1px] rounded-lg` : type === 'filled' ? `rounded-lg` : `!bg-transparent`;

    let colorStyle = '';
    switch (color) {
        case 'primary':
            colorStyle = 'text-primary-600 border-primary-300 bg-primary-100';
            break;
        case 'grey':
            colorStyle = 'text-grey-600 border-grey-300 bg-grey-100';
            break;
        case 'red':
            colorStyle = 'text-red-600 border-red-300 bg-red-100';
            break;
        case 'green':
            colorStyle = 'text-green-600 border-green-300 bg-green-100';
            break;
        case 'orange':
            colorStyle = 'text-orange-600 border-orange-300 bg-orange-100';
            break;
        case 'white':
            colorStyle = 'text-grey-600  border-none bg-white';
            break;
        default:
            break;
    }

    return (
        <div className={cn('w-fit  flex flex-row justify-center gap-1 text-sm leading-5 font-normal', sizeStyle, typeStyle, colorStyle)}>{children}</div>
    )
}

export default Badge