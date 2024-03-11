import Avatar from '@/components/atomic/avatar/Avatar'
import Typography from '@/components/atomic/typography/Typography'
import siteUrls from '@/config/site-config'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Topbar = () => {
    const { data: session } = useSession()
    return (
        <div className='flex justify-between px-2 py-[10px] w-full items-center'>
            <Typography type='h1' className='!text-xl'>Welcome {session?.user?.name}</Typography>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <Avatar image={session?.user?.avatar || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} name={session?.user?.name ?? ""} />
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  dark:bg-gray-500 rounded-box w-52">
                    <li>
                        <Link href={'/profile'} className="justify-between">
                            Profile
                            <span className="badge dark:bg-gray-600">New</span>
                        </Link>
                    </li>
                    <li><Link href={siteUrls.general.settings}>Settings</Link></li>
                    <li><Link href={'#'} onClick={async () => { await signOut({ callbackUrl: "/ " }) }}>Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Topbar