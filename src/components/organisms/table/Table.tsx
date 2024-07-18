import React, { useEffect, useRef } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody';
import { useMotionValueEvent, useScroll } from 'framer-motion';

interface TableProps {
    children: (React.ReactElement<typeof TableHead> | React.ReactElement<typeof TableBody>)[];
}

const Table = ({ children }: TableProps) => {


    return (
        <div className=' w-[105%]  lg:w-full  rounded-2xl bg-white border shadow-lg border-grey-200 dark:border-profile-modal-border-dark overflow-hidden  overflow-x-scroll no-scrollbar '>
            <table className='w-full  table lg:table-fixed 	  '>
                {children}
            </table>
        </div>
    )
}

export default Table