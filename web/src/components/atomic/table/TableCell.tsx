import { cn } from '@/utils/cn';
import React from 'react'

interface TableCellProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    padding?: string;
    cellStyle?: 'white' | 'grey';
    size?: 'sm' | 'md' | 'lg';
    align?: 'left' | 'center' | 'right';
}

const TableCell = ({ children, className, onClick, padding = true, cellStyle = 'white', size = "lg", align = "left" }: TableCellProps) => {
    const sizeStyle = size == "lg" ? "py-[30px]" : "md" ? "py-[20px]" : "py-[10px]";
    const alignStyle = align == "left" ? "text-left" : "center" ? "text-center" : "text-right";
    return (
        <td onClick={onClick} className={cn('py-[14px] text-grey-400', sizeStyle, alignStyle, padding ? "px-6" : "", cellStyle == 'white' ? "bg-white " : "bg-grey-50", className)}>{children}</td>
    )
}

export default TableCell