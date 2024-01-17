'use client'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../button/Button'
import React from 'react'

import { useRouter } from 'next/navigation'
import siteUrls from '@/config/site-config'
export default function Navbar() {
    const router = useRouter()
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
                <a className="btn btn-ghost text-xl">NextStackSaaS</a>
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
                    <li><Link href={siteUrls.features}>Features</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Button classname="btn btn-primary" onClick={() => router.push('/login')}>To App</Button>
            </div>
        </div>
    )
}
