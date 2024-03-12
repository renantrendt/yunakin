import { cn } from '@/utils/cn';
import React from 'react'

interface DividerProps {
    className?: string;
    type: 'vertical' | 'horizontal'
    style?: 'light' | 'heavy'
}

const Divider = ({ type, style }: DividerProps) => {
    const typeStyle = type === 'vertical' ? 'w-px h-full min-h-full' : 'w-full h-px'
    const styleStyle = style === 'light' ? 'bg-grey-200' : 'bg-grey-300'


    return (
        <span className={cn(typeStyle, styleStyle)}>&nbsp;</span>
    )
}

export default Divider