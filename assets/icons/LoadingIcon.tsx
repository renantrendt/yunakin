// icon:loading | Ant Design Icons https://ant.design/components/icon/ | Ant Design
import { cn } from '@/utils/cn'
import * as React from 'react'

interface LoadingIconProps {
    size?: 'xs' | 'sm' | 'md' | 'lg'
    className?: string
}

function LoadingIcon({ size = 'lg', className }: LoadingIconProps): JSX.Element {
    let sizeStyle = ''
    switch (size) {
        case 'xs':
            sizeStyle = 'w-4'
            break
        case 'sm':
            sizeStyle = 'w-6'
            break
        case 'md':
            sizeStyle = 'w-8'
            break
        case 'lg':
            sizeStyle = 'w-12'
            break
        default:
            sizeStyle = 'w-8'
    }
    return (
        <span className={cn("loading loading-spinner text-primary-500 bg-primary-500 loading-lg", className)}></span>
    )
}

export default LoadingIcon
