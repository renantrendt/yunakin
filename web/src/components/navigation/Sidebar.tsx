'use client'
// components/Sidebar.tsx
import React from 'react'
import Link from 'next/link'
import siteUrls from '@/config/site-config'
import InputField from '../atomic/input/InputField'
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import DashboardLogoIcon from "@/icons/dashboard-logo.svg"
import HomeIcon from "@/icons/home.svg"
import InboxIcon from "@/icons/inbox.svg"
import UserGroupIcon from "@/icons/user-group.svg"
import SettingsIcon from "@/icons/settings.svg"
import BookOpen from "@/icons/book-open.svg"
import AnalyticsIcon from "@/icons/analytics.svg"
import ChatGptIcon from "@/icons/chatgpt.svg"
import NavigationItem from '../atomic/navigation/NavigationItem'
import { usePathname } from 'next/navigation'

interface SidebarLink {
    label: string
    path: string
    iconSrc: React.ReactNode // Path to your icon images
    adminRoute?: boolean
}

const sidebarLinks: SidebarLink[] = [
    { label: 'Home', path: '/dashboard', iconSrc: <HomeIcon /> },
    { label: "AI", path: "/ai", iconSrc: <div className='w-6 h-6'> <ChatGptIcon /> </div> },
    { label: 'Notifications', path: '/notifications', iconSrc: <InboxIcon /> },
    { label: 'Users', path: '/users', iconSrc: <UserGroupIcon />, adminRoute: true },
    { label: 'Analytics', path: '/analytics', iconSrc: <AnalyticsIcon /> },
    // Add other necessary links here
]
const bottomSideBarLinks: SidebarLink[] = [
    { label: 'Settings', path: '/settings', iconSrc: <SettingsIcon /> },
    { label: 'Help & Support', path: '/help', iconSrc: <BookOpen /> },
]



interface SidebarProps {
    showMenu?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ showMenu }: SidebarProps) => {
    const [search, setSearch] = React.useState('')
    const pathname = usePathname()

    return (
        <aside className={` z-50 flex  h-screen  text-white overflow-y-hidden absolute lg:static top-0 left-0 w-72 flex-col bg-grey-100 darK:bg-grey-100
        duration-300 ease-linear p-3 pt-5
        lg:translate-x-0 ${showMenu ? '-translate-x-0' : '-translate-x-full'}`}>
            <div className=" flex items-center justify-between gap-2  mb-2   ">
                <Link href={siteUrls.general.dashboard} className="btn btn-ghost text-xl">
                    <DashboardLogoIcon />
                </Link>
                {/* <Button className='block lg:hidden' >Show</Button> */}
            </div>
            <ul className="menu w-64 no-scrollbar flex-1 flex justify-between flex-col">
                <div>
                    <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                        id='search' value={search} onChange={(e) => setSearch(e.target.value)} customClassName='bg-transparent border-none outline-none hover:border-none focus:border-none
                             py-0 !px-8 !shadow-none !mb-2  ' customLeadingIconClassName='!left-[8px]' />
                    <div className='flex flex-col gap-1'>
                        {sidebarLinks.map((link) => (
                            <NavigationItem
                                title={link.label}
                                icon={link.iconSrc}
                                link={link.path}
                                key={link.label}
                                selected={pathname.includes(link.path)}

                            />
                        ))}
                    </div>
                </div>
                <div>

                    {bottomSideBarLinks.map((link) => (
                        <NavigationItem
                            title={link.label}
                            icon={link.iconSrc}
                            link={link.path}
                            key={link.label}
                            selected={pathname.includes(link.path)}
                        />
                    ))}
                </div>
            </ul>
        </aside >
    )
}

export default Sidebar
