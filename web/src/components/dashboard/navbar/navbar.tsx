'use client'
import HamburgerIcon from '@/assets/icons/HamburgerIcon'
import InputField from '@/components/input/InputField'
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher'
import siteUrls from '@/config/site-config'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const DashboardNavbar = ({ onClick }: { onClick: () => void }): JSX.Element => {
    const { data: session } = useSession()

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
                <div className="hidden sm:block">
                    <InputField
                        label='Search'
                        name="search"
                        placeholder="Search"
                        id='search'
                        onChange={handleSearch}
                    />
                </div>
                <div className='flex items-center gap-3 2xsm:gap-7'>
                    <div className=" gap-2 col-span-10 w-full flex justify-between items-center">
                        <ThemeSwitcher />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={`${(session?.user as any).avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  dark:bg-gray-500 rounded-box w-52">
                                <li>
                                    <Link href={'/profile'} className="justify-between">
                                        Profile
                                        <span className="badge dark:bg-gray-600">New</span>
                                    </Link>
                                </li>
                                <li><Link href={siteUrls.settings}>Settings</Link></li>
                                <li><Link href={'#'} onClick={async () => { await signOut({ callbackUrl: "/login" }) }}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardNavbar
