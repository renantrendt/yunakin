'use client'
import Link from 'next/link'
import Button from '../button/Button'
import React from 'react'

import { useRouter } from 'next/navigation'
import siteUrls from '@/config/site-config'
import { ThemeSwitcher } from '../theme/ThemeSwitcher'
import HamburgerIcon from '@/assets/icons/HamburgerIcon'
import Image from 'next/image'
export default function Navbar() {
    const router = useRouter()
    return (
        <div className="navbar p-2 md:px-28 pt-7 md:pt-14 text-black dark:text-white max-w-8xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <HamburgerIcon />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-52">
                        <li><Link href={siteUrls.pricing}>Pricing</Link></li>
                        <li>
                            <Link href={siteUrls.blog}>Blog</Link>
                            {/* <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul> */}
                        </li>
                        <li><Link href={siteUrls.features}>Features</Link></li>
                    </ul>
                </div>
                <Link href={siteUrls.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={siteUrls.pricing}>Pricing</Link></li>
                    <li>
                        <Link href={siteUrls.blog}>Blog</Link>

                        {/* <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul> */}
                    </li>
                    <li>
                        <Link href={siteUrls.docs}>Docs</Link>

                    </li>
                    <li><Link href={siteUrls.features}>Features</Link></li>
                </ul>
            </div>
            <div className="navbar-end flex gap-4">
                <Button classname="btn btn-primary" onClick={() => router.push('/login')}>To App</Button>
                <ThemeSwitcher />
            </div>
        </div>
    )
}
