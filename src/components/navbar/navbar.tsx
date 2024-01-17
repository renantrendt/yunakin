'use client';
import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";

import { useRouter } from 'next/navigation'
export default function Navbar({ }: {}) {
    const router = useRouter()
    return (
        <div className="drawer w-full">
            <input id="navbar-drawer" type="checkbox" className="drawer-toggle lg:hidden" />
            <div className="drawer-content flex flex-col lg:flex-row ">
                <div className="navbar bg-neutral text-neutral-content flex justify-between w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="navbar-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <Link
                        className="btn btn-ghost normal-case text-xl flex gap-4"
                        href="/"
                    >
                        <Image src="/images/saas-icon.webp" alt="Too Long Logo" width="40" height="40"></Image>
                        Company Name
                    </Link>
                    <div className=' space-x-2 flex'>
                        <Link
                            className="btn normal-case text-xl"
                            href='/'
                        >
                            Link 1
                        </Link>
                        <Link
                            className="btn normal-case text-xl"
                            href='/'
                        >
                            Link 2
                        </Link>
                        <Link
                            className="btn normal-case text-xl"
                            href='/'
                        >
                            Link 3
                        </Link>
                    </div>
                    <div>
                        <Button onClick={() => { router.push("/login") }}>To App</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}