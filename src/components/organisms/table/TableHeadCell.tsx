import { cn } from '@/utils/cn';
import React from 'react'

interface TableHeadCellProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    padding?: boolean;
    cellStyle?: 'white' | 'grey';
    size?: 'sm' | 'md' | 'lg';
    align?: 'left' | 'center' | 'right';
}

const TableHeadCell = ({ children, className, onClick, padding = true, cellStyle = 'white', size = "lg", align = "left" }: TableHeadCellProps) => {
    const sizeStyle = size == "lg" ? "!py-[30px]" : size == "md" ? "py-[20px]" : "py-[10px]";
    const alignStyle = align == "left" ? "text-left" : align == "center" ? "text-center" : "text-right";
    return (
        <td onClick={onClick} className={cn('py-[10px]  text-[#8C8C8C] font-satoshi font-medium  text-sm table-cell w-fit ', sizeStyle, alignStyle, padding ? "px-6" : "", cellStyle == 'white' ? "bg-white " : "bg-grey-50", className)}>{children}</td>
    )
}

export default TableHeadCell