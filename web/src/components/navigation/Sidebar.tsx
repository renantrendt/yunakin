// components/Sidebar.tsx
import React from 'react'
import Link from 'next/link'
import DashboardIcon from '@/assets/icons/DashboardIcon'
import UserIcon from '@/assets/icons/UserIcon'
import SettingsIcon from '@/assets/icons/SettingsIcon'
import siteUrls from '@/config/site-config'
import Image from 'next/image'

interface SidebarLink {
    label: string
    path: string
    iconSrc: React.ReactNode // Path to your icon images
}

const sidebarLinks: SidebarLink[] = [
    { label: 'Dashboard', path: '/dashboard', iconSrc: <DashboardIcon /> },
    { label: 'Users', path: '/users', iconSrc: <UserIcon /> },
    { label: 'Settings', path: '/settings', iconSrc: <SettingsIcon /> }
    // Add other necessary links here
]

const Sidebar: React.FC = () => {
    return (
        <>
            <div className=" flex items-center justify-between gap-2 px-6 pt-8 pb-4 lg:py-6  ">
                <Link href={siteUrls.dashboard} className="btn btn-ghost text-xl">
                    <Image src="/images/logo.png" alt="logo" width={150} height={50} />
                </Link>
                {/* <Button className='block lg:hidden' >Show</Button> */}
            </div>
            <div className="sidebar no-scrollbar overflow-y-auto  h-[500px">
                <ul className="menu  w-64">
                    {sidebarLinks.map((link) => (
                        <li key={link.label} className=' dark:hover:bg-gray-600 hover:bg-gray-200  rounded-md my-1'>
                            <Link href={link.path}>
                                <div className='flex gap-2'>
                                    {link.iconSrc}
                                    <p>
                                        {link.label}
                                    </p>
                                </div>
                            </Link >
                        </li >
                    ))}
                </ul >
            </div >
        </>

    )
}

export default Sidebar
