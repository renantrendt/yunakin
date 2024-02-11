'use client'
import Link from 'next/link'
import Button from '../../atomic/button/Button'
import React from 'react'

import { useRouter } from 'next/navigation'
import siteUrls from '@/config/site-config'
import HamburgerIcon from '@/assets/icons/HamburgerIcon.svg'
import Image from 'next/image'
import IconButton from '@/components/atomic/icon-button/IconButton'
export default function Navbar() {
    const router = useRouter()
    return (
        <div className="navbar px-4 md:px-28 pt-7 md:pt-14 dark:text-white max-w-8xl text-header-color font-medium text-base leading-[19px]">
            <div className="navbar-start">

                <Link href={siteUrls.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
            </div>
            <div className="navbar-center  w-[80%] hidden lg:flex justify-center">
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
            <div className="lg:navbar-end  w-full lg:w-[10%]  gap-4 ">
                <div className="dropdown flex justify-end w-full lg:hidden">
                    <div className='text-black font-black'>
                        <IconButton icon={<HamburgerIcon />} onClick={() => { }} className='w-8 h-8' />
                    </div>
                    <ul tabIndex={0} className=" dropdown-content mt-8 z-[1] p-8 shadow bg-base-100 dark:bg-gray-700 rounded-box w-72 flex flex-col gap-8">
                        <li><Link href={siteUrls.pricing}>Pricing</Link></li>
                        <li>
                            <Link href={siteUrls.blog}>Blog</Link>
                            {/* <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul> */}
                        </li>
                        <li><Link href={siteUrls.features}>Features</Link></li>
                        <li>
                            <Button
                                variant='outline'
                                label='Login'
                                classname='w-full '
                                onClick={() => router.push(siteUrls.login)}
                            />
                        </li>
                        <li>

                            <Button
                                variant='primary'
                                classname='py-3 px-4 w-full  text-white '
                                label='Get Started'
                                onClick={() => router.push(siteUrls.register)}
                            />
                        </li>

                    </ul>
                </div>
                <Button
                    variant='secondary'
                    label='Login'
                    classname='w-full hidden lg:block'
                    onClick={() => router.push(siteUrls.login)}
                />
                <Button
                    variant='primary'
                    classname='py-3 px-4 w-full  hidden lg:block'
                    label='Get Started'
                    onClick={() => router.push(siteUrls.register)}
                />

            </div>
        </div>
    )
}
