'use client'
import Link from 'next/link'
import Button from '../../atomic/button/Button'
import React from 'react'

import { useRouter } from 'next/navigation'
import siteUrls from '@/config/site-config'
import HamburgerIcon from '@/icons/HamburgerIcon.svg'
import Image from 'next/image'
import IconButton from '@/components/atomic/icon-button/IconButton'
import _ from 'lodash'
export default function Navbar() {
    const router = useRouter()
    return (
        <div className=" max-w-[1440px] w-full navbar px-4 md:px-28 pt-7 md:pt-14 dark:text-white max-w-8xl     font-medium text-base leading-[19px] text-grey-400">
            <div className="navbar-start">

                <Link href={siteUrls.general.home}>
                    <Image src="/images/logo.svg" alt="logo" width={150} height={50} />
                </Link>
            </div>
            <div className="navbar-center  w-[79%] hidden lg:flex justify-center">
                <ul className="menu menu-horizontal px-1">
                    {_.keys(siteUrls.navbar).map((key: string) => {
                        const link = siteUrls.navbar[key]
                        return (
                            <li key={key}><Link href={link.url}>{link.label}</Link></li>
                        )
                    })}

                </ul>
            </div>
            <div className="lg:navbar-end  w-full lg:w-[12%]  gap-4">
                <div className="dropdown flex justify-end w-full lg:hidden">
                    <div className='text-black font-black'>
                        <IconButton icon={<HamburgerIcon />} onClick={() => { }} className='w-8 h-8' />
                    </div>
                    <ul tabIndex={0} className=" dropdown-content mt-8 z-[1] p-8 shadow bg-base-100 dark:bg-gray-700 rounded-box w-72 flex flex-col gap-8">
                        <li><Link href={siteUrls.general.pricing}>Pricing</Link></li>
                        <li>
                            <Link href={siteUrls.general.blog}>Blog</Link>
                            {/* <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul> */}
                        </li>
                        <li><Link href={siteUrls.general.features}>Features</Link></li>
                        <li>
                            <Button
                                variant='tertiary'
                                label='Login'
                                classname='w-full '
                                onClick={() => router.push(siteUrls.general.login)}
                            />
                        </li>
                        <li>

                            <Button
                                variant='primary'
                                classname='w-full  text-white '
                                label='Get Started'
                                onClick={() => router.push(siteUrls.general.register)}
                            />
                        </li>

                    </ul>
                </div>
                <Button
                    variant='secondary'
                    label='Login'
                    size='lg'
                    classname='w-full hidden lg:block'
                    onClick={() => router.push(siteUrls.general.login)}
                />
                <Button
                    variant='primary'
                    classname='w-full  hidden lg:block'
                    label='Get Started'
                    size='lg'
                    onClick={() => router.push(siteUrls.general.register)}
                />

            </div>
        </div>
    )
}
