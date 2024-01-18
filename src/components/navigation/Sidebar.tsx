// components/Sidebar.tsx
import React from 'react'
import Link from 'next/link'
import DashboardIcon from '@/assets/icons/DashboardIcon'
import UserIcon from '@/assets/icons/UserIcon'
import SettingsIcon from '@/assets/icons/SettingsIcon'

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
        <div className="sidebar bg-base-100 w-64 pt-16">
            <ul className="menu p-4 overflow-y-auto w-64">
                {sidebarLinks.map((link) => (
                    <li key={link.label} >
                        <Link href={link.path}>
                            <div className='flex gap-2'>
                                {link.iconSrc}
                                <p>
                                    {link.label}

                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
