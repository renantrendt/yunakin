'use client'
import siteUrls from '@/config/site-config'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { platform } from 'os'
import React from 'react'

const DashboardNavbar = (): JSX.Element => {
  return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={siteUrls.dashboard} className="btn btn-ghost text-xl">{platform.name}</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link href={'/profile'} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link href={siteUrls.settings}>Settings</Link></li>
                        <li><Link href={'#'} onClick={async () => { await signOut() }}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
  )
}

export default DashboardNavbar
