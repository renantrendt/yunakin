import React from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody';

interface TableProps {
    children: (React.ReactElement<typeof TableHead> | React.ReactElement<typeof TableBody>)[];
}

const Table = ({ children }: TableProps) => {
    return (
        <div className='rounded-2xl bg-white border-[1px] shadow-lg border-grey-200 overflow-hidden  overflow-x-scroll no-scrollbar '>
            <table className='w-full table table-fixed	 '>
                {children}
            </table>
        </div>
    )
}

export default Table