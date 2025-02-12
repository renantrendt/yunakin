import { cn } from '@/utils/cn';
import React from 'react'


interface ContentSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    additionalClassName?: string;
    fullWidth?: boolean;
}

const ContentSection = ({ children, additionalClassName, fullWidth, className, ...props }: ContentSectionProps) => {

    if (fullWidth) {
        return (
            <div className={cn('w-full min-w-full', additionalClassName)} {...props}>
                <div className={cn('max-w-[1440px] w-full mx-auto px-4 md:px-28', className)}>
                    {children}
                </div>
            </div>
        )
    }
    return (
        <div className={cn('max-w-[1440px] w-full mx-auto px-4 md:px-28', additionalClassName, className)} {...props}>
            {children}
        </div>
    )
}

export default ContentSection