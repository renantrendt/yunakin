'use client'
import HamburgerIcon from '@/icons/HamburgerIcon.svg'
import React from 'react'
import Topbar from '../navigation/Topbar'

const DashboardNavbar = ({ onClick }: { onClick: () => void }): JSX.Element => {
    //eslint-disable-next-line
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    }
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white dark:bg-gray-900  z-40 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className='flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11'>
                <div className=' block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-gray-700 lg:hidden'
                    onClick={onClick}>
                    <HamburgerIcon />
                </div>

                <Topbar />
            </div>
        </header>
    )
}

export default DashboardNavbar


