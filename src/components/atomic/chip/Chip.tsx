import { cn } from '@/utils/cn';
import React from 'react'
import CrossMarkIcon from "@/icons/cross-mark.svg";

interface ChipProps {
    size?: 'sm' | 'md' | 'xs';
    children: React.ReactNode;
    type: 'outline' | 'filled';
    color: 'primary' | 'grey' | 'red' | 'green' | 'orange' | 'white';
    includeClose?: boolean;
}


const Chip = ({ size = "md", children, type, color, includeClose }: ChipProps) => {
    const sizeStyle = size === 'md' ? 'px-3 py-1.5' : size === 'sm' ? 'px-1.5 py-0.5' : 'px-1 py-0.5';
    const typeStyle = type === 'outline' ? `border-[1px] rounded-lg` : type === 'filled' ? `rounded-lg` : `!bg-transparent`;

    let colorStyle = '';
    let hoverBg = " ";
    switch (color) {
        case 'primary':
            colorStyle = 'text-primary-600 border-primary-300 bg-primary-100';
            hoverBg = "hover:bg-primary-200";
            break;
        case 'grey':
            colorStyle = 'text-grey-600 border-grey-300 bg-grey-100 ';
            hoverBg = "hover:bg-grey-200";

            break;
        case 'red':
            colorStyle = 'text-red-600 border-red-300 bg-red-100';
            hoverBg = "hover:bg-red-200";
            break;
        case 'green':
            colorStyle = 'text-green-600 border-green-300 bg-green-100';
            hoverBg = "hover:bg-green-200";
            break;
        case 'orange':
            colorStyle = 'text-orange-600 border-orange-300 bg-orange-100';
            hoverBg = "hover:bg-orange-200";
            break;
        case 'white':
            colorStyle = 'text-grey-600  border-none bg-white';
            hoverBg = "hover:bg-grey-200";
            break;
        default:
            break;
    }

    return (
        <div className={cn('w-fit cursor-pointer flex flex-row justify-center gap-1 items-center text-sm leading-5 font-normal', sizeStyle, typeStyle, colorStyle)}>
            <>
                {children}
                {includeClose && <span className={hoverBg}><CrossMarkIcon className='w-4 h-4' /> </span>}
            </></div>
    )
}

export default Chip;