import { cn } from '@/utils/cn';
import Image from 'next/image'
import React from 'react'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string;
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const Avatar = ({ image, name, size = 'md', ...additionalProps }: AvatarProps) => {
    let sizeStyle = "";
    switch (size) {
        case "xs":
            sizeStyle = "h-6 w-6";
            break;
        case "sm":
            sizeStyle = "h-8 w-8";
            break;
        case "md":
            sizeStyle = "h-10 w-10";
            break;
        case "lg":
            sizeStyle = "h-12 w-12";
            break;
        case "xl":
            sizeStyle = "h-16 w-16";
            break;
        case "2xl":
            sizeStyle = "h-20 w-20";
            break;
        case "3xl":
            sizeStyle = "h-24 w-24";
            break;
        default:
            sizeStyle = "h-10 w-10";
    }
    return (
        <div className='avatar' {...additionalProps}>
            <div className={cn('rounded-full', sizeStyle)}>
                <Image
                    height={40}
                    width={40}
                    src={image}
                    alt={name}
                    className="object-cover   h-10 w-10  !m-0 !p-0 border-[1px] border-white object-top rounded-full group-hover:scale-105 group-hover:z-30"
                />
            </div>
        </div>
    )
}

export default Avatar