'use client'
import platformConfig from '@/config/app-config'
import siteUrls from '@/config/site-config'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const DashboardNavbar = (): JSX.Element => {
    const { data: session } = useSession()

    console.log(status, session)

    return (
        <div className="navbar flex-1 bg-base-100 w-full">
            <div className="navbar-start">
                <Link href={siteUrls.dashboard} className="btn btn-ghost text-xl">{platformConfig.name}</Link>
            </div>
            <div className=" navbar-end gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={`${(session?.user as any).avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} />
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
                        <li><Link href={'#'} onClick={async () => { await signOut({ callbackUrl: "/login" }) }}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar
