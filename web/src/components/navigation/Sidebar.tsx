'use client'
// components/Sidebar.tsx
import React from 'react'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import InputField from '../atomic/input/InputField'
import MagnifyingGlass from "@/assets/icons/magnifying-glass.svg"
import DashboardLogoIcon from "@/assets/icons/dashboard-logo.svg"
import HomeIcon from "@/assets/icons/home.svg"
import InboxIcon from "@/assets/icons/inbox.svg"
import UserGroupIcon from "@/assets/icons/user-group.svg"
import SettingsIcon from "@/assets/icons/settings.svg"
import BookOpen from "@/assets/icons/book-open.svg"
import AnalyticsIcon from "@/assets/icons/analytics.svg"
interface SidebarLink {
    label: string
    path: string
    iconSrc: React.ReactNode // Path to your icon images
}

const sidebarLinks: SidebarLink[] = [
    { label: 'Home', path: '/dashboard', iconSrc: <HomeIcon /> },
    { label: 'Notications', path: '/notifications', iconSrc: <InboxIcon /> },
    { label: 'Users', path: '/users', iconSrc: <UserGroupIcon /> },
    { label: 'Analytics', path: '/analytics', iconSrc: <AnalyticsIcon /> },
    // Add other necessary links here
]
const bottomSideBarLinks: SidebarLink[] = [
    { label: 'Settings', path: '/settings', iconSrc: <SettingsIcon /> },
    { label: 'Help & Support', path: '/help', iconSrc: <BookOpen /> },
]

const Sidebar: React.FC = () => {
    const [search, setSearch] = React.useState('')
    return (
        <>
            <div className=" flex items-center justify-between gap-2 px-3 pt-4 pb-3   ">
                <Link href={siteUrls.dashboard} className="btn btn-ghost text-xl">
                    <DashboardLogoIcon />
                </Link>
                {/* <Button className='block lg:hidden' >Show</Button> */}
            </div>
            <ul className="menu w-64 no-scrollbar flex-1 flex justify-between flex-col">
                <div>

                    <li className='text-grey-500'>
                        <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                            id='search' value={search} onChange={(e) => setSearch(e.target.value)} customClassName='bg-transparent border-none outline-none hover:border-none focus:border-none
                             py-0 px-2' />
                    </li>
                    <div>

                        {sidebarLinks.map((link) => (
                            <li key={link.label} className=' dark:hover:bg-gray-600 hover:bg-gray-200 text-grey-500  rounded-md my-1'>
                                <Link href={link.path}>
                                    <div className='flex gap-2 items-center'>
                                        {link.iconSrc}
                                        <p className='text-sm'>
                                            {link.label}
                                        </p>
                                    </div>
                                </Link >
                            </li >
                        ))}
                    </div>
                </div>
                <div>

                    {bottomSideBarLinks.map((link) => (
                        <li key={link.label} className=' dark:hover:bg-gray-600 hover:bg-gray-200 text-grey-500  rounded-md my-1'>
                            <Link href={link.path}>
                                <div className='flex gap-2 items-center'>
                                    {link.iconSrc}
                                    <p className='text-sm'>
                                        {link.label}
                                    </p>
                                </div>
                            </Link >
                        </li >
                    ))}
                </div>

            </ul >
            {/* <div className='absolute bottom-0'> Collapse Sidebar</div> */}
        </>

    )
}

export default Sidebar
