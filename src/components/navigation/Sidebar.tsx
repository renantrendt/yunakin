// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarLink {
    label: string;
    path: string;
    iconSrc: string; // Path to your icon images
}

const sidebarLinks: SidebarLink[] = [
    { label: 'Dashboard', path: '/dashboard', iconSrc: '/icons/dashboard.png' },
    { label: 'Users', path: '/users', iconSrc: '/icons/users.png' },
    { label: 'Settings', path: '/settings', iconSrc: '/icons/settings.png' },
    // Add other necessary links here
];

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar bg-base-100 w-64">
            <ul className="menu p-4 overflow-y-auto w-64">
                {sidebarLinks.map((link) => (
                    <li key={link.label}>
                        <Link href={link.path}>
                            <p>
                                <Image src={link.iconSrc} alt={`${link.label} icon`} width={24} height={24} />
                                {link.label}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
