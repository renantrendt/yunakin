import { cn } from '@/utils/cn';
import React from 'react'


interface ContentSectionProps {
    children: React.ReactNode;
    additionalClassName?: string;
}

const ContentSection = ({ children, additionalClassName }: ContentSectionProps) => {
    return (
        <div className={cn('max-w-[1440px] w-full mx-auto px-4 md:px-28', additionalClassName)}>
            {children}
        </div>
    )
}

export default ContentSection